import moment from "moment";
import sendEmail from "./email";

const init = () => {
  const localStorageItemKey = "orderForm";
  const timeoutInSec = 20 * 60;
  const version = 1 // We’ll increase this whenever we make breaking changes
  let timerId = null;

  const methods =  {
    set(data) {
      let form = this.get();

      if (!form) {
        // This is the first initialization
        form = { 
          initializedAt: moment().unix(),
          version
        };
      }

      form.updatedAt = moment().unix();
      form.data = { ...data };

      localStorage.setItem(localStorageItemKey, JSON.stringify(form));

      this.initTimeoutTimer()
    },
    get() {
      const form = localStorage.getItem(localStorageItemKey);

      return form ? JSON.parse(form) : null;
    },
    clear() {
      localStorage.setItem(localStorageItemKey, null);
    },
    initTimeoutTimer() {
      const sentNotificationEmail = this.getMeta('sentNotificationEmail', false)
      const initializedAt = this.getMeta('initializedAt')

      if(!initializedAt) return

      // Check if we have already sent the email
      if (sentNotificationEmail) return

      // Timer is already set
      if (timerId) return

      const secondsSinceInitialization = moment().unix() - initializedAt;

      let remainingtimeBeforeTimeoutInMs = (timeoutInSec - secondsSinceInitialization) * 1000;
      if (remainingtimeBeforeTimeoutInMs < 0) remainingtimeBeforeTimeoutInMs = 0;

      timerId = setTimeout(() => {  
        // We don’t want to send another email again until the next initialization
        this.setMeta('sentNotificationEmail', true)

        sendEmail(
          "[Howdy Breakfast Buns] Abandoned cart", 
          buildEmailHTMLBody(this.getMeta('data'))
        );
      }, remainingtimeBeforeTimeoutInMs);
    },
    setMeta(name, value){
      const form = this.get();

      if(!form) {
        console.log(`Cannot set ${name} because the form has not been initialized`)
        return
      }

      form[name] = value;

      localStorage.setItem(localStorageItemKey, JSON.stringify(form));
    },    
    getMeta(name, defaultFallbackValue){
      const form = this.get();

      if(!form) {
        console.log(`The form has not been initialized yet`)
        return
      }

      if(typeof form[name] !== 'undefined') {
        return form[name]
      } else {
        return defaultFallbackValue
      }
    },
  };

  // Reset if it’s an old version
  if(methods.get() && methods.get().version != version) {
    localStorage.setItem(localStorageItemKey, null);
  }

  return methods
};

const persistentformData = init();

const buildEmailHTMLBody = (data) => {
  let html = `<h4>Abandoned cart:</h4>`;

  const fields = {
    ...data.contact,
    ...data.delivery,
    addons: data.addons,
    flavors: data.flavors,
    dozens: data.size.dozens,
  };

  for (let key in fields) {
    let value = fields[key];
    const shouldSkip = !value || 
                       value === "" || 
                       (Array.isArray(value) && !value.length)

    if (shouldSkip) continue;

    if (key === "addons") {
      const addons = value;
      value = "";
      addons.forEach(({ name }) => (value += value.length ? `,${name}` : name));
    }

    html += `
      <span>
        <strong>${key}: </strong>
        <span>${value} </span>
      </span>
      <br>
      `;
  }

  return html;
};

export { persistentformData };

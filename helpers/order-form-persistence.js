import moment from "moment";
import sendEmail from "./email";

const init = () => {
  const localStorageItemKey = "orderForm";
  const timeoutInSec = 35;
  let timerId = null;

  const methods =  {
    set(data) {
      let form = this.get();

      if (!form) {
        // This is the first initialization
        form = { initializedAt: moment().unix() };
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
    initTimeoutTimer() {
      const sentNotificationEmail = this.getMeta('sentNotificationEmail', false)
      const initializedAt = this.getMeta('initializedAt')

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

  return methods
};

const persistentformData = init();

const buildEmailHTMLBody = (form) => {
  let html = `<h4>Abandoned cart:</h4>`;

  const fields = {
    ...form.contact,
    ...form.delivery,
    addons: form.addons,
    flavors: form.flavors,
    dozens: form.size.dozens,
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

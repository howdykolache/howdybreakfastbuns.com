import moment from "moment";

const init = () => {
  const localStorageItemKey = "orderForm";

  return {
    set(data) {
      let value = this.get();

      if (!value) {
        value = {
          initializedAt: moment().unix(),
        };
      }

      value.updatedAt = moment().unix();
      value.data = { ...data };

      localStorage.setItem(localStorageItemKey, JSON.stringify(value));
    },
    get() {
      const value = localStorage.getItem(localStorageItemKey);

      return value ? JSON.parse(value) : null;
    },
  };
};

export const persistentformData = init();

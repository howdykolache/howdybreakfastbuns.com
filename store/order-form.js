export const state = () => ({
  fields: {
    contact: {
      name: '',
      email: '',
      phoneNumber: '',
    },
    delivery: {
      date: null,
      deliveryTime: null,
      orderType: "Pickup",
      address: '',
      deliveryNotes: '',
    },
    flavors: '',
    size: {
      numberOfPeople: 1,
      bunsPerPerson: 1,
      dozens: 1,
      kolachesCostInCents: 5900
    },
    addons: []
  },
});

export const mutations = {
  UPDATE_FIELDS(state, fields) {
    state.fields = {
      ...state.fields,
      ...fields,
    };
  },
};

export const actions = {
  update: ({ commit }, fields) => {
    commit("UPDATE_FIELDS", fields);
  },
};

export const getters = {
  fields(state) {
    return state.fields;
  },
};

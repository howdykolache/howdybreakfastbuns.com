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
      numberOfPeople: null,
      bunsPerPerson: null,
      dozens: null,
      kolachesCostInCents: 5900
    },
    addons: []
  },
  // Routes of he availabe steps
  stepRoutes: [
    'contact-info',
    'order-date',
    'order-size',
    'flavors',
    'addons'
  ]
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
  stepRoutes(state){
    return state.stepRoutes
  }
};

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
    flavors: 'Howdy Mix',
    size: {
      numberOfPeople: null,
      bunsPerPerson: null,
      dozens: null,
      kolachesCostInCents: 5900
    },
    addons: [],
    tipInCents: 0
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
  },
  addonsTotal(state) {
    return state.fields.addons.reduce((t, item) => t + item.qty * item.priceInCents, 0);
  },
  subtotal(state, getters) {
    return getters.addonsTotal + state.fields.size.kolachesCostInCents;
  },
  deliveryCost(state, getters) {
    if (state.fields.delivery.orderType.toLowerCase() === "pickup") return 0;

    return Math.round(0.1 * getters.subtotal);
  },
  tax(state, getters) {
    return parseInt(0.1175 * getters.subtotal, 10)
  },
  total(state, getters) {
    return getters.subtotal + getters.tax + getters.deliveryCost + state.fields.tipInCents
  },
};

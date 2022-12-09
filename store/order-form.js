export const state = () => ({
  fields: {},
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

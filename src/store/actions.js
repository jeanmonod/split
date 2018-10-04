const actions = {
  addParticipant(context, name) {
    context.commit('addParticipant', name);
  },
  removeParticipant(context, id) {
    context.commit('removeParticipant', id);
  },
  addGroup(context, name) {
    context.commit('addGroup', name);
  },
  removeGroup(context, id) {
    context.commit('removeGroup', id);
  },
  addExpense(context, params) {
    context.commit('addExpense', params);
  },
  removeExpense(context, id) {
    context.commit('removeExpense', id);
  },
};

export default actions;
function getBestTransaction(balances) {
  const richest = Object.keys(balances).reduce((a, b) => balances[a] > balances[b] ? a : b);
  const poorest = Object.keys(balances).reduce((a, b) => balances[a] < balances[b] ? a : b);
  const amount = Math.min(Math.abs(balances[poorest]), balances[richest]);
  return {from: richest, to: poorest, amount: amount};
}

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
  startResolver(context) {
    let balances = {};
    Object.keys(context.state.participants).forEach(function (id) {
      balances[id] = context.getters.getParticipantBalance(id);
    });
    context.commit('initBalances', balances);
    const resolver = setInterval(function() {
      context.commit('addTransaction', getBestTransaction(context.state.refunds.balances));
      if (context.getters.absoluteRefundBalances < 10) {
        context.dispatch('stopResolver');
      }
    }, 1000);
    context.commit('addResolver', resolver);
  },
  stopResolver(context) {
    clearTimeout(context.state.refunds.resolver);
    context.commit('clearResolver');
  }
};

export default actions;
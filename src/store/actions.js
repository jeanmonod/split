import {encodeDataForURI} from '../../src/persistance';

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
  togglePartialGroup(context, id) {
    context.commit('togglePartialGroup', id);
  },
  updatePartSetting(context, gId, pId, val) {
    context.commit('updatePartSetting', gId, pId, val);
  },

  addExpense(context, params) {
    context.commit('addExpense', params);
  },
  removeExpense(context, id) {
    context.commit('removeExpense', id);
  },

  startResolver(context, timeout) {
    let balances = {};
    Object.keys(context.state.participants).forEach(function (id) {
      balances[id] = context.getters.getParticipantBalance(id);
    });
    context.commit('initBalances', balances);
    const resolver = setInterval(function() {
      context.commit('addTransaction', getBestTransaction(context.state.refunds.balances));
      if (context.getters.absoluteRefundBalances < 2) { // TODO Allow to configure this value
        context.dispatch('stopResolver');
      }
    }, timeout);
    context.commit('addResolver', resolver);
  },
  stopResolver(context) {
    clearTimeout(context.state.refunds.resolver);
    context.commit('clearResolver');
  },

  persistData(context) {
    const qs = encodeDataForURI(context.state.version, {
      participants: context.state.participants,
      groups: context.state.groups,
      expenses: context.state.expenses
    });
    context.commit('updateQueryString', qs);
  }
};

export default actions;

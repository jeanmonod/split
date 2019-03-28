import Vue from 'vue';

function nextId(object) {
  return Math.max(0, ...Object.keys(object)) + 1;
}

const mutations = {

  addParticipant(state, name) {
    const newId = nextId(state.participants);
    Vue.set(state.participants, newId, {id: newId, name: name});
  },
  removeParticipant(state, id) {
    Object.values(state.expenses).forEach(function (e) {
      if (e.participant === id) {
        Vue.delete(state.expenses, e.id);
      }
    });
    Vue.delete(state.participants, id);
  },


  addGroup(state, name) {
    const newId = nextId(state.groups);
    Vue.set(state.groups, newId, {id: newId, name: name, partial: false, parts: {}});
  },
  removeGroup(state, id) {
    Object.values(state.expenses).forEach(function (e) {
      if (e.group === id) {
        Vue.delete(state.expenses, e.id);
      }
    });
    Vue.delete(state.groups, id);
  },
  togglePartialGroup(state, id) {
    state.groups[id].partial = !state.groups[id].partial;
  },
  updatePartSetting(state, {gId, pId, val}) {
    if (val === "") {
      Vue.delete(state.groups[gId].parts, pId);
    }
    else {
      Vue.set(state.groups[gId].parts, pId, val);
    }
  },

  addExpense(state, params) {
    const newId = nextId(state.expenses);
    Vue.set(state.expenses, newId, {
      id: newId,
      amount: params.amount,
      participant: params.participant,
      group: params.group,
      name: params.name
    });
  },
  removeExpense(state, id) {
    Vue.delete(state.expenses, id);
  },


  initBalances(state, balances) {
    state.refunds = {
      balances: balances,
      transactions: {}
    }
  },
  addTransaction(state, transation) {
    const newId = nextId(state.refunds.transactions);
    Vue.set(state.refunds.transactions, newId, {id: newId, ...transation});
    Vue.set(state.refunds.balances, transation.from, state.refunds.balances[transation.from]-transation.amount);
    Vue.set(state.refunds.balances, transation.to, state.refunds.balances[transation.to]+transation.amount);
  },
  addResolver(state, resolver) {
    Vue.set(state.refunds, 'resolver', resolver);
  },
  clearResolver(state) {
    Vue.set(state.refunds, 'resolver', null);
  },


  updateQueryString(state, qs) {
    Vue.set(state, 'queryString', qs);
  }

};

export default mutations;

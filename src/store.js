import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    participants: {
      1: {id: 1, name: 'Ben'},
      2: {id: 2, name: 'Cédric'},
      3: {id: 3, name: 'Sylvain'},
      4: {id: 4, name: 'David'}
    },
    groups: {
      1: {id: 1, name: 'Achats'},
      2: {id: 2, name: 'Hotels'},
      3: {id: 3, name: 'Avions'}
    },
    expenses: {
      1: {id: 1, amount: 23.5, participant: 2, group: 2, name: 'Facture booking.com'}
    }
  },
  mutations: {
    addParticipant (state, name) {
      const newId = Math.max(...Object.keys(state.participants)) + 1;
      Vue.set(state.participants, newId, {id: newId, name: name});
    },
    removeParticipant(state, id) {
      Object.values(state.expenses).forEach(function(e){
            if (e.participant.id == id) {
                Vue.delete(state.expenses, e.id);
            }
        });
        Vue.delete(state.participants, id);
    },
    addGroup (state, name) {
      const newId = Math.max(...Object.keys(state.groups)) + 1;
        Vue.set(state.groups, newId, {id: newId, name: name});
    },
    removeGroup(state, id) {
      Object.values(state.expenses).forEach(function(e){
          if (e.group.id == id) {
              Vue.delete(state.expenses, e.id);
          }
      });
      Vue.delete(state.groups, id);
    },
    addExpense (state, params) {
      const newId = Math.max(...Object.keys(state.expenses)) + 1;
      Vue.set(state.expenses, newId, {id: newId, amount: params.amount, participant: params.participant, group: params.group, name: params.name});
    },
    removeExpense(state, id) {
      Vue.delete(state.expenses, id);
    },
  },
  actions: {
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
    addExpense(context, params){
      context.commit('addExpense', params);
    },
    removeExpense(context, id) {
      context.commit('removeExpense', id);
    },
  },
  getters: {
    getParticipants: (state) => state.participants,
    getParticipant: (state) => (id) => state.participants[id],
    getGroups: (state) => state.groups,
    getGroup: (state) => (id) => state.groups[id],
    getExpenses: (state) => state.expenses,
    expensesSum: (state) => (participantId, groupId) => {
      return Object.values(state.expenses).reduce(function (sum, expense) {
        if ((groupId==null || expense.group==groupId) && (participantId==null || expense.participant==participantId)) {
          sum += expense.amount;
        }
        return sum;
      }, 0);
    },
  }
})

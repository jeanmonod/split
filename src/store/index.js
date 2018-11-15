import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex);

const initialState = {
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
    1: {id: 1, amount: 230.5, participant: 2, group: 2, name: 'Facture booking.com'},
    2: {id: 2, amount: 17.90, participant: 4, group: 1, name: 'Bières à l\'aéroport'},
    3: {id: 3, amount: 109.0, participant: 2, group: 2, name: 'Hôtel nuit supplémentaire'}
  }
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: initialState,
  mutations: mutations,
  actions: actions,
  getters: {
    getParticipant: (state) => (id) => state.participants[id],
    getGroup: (state) => (id) => state.groups[id],
    expensesSum: (state) => (participantId, groupId) => {
      return Object.values(state.expenses).reduce(function (sum, expense) {
        if ((groupId == null || expense.group === groupId) && (participantId == null || expense.participant === participantId)) {
          sum += expense.amount;
        }
        return sum;
      }, 0);
    },
    expensesGrandTotal: (state, getters) => getters.expensesSum(null, null),
    getParticipantPart: (state, getters) => (id) => getters.expensesGrandTotal / Object.keys(state.participants).length,
    sumParts: (state, getters) => Object.keys(state.participants).reduce((sum, pid) => sum + getters.getParticipantPart(pid), 0),
    getParticipantBalance: (state, getters) => (id) => getters.getParticipantPart(id) - getters.expensesSum(id, null),
    sumBalances: (state, getters) => Object.keys(state.participants).reduce((sum, pid) => sum + getters.getParticipantBalance(pid), 0),
  }
})

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
        1: {id: 1, amount: 23.5, participant: 2, group: 2, name: 'Facture booking.com'}
    }
};

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: initialState,
    mutations: mutations,
    actions: actions,
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

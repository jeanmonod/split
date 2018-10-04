import Vue from 'vue';

const mutations = {


    addParticipant (state, name) {
        const newId = Math.max(...Object.keys(state.participants)) + 1;
        Vue.set(state.participants, newId, {id: newId, name: name});
    },
    removeParticipant(state, id) {
        Object.values(state.expenses).forEach(function(e){
            if (e.participant == id) {
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
            if (e.group == id) {
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

};

export default mutations;
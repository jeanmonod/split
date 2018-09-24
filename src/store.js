import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    participants: ['Boutiller', 'Zuffrey', 'Alex', 'Seb', 'Damien', 'Frank', 'Ben', 'Cedric', 'Sylvain', 'David']
  },
  mutations: {
    addParticipant (state, name) {
      state.participants.push(name);
    },
    removeParticipant(state, position) {
      state.participants.splice(position, 1);
    }
  },
  actions: {
    addParticipant(context, name) {
      context.commit('addParticipant', name);
    },
    removeParticipant(context, position) {
      context.commit('removeParticipant', position);
    }
  }
})

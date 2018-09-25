import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    participants: ['Boutiller', 'Zuffrey', 'Alex', 'Seb', 'Damien', 'Frank', 'Ben', 'Cedric', 'Sylvain', 'David'],
    groups: ['Parc','Camping', 'Glaces/bières', 'Course']
  },
  mutations: {
    addParticipant (state, name) {
      state.participants.push(name);
    },
    removeParticipant(state, position) {
      state.participants.splice(position, 1);
    },
    addGroup (state, name) {
      state.groups.push(name);
    },
    removeGroup(state, position) {
      state.group.splice(position, 1);
    }
  },
  actions: {
    addParticipant(context, name) {
      context.commit('addParticipant', name);
    },
    removeParticipant(context, position) {
      context.commit('removeParticipant', position);
    },
    addGroup(context, name) {
        context.commit('addGroup', name);
    },
    removeGroup(context, position) {
        context.commit('removeGroup', position);
    }
  }
})

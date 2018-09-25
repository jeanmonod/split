import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
    }
  },
  mutations: {
    addParticipant (state, name) {
      const newId = Math.max(...Object.keys(state.participants)) + 1;
      state.participants[newId] = {id: newId, name: name};
    },
    removeParticipant(state, id) {
      Vue.delete(state.participants, id);
    },
    addGroup (state, name) {
      const newId = Math.max(...Object.keys(state.groups)) + 1;
      state.groups[newId] = {id: newId, name: name};
    },
    removeGroup(state, id) {
      Vue.delete(state.groups, id);
    }
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
    }
  }
})

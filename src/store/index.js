import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
import {getQueryStringParams, mergeDefaultAndQS} from '../../src/persistance';


Vue.use(Vuex);

let initialState = {
  version: 0.1,
  queryString: null,
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
  },
  refunds: {
    resolver: null,
    balances: {},
    transactions: {}
  }
};

const params = getQueryStringParams();
let data = params['data'];
if (data) {
  initialState = mergeDefaultAndQS(initialState, params['data']);
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: initialState,
  mutations: mutations,
  actions: actions,
  getters: getters
})

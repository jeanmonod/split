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
  participants: {},
  groups: {},
  expenses: {},
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

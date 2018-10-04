import {expect} from 'chai';
import mutations from '../../src/store/mutations.js';

const testState = {
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
    1: {id: 1, amount: 23.5, participant: 3, group: 2, name: 'Facture booking.com'},
    2: {id: 2, amount: 23.5, participant: 2, group: 1, name: 'Achats de bouffe'}
  }
};

const {removeGroup} = mutations;
describe('Group management', () => {
  it('Remove related expenses when I remove a group', () => {
    removeGroup(testState, 2);
    expect(Object.keys(testState.expenses).length).equal(1)
  })
})
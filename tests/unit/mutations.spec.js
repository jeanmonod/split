import {expect} from 'chai';
import mutations from '../../src/store/mutations.js';

let testState  = {};

function resetState() {
  testState = {
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
  }
}

const {removeGroup} = mutations;
describe('Group removal', () => {

  beforeEach(() => { resetState() });

  it('remove the groups from the state', () => {
    removeGroup(testState, 2);
    removeGroup(testState, 1);
    expect(testState.groups).to.deep.equal({3: {id: 3, name: 'Avions'}})
  });

  it('remove related expenses', () => {
    removeGroup(testState, 2);
    expect(testState.expenses).to.deep.equal({2: testState.expenses[2]});
  })

});

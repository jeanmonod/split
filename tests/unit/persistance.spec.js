import {expect} from 'chai';
import {encodeDataForURI, decodeURIAnswersParam, mergeDefaultAndQS} from '../../src/persistance';

describe('Encoding data For URI', () => {
  it('Encode and decode answers into a URI compatible string', () => {
    const version = '1.0.3';
    const data = { expenses: {
      1: {id: 1, amount: 23.5, participant: 3, group: 2, name: 'Facture booking.com'},
      2: {id: 2, amount: 23.5, participant: 2, group: 1, name: 'Achats de bouffe'}
    }};
    const encoded = encodeDataForURI(version, data);
    expect(encoded).to.be.a('string');
    const decoded = decodeURIAnswersParam(encoded);
    expect(decoded.version).to.equal(version);
    expect(decoded.data).to.eql(data);
  });
});

describe('Completion of a state with a querystring', () => {
  it('Refuse to populate when the version as changed', () => {
    const data = {toto: 'tata'};
    expect(() => mergeDefaultAndQS({version: 12, data}, encodeDataForURI(13, data))).to.throw('Invalid version')
  });
  it.skip('Merge the initial state with the one from the querystring', () => {

  });
});
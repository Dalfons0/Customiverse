import { should, use } from 'chai';
import sinon from 'sinon';
import resolvers from '../src/resolvers';
use(require('chai-as-promised'));
should();

interface Mutation {
  login: (source?: object, args?: object, context?: object) => Promise<string>;
}

const testContext = {
  dataSources: {
    authAPI: {
      getAccessToken: sinon.fake(),
    },
  },
};

describe('[Mutation.login]', () => {
  it('should retun a token if the code is valid', () => {
    const token = 'this_is_a_token';
    testContext.dataSources.authAPI.getAccessToken = sinon.fake.returns(token);

    return (resolvers.Mutation as Mutation).login(undefined, { code: 'valid_code' }, testContext).should.eventually.equal(token);
  });
});

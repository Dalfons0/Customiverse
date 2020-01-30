import resolvers from '../src/resolvers';
import { should, use } from 'chai';
use(require('chai-as-promised'));
should();

describe('[Mutation.login]', () => {

  it('should retun a token if the ACCES_TOKEN vaiable is setted', () => {
    const token = 'this_is_a_token';
    process.env.ACCESS_TOKEN = token;
    return resolvers.Mutation.login().should.eventually.equal(token);
  });

  it('should retun an empty string if the ACCES_TOKEN is not defined', () => {
    process.env.ACCESS_TOKEN = '';
    return resolvers.Mutation.login().should.eventually.equal('missing_token');
  });
});
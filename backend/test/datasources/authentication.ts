import { should, use } from 'chai';
import sinon, { SinonSpy } from 'sinon';
import AuthAPI from '../../src/datasources/authentication';
use(require('chai-as-promised'));
should();

const authAPI = new AuthAPI();
authAPI['post'] = sinon.fake();

afterEach(() => {
  sinon.restore();
});

describe('[authAPI.getAccessToken]', () => {
  it('should be called with one item per page more', async () => {
    const code = 'this_is_a_code';
    process.env.CLIENT_ID = 'client_id';
    process.env.CLIENT_SECRET = 'client_secret';

    await authAPI.getAccessToken(code);

    const fakeGet = authAPI['post'] as SinonSpy;
    fakeGet.calledOnce.should.be.true;
    fakeGet.firstCall.args.should.include('access_token');
    const params: string = fakeGet.firstCall.lastArg;
    params.should.be.equal(`client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`);
  });
});

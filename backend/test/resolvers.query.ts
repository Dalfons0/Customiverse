import { should, use } from 'chai';
import sinon from 'sinon';
import { PopularResponse, Thing } from 'src/model/ThingAPI';
import resolvers from '../src/resolvers';
use(require('chai-as-promised'));
should();

interface Query {
  popular: (source?: object, args?: object, context?: object) => Promise<PopularResponse>;
  thing: (source?: object, args?: object, context?: object) => Promise<Thing>;
}

const testContext = {
  dataSources: {
    thingAPI: {
      getPopularThings: sinon.fake(),
      getThingById: sinon.fake(),
    },
  },
};

afterEach(() => {
  sinon.restore();
});

describe('[Query.popular]', () => {
  it('should return 1 more element if there are more pages', async () => {
    testContext.dataSources.thingAPI.getPopularThings = sinon.fake.returns(new Array(13));
    const { page, perPage, result, hasMore } = await (resolvers.Query as Query).popular(undefined, {}, testContext);
    page.should.be.equal(1);
    perPage.should.be.equal(12);
    result.should.has.length(12);
    hasMore.should.be.true;
  });
});

describe('[Query.thing]', () => {
  it('should return a thing if found one', async () => {
    const id = 'id';
    await (resolvers.Query as Query).thing(undefined, { id }, testContext);
    testContext.dataSources.thingAPI.getThingById.firstCall.lastArg.thingId.should.be.equal(id);
  });
});

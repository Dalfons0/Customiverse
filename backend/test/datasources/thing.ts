import ThingAPI from '../../src/datasources/thing';
import sinon, { SinonSpy } from 'sinon';
import { should, use } from 'chai';
import { Response } from 'apollo-datasource-rest';
use(require('chai-as-promised'));
should();

const thingAPI = new ThingAPI();
thingAPI['get'] = sinon.fake();

afterEach(() => {
  sinon.restore();
});

describe('[ThingAPI.getPopularThings]', () => {
  it('should be called with one item per page more', async () => {
    await thingAPI.getPopularThings({page: 1, perPage: 12});

    const fakeGet = thingAPI['get'] as SinonSpy;
    fakeGet.calledOnce.should.be.true;
    fakeGet.firstCall.args.should.include('search/things');
    const {sort, page, per_page }: {sort: string, page: number, per_page: number} = fakeGet.firstCall.lastArg;
    sort.should.be.equal('popular');
    page.should.be.equal(1);
    per_page.should.be.equal(13);
  });
});

describe('[ThingAPI.getThingById]', () => {
  it('should map the thumbnail to the featured preview image', async () => {
    const thingId = 'id';
    const response = {
      id: thingId,
      name: 'name',
      thumbnail: 'thumbnail.jpg',
      default_image: { sizes: [{ type: 'preview', size: 'featured', url: 'preview.jpg'}]},
      creator: {},
      is_private: false,
      is_purchased: true,
      is_published: false,
      like_count: 200,
      collect_count: 200,
      added: 'date',
      description: 'description',
    };
    thingAPI['get'] = sinon.fake.returns(response);

    const thing = await thingAPI.getThingById({ thingId });

    const fakeGet = thingAPI['get'] as SinonSpy;
    fakeGet.calledOnce.should.be.true;
    fakeGet.firstCall.args.should.include('things/id');
    delete response.default_image;
    thing.should.be.deep.equals({...response, thumbnail: 'preview.jpg' });
  });

  it('should map the original thumbnail if no featured preview image exists', async () => {
    const thingId = 'id';
    const response = {
      id: thingId,
      name: 'name',
      thumbnail: 'thumbnail.jpg',
      default_image: { sizes: [{ type: 'tiny', size: 'featured', url: 'tiny.jpg'}, { type: 'preview', size: 'medium', url: 'preview.jpg'}]},
      creator: {},
      is_private: false,
      is_purchased: true,
      is_published: false,
      like_count: 200,
      collect_count: 200,
      added: 'date',
      description: 'description',
    };
    thingAPI['get'] = sinon.fake.returns(response);

    const thing = await thingAPI.getThingById({ thingId });

    const fakeGet = thingAPI['get'] as SinonSpy;
    fakeGet.calledOnce.should.be.true;
    fakeGet.firstCall.args.should.include('things/id');
    delete response.default_image;
    thing.should.be.deep.equals({...response, thumbnail: 'thumbnail.jpg' });
  });

  it('should map the original thumbnail if the default image has no sizes', async () => {
    const thingId = 'id';
    const response = {
      id: thingId,
      name: 'name',
      thumbnail: 'thumbnail.jpg',
      default_image: { },
      creator: {},
      is_private: false,
      is_purchased: true,
      is_published: false,
      like_count: 200,
      collect_count: 200,
      added: 'date',
      description: 'description',
    };
    thingAPI['get'] = sinon.fake.returns(response);

    const thing = await thingAPI.getThingById({ thingId });

    const fakeGet = thingAPI['get'] as SinonSpy;
    fakeGet.calledOnce.should.be.true;
    fakeGet.firstCall.args.should.include('things/id');
    delete response.default_image;
    thing.should.be.deep.equals({...response, thumbnail: 'thumbnail.jpg' });
  });

  it('should map the original thumbnail if there is no default image', async () => {
    const thingId = 'id';
    const response = {
      id: thingId,
      name: 'name',
      thumbnail: 'thumbnail.jpg',
      creator: {},
      is_private: false,
      is_purchased: true,
      is_published: false,
      like_count: 200,
      collect_count: 200,
      added: 'date',
      description: 'description',
    };
    thingAPI['get'] = sinon.fake.returns(response);

    const thing = await thingAPI.getThingById({ thingId });

    const fakeGet = thingAPI['get'] as SinonSpy;
    fakeGet.calledOnce.should.be.true;
    fakeGet.firstCall.args.should.include('things/id');
    thing.should.be.deep.equals({...response, thumbnail: 'thumbnail.jpg' });
  });

});
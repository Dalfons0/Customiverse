import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

type ID = { thingId: string };

enum IMAGE_TYPES {
  thumb = 'thumb',
  preview = 'preview',
  display = 'display',
}
enum IMAGE_SIZES {
  small = 'small',
  medium = 'medium',
  large = 'large',
  featured = 'featured',
  tiny = 'tiny',
  card = 'card',
}

export default class ThingAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.thingiverse.com/';
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', this.context.token);
  }

  async getPopularThings({ page, perPage }: any): Promise<unknown[]> {
    // Adding +1 to the page elements to know if there are more pages to fullfill
    const thingsParams = { sort: 'popular', page: page, per_page: perPage + 1 };
    return this.get('search/things', thingsParams);
  }

  async getThingById({ thingId }: ID): Promise<unknown> {
    const thing = await this.get(`things/${thingId}`);

    return this.mapThing(thing, thing.default_image, IMAGE_SIZES.featured, IMAGE_TYPES.preview);
  }

  private async mapThing(thing: any, image: any, imageSize: IMAGE_SIZES, imageType: IMAGE_TYPES): Promise<unknown> {
    return {
      id: thing.id,
      name: thing.name,
      thumbnail: this.findImageUrl(image, imageType, imageSize) || thing.thumbnail,
      creator: thing.creator,
      is_private: thing.is_private,
      is_purchased: thing.is_purchased,
      is_published: thing.is_published,
      like_count: thing.like_count,
      collect_count: thing.collect_count,
      added: thing.added,
      description: thing.description,
    };
  }

  private findImageUrl(image: any, imageType: IMAGE_TYPES, imageSize: IMAGE_SIZES) {
    const result = image.sizes!.find((image: any) => image.type === imageType, image.size === imageSize);
    return result && result.url;
  }
}

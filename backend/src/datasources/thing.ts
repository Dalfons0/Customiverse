import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { Pagination, ID, Thing, Image, ResponseThing, DefaultImage } from 'src/model';

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

  async getPopularThings({ page, perPage }: Pagination): Promise<Thing[]> {
    // Adding +1 to the page elements to know if there are more pages to fullfill
    const thingsParams = { sort: 'popular', page: page, per_page: perPage + 1 };
    return this.get('search/things', thingsParams);
  }

  async getThingById({ thingId }: ID): Promise<Thing> {
    const thing = await this.get<ResponseThing>(`things/${thingId}`);

    return this.mapThing(thing, thing.default_image, IMAGE_SIZES.featured, IMAGE_TYPES.preview);
  }

  private async mapThing(thing: ResponseThing, defaultImage?: DefaultImage, imageSize: IMAGE_SIZES = IMAGE_SIZES.medium, imageType: IMAGE_TYPES = IMAGE_TYPES.preview): Promise<Thing> {
    return {
      id: thing.id,
      name: thing.name,
      thumbnail: (defaultImage && this.findImageUrl(defaultImage, imageType, imageSize)) || thing.thumbnail,
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

  private findImageUrl({ sizes }: DefaultImage, imageType: IMAGE_TYPES, imageSize: IMAGE_SIZES): string | undefined{
    const result = sizes && sizes.find(image => image.type === imageType && image.size === imageSize);
    return result && result.url;
  }
}

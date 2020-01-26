import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

type ID = { thingId: string };

export default class ThingAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.thingiverse.com/';
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', this.context.token);
  }

  async getPopularThings(): Promise<unknown[]> {
    return this.get('popular');
  }

  async getThingById({ thingId }: ID): Promise<unknown[]> {
    return this.get(`things/${thingId}`);
  }
}

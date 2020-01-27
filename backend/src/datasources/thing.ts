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

                 async getPopularThings({ page, perPage }: any): Promise<unknown[]> {
                   // Adding +1 to the page elements to know if there are more pages to fullfill
                   const params = { sort: 'popular', page: page, per_page: perPage++ };
                   return this.get('search/things', params);
                 }

                 async getThingById({ thingId }: ID): Promise<unknown[]> {
                   return this.get(`things/${thingId}`);
                 }
               }

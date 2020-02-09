import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { parse, stringify } from 'query-string';

export default class AuthAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.thingiverse.com/login/oauth/';
  }

  public willSendRequest(request: RequestOptions) {
    request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
  }

  public async getAccessToken(code: string) {
    const clientParams = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    };

    const res = await this.post('access_token', stringify(clientParams));
    const { access_token } = parse(res);
    return access_token;
  }
}

type ID = { thingId: string };

export interface Pagination {
  page: number;
  perPage: number;
}

export interface PopularResponse extends Pagination{
  result: Thing[];
  hasMore: boolean;
}

export interface Thing {
  id: string;
  name: string;
  thumbnail: string;
  creator: object;
  is_private: boolean;
  is_purchased: boolean;
  is_published: boolean;
  like_count: boolean;
  collect_count: number;
  added: number;
  description: string;
}

export interface ResponseThing extends Thing{
  default_image?: DefaultImage;
}

export interface DefaultImage {
  name: string;
  url: string;
  sizes?: Image[];
}

export interface Image { 
  size: string;
  type: string;
  url: string;
}


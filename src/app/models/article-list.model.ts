export class ArticleList {
    type: string;
  
    filters: {
      tag?: string,
      author?: string,
      favorited?: string,
      limit?: number,
      offset?: number
    };
  }
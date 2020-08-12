import { Comment } from './Comment';

export class BlogPost {
  // tslint:disable-next-line: variable-name
  _id: string;
  title: string;
  postDate: string;
  featuredImage: string;
  post: string;
  postedBy: string;
  comments: Array<Comment>;
  category: string;
  tags: Array<string>;
  isPrivate: boolean;
  views: number;
}

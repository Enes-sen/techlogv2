import { Post } from "../addpostform/post";
import { User } from "../registerform/user";

export class CommEnt {
  _id:string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likes: string[];
  user: User;
  post: Post;
}

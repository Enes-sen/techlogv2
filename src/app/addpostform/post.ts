import { CommEnt } from "../postcommentsform/comment";
import { User } from "../registerform/user";

export class Post {
  _id: string;
  imageUrl: string;
  title: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likes: string[];
  user: User;
  commentCount: number;
  comments: CommEnt[];
  likesCount: number;

};

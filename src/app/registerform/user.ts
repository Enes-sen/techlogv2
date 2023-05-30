 export class User {
  _id:string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  profile_image: string;
  blocked: boolean;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
};

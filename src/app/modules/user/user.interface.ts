/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  name: string;
  email: string;
  password: string;
  contactNo: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: Date;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  role: 'user' | 'admin';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  // instance method for checking if the user exists or not
  isUserExists(email: string): Promise<TUser | null>;

  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;

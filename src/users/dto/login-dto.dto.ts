import {
  IsEmail,
  IsString,
  Length,
  IsNotEmpty,
  Contains,
} from 'class-validator';

export class UserLoginDTO {

  readonly username: string;
  readonly password: string;
  
}

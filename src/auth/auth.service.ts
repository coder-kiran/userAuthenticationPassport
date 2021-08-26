import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(fname: string, pass: string): Promise<any> {
  console.log('step 2: auth.servic.ts');
  console.log('fname ; ',fname);
  
  const user = await this.userService.findPerson(fname);    
    if (user) {
      console.log('User Founded',user);
      
      const resultUser = await bcrypt
        .compare(pass, user.password)
        .then((status) => {
          if (status) {
            console.log('<<--  LOGGED IN SUCCESSFULLY   -->>');
            console.log(` WELCOME , ${user.fname} ${user.lname}`);
            //  const { password, ...result } = user;
            //  console.log('RESULT',result);
            return user;
          } else {
            console.log('<<--  OOPs..! ENTERED PASSWORD IS WRONG  -->>');
            return null;
          }
        });

      return resultUser;
    } else {
      console.log('Nooooooo user');
      return null;
    }

  }

 

}

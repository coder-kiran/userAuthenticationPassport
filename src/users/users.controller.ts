import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { ItemService } from 'src/Items/items.services';
import { UserLoginDTO } from './dto/login-dto.dto';
import { UserDTO } from './dto/user-dto.dto';
import { UserDocument, UserSchemaClass } from './schemas/user-schema.schema';
import { UserService } from './users.service';

var phoneToken = require('generate-sms-verification-code');
var generatedToken =0;

var isphonenumberverified = false;

@Controller('userroute')
export class UserController {

constructor(private readonly userService: UserService,private readonly itemService: ItemService) {}


@Post('signup')
signUpUser(@Body() gettingUserData: UserDTO): Promise<UserSchemaClass> {
  console.log('signup', gettingUserData);
  
  console.log('isphonenumberverified =>',isphonenumberverified);
  if(isphonenumberverified){
   return this.userService.signUpUser(gettingUserData);
  }
}

@Post('signupotp')  
signUpWithOtp(@Body() body) {
  
    if( generatedToken == body.rnum ){
    isphonenumberverified=true;
    console.log('SUCCESS..OTP MATCHED');
    return 'Success.Please enter your details'    
  }else{
    generatedToken = phoneToken(8, { type: 'number' });
    console.log('YOUR OTP IS: ',generatedToken);
    return generatedToken;
  }
 
} 
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req){  
    console.log('3. user guard accepted');     
  return  `WELCOME, ${req.user.fname} ${req.user.lname}`;
     }

  @Get('item')
  getItem() {
    return this.itemService.getItem()
  }

}

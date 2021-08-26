import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(fname: string, password: string): Promise<any> {
    console.log('step 1: local.strategy.ts');
    
  
    const user = await this.authService.validateUser(fname, password);
    if (!user) {
      console.log('No Such User');      
      throw new UnauthorizedException();      
    }
    return user;
  }
}
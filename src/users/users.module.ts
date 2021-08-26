import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { ItemModule } from 'src/Items/items.module';
import { UserSchema } from './schemas/user-schema.schema';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [forwardRef(()=>AuthModule),ItemModule  ,
      MongooseModule.forFeature([{name:'Usermodel', schema: UserSchema}])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}

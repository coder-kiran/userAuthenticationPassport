import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule,AuthModule,MongooseModule.forRoot('mongodb://localhost/testdbone') ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

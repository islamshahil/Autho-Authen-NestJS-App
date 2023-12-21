import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HelloController } from './hello/hello.controller';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './auth/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forRoot(process.env.DB_URI),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    AuthModule
  ],
  controllers: [AppController, HelloController],
  providers: [AppService, JwtService],
})
export class AppModule {}

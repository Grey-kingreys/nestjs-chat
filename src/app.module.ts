import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy , PrismaService],
})
export class AppModule {}

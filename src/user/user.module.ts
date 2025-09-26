import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  providers: [UserService, JwtStrategy , PrismaService],
  exports: [UserService]
})
export class UserModule {}

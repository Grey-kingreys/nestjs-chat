import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { MailerService } from 'src/mailer.service';

@Module({
  providers: [UserService, JwtStrategy , PrismaService, MailerService],
  exports: [UserService]
})
export class UserModule {}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { createId } from '@paralleldrive/cuid2';
import { MailerService } from '../mailer.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService, 
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService
    ){}
    async login(authBody: LoginDto){ 
        const {email, password} = authBody
        const user = await this.prisma.user.findUnique(
            {
                where: {email}
            }
        )
        if(!user){
            throw new UnauthorizedException({
                error: true,
                message: 'Email ou mot de passe incorrect'
              });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            throw new UnauthorizedException({
                error: true,
                message: 'Email ou mot de passe incorrect'
              });
        }
        const payload = {
            id: user.id,
            email: user.email
        }
        const token = this.jwtService.sign(payload)
        return {
            token
        }        
    }

    async validateUser(userId: string) {

        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        if(!user){
            throw new UnauthorizedException({
                error: true,
                message: 'Utilisateur non trouver'
              });
        }

        return user
    }


    async sendResetPasswordEmail({email}:{email: string}){ 

        try{
            const user = await this.prisma.user.findUnique(
                {
                    where: {
                        email: email
                    }
                }
            )
            if(!user){
                throw new UnauthorizedException({
                    error: true,
                    message: "L'utilisateur n'a pas ete trouver"
                });
            }

            if(user.isResettingPassword == true){
                throw new UnauthorizedException({
                    error: true,
                    message: "L'utilisateur est deja en train de reset son mot de passe"
                });
            }

            const createdId = createId();
            await this.prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    isResettingPassword: true,
                    resetPasswordToken: createdId
                }
            })

            await this.mailerService.sendResetPasswordEmail({ 
                recipient: user.email,
                name: user.name,
                token: createdId
            })

            return {
                error: false,
                message: "Veuillez consulter votre email pour reinitialiser votre mot de passe"
            }

            // const payload = {
            //     id: user.id,
            //     email: user.email
            // }
            // const token = this.jwtService.sign(payload)
            // return {
            //     token,
            //     userId: user.id
            // }
        }catch(error){
            return {
                error: true,
                message: error.message
            }
        }
    }
}

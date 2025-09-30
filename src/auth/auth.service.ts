import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService){}
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
}

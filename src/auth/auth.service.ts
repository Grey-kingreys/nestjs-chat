import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { hash }  from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService){}

    async login(authBody: any){
        const {email, password} = authBody;
        const hashedPassword = await this.hashpassword({password})

        const user = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if(!user){
            throw new Error('Utilisateur non trouver')
        }

        const isPassword = hashedPassword === user.password
        if(!isPassword){
            throw new Error('Mot de passe incorrect')
        }

    }

    private async hashpassword({password}: {password: string}){
        const hashedPassword = await hash(password, 10)
        return hashedPassword
    }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}
    async getUsers(){
        const users = await this.prisma.user.findMany(
            {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        )
        return users
    }

    async getUser({userId}: {userId: string}) {
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
            throw new Error('Utilisateur non trouver')
        }
        return user
    }


    async createUser(CreateUserDto: CreateUserDto){
        const {name, email, password} = CreateUserDto;

        const UserExists = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        if(UserExists){
            throw new Error('L utilisateur existe deja')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            },

            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        const payload = {
            id: user.id,
            email: user.email
        }

        const token = this.jwtService.sign(payload)

        return {
            user,
            token
        }
    }

    

    
}



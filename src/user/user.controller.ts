import { Controller, Get, Param, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGard } from 'src/auth/jwt.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGard)
    @Get()
    getUser(){
        return this.userService.getUsers()
    }

    @UseGuards(JwtAuthGard)
    @Get('/:userId')
    getUserById(@Param('userId') userId: string){
        return this.userService.getUser({userId})
    }

    
    @Post('register')
    createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto)
    }


    
    
}

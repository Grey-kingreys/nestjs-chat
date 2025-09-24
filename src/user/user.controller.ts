import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    getUser(){
        return this.userService.getUsers()
    }
    @Get('/:userId')
    getUserById(@Param('userId') userId: string){
        return this.userService.getUser({userId})
    }
}

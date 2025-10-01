import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGard } from 'src/auth/jwt.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('/login')
    async login(@Body() authBody: LoginDto ){
        
       return this.authService.login(authBody)
    }

    @UseGuards(JwtAuthGard)
    @Get('validate')
    validateUser(@Request() req){
        return this.authService.validateUser(req.user.id)
    }

    @Post('reset-password')
    async resetUserPassword(@Body('email') email: string){
        return this.authService.sendResetPasswordEmail({email})
    }

}

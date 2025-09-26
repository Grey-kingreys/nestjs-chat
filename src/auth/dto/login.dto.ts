import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {


    @IsEmail(
        {
            blacklisted_chars: ' \\\'&"\\(\\)\\[\\]\\{\\}=$*!:;,<>?/§ '
            
        },

        {
            message: 'Email is not valid'
        }
    )
    @IsNotEmpty(
        {
            message: 'Email est requis'
        }
    )
    @IsString(
        {
            message: 'Email doit etre une chaine de caractere'
        }
    )
    @ApiProperty(
        {
            example: 'user@example.com',
            description: 'Email de l utilisateur',
            required: true,
            type: 'string',
            format: 'email',
        }
    )    
    email: string;


    @IsNotEmpty(
        {
            message: 'Mot de passe est requis'
        }
    )
    @IsString(
        {
            message: 'Mot de passe doit etre une chaine de caractere'
        }
    )
    @MinLength( 8,
        {
            message: 'Mot de passe doit etre au moins 8 caracteres'
        }
    )
    @ApiProperty(
        {
            example: 'user@2055US',
            description: 'Mot de passe de l utilisateur',
            required: true,
            type: 'string',
            format: 'email',
            minLength: 8,
            
        }
    )    
    password: string;


    
}

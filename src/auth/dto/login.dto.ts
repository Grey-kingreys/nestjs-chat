import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail(
        {
            blacklisted_chars: ' \'&"\(\)\[\]\{\}=$*!:;,<>?/§ ',
            
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
    password: string;


    
}

import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {

    @IsEmail(
        {
            blacklisted_chars: ' \'&"\(\)\[\]\{\}=$*!:;,<>?/§ ',
            
        },

        {
            message: 'Email is not valid'
        }
    )
    
    email: string;



    password: string;




    name?: string;
    
}

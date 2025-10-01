import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailerService {
    private readonly mailer: Resend;
    
    constructor() {
        // Correction de la variable d'environnement
        this.mailer = new Resend(process.env.RESEND_API_KEY);
    }

    async sendCreatedAccountEmail({recipient, name}: {recipient: string, name: string}) {
        try {
            const { data, error } = await this.mailer.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: [recipient],
                subject: 'Bienvenue sur NestJS chat',
                html: `Bienvenue ${name} sur NestJS chat! Nous sommes <strong>heureux</strong> de vous avoir parmi nous!`,
            });
            
            if (error) {
                console.error({ error });
                throw new Error(`Failed to send email: ${error.message}`);
            }
            
            console.log({ data });
            return data;
            
        } catch (error) {
            console.error('Email sending failed:', error);
            throw error; // Important : propager l'erreur
        }
    }


    async sendResetPasswordEmail({
        recipient, 
        name,
        token
    }: 
    {
        recipient: string,
        name: string, 
        token: string
    }) {
        try {

            const link = `${process.env.FRONT_URL}/reset-password?token=${token}`;
            const { data, error } = await this.mailer.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: [recipient],
                subject: 'NestJS chat - Reinitialisation de mot de passe',
                html: `Bonjour ${name}, Voici votre lien de réinitialisation de mot de passe: ${link}`,
            });
            
            if (error) {
                console.error({ error });
                throw new Error(`Failed to send email: ${error.message}`);
            }
            
            console.log({ data });
            return data;
            
        } catch (error) {
            console.error('Email sending failed:', error);
            throw error; // Important : propager l'erreur
        }
    }
}
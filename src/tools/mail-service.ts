import nodemailer from 'nodemailer';
import {config} from "../configs";

class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.nodemailer.host,
            port: parseInt(config.nodemailer.port || '587'),
            secure: false,
            auth: {
                user: config.nodemailer.user,
                pass: config.nodemailer.pass,
            },
        });
    }

    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: config.nodemailer.user,
            to,
            subject: `Activation message for ${config.nodemailer.url}`,
            text: '',
            html: `<div>
                <h1>Follow the link to activate your account</h1>
                <a href="${link}">${link}</a>
             </div>`,
        });
    }
}

export default new MailService();

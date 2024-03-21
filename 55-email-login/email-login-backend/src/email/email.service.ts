import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(private configService: ConfigService) {
    const host = this.configService.get('NODEMAILER_HOST');
    const port = this.configService.get('NODEMAILER_PORT');
    const user = this.configService.get('NODEMAILER_AUTH_USER');
    const pass = this.configService.get('NODEMAILER_AUTH_PASS');
    this.transporter = createTransport({
      host,
      port,
      secure: false,
      auth: {
        user,
        pass,
      },
    });
  }

  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: this.configService.get('NODEMAILER_NAME'),
        address: this.configService.get('NODEMAILER_AUTH_USER'),
      },
      to,
      subject,
      html,
    });
  }
}

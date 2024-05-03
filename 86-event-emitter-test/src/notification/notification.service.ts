import { Inject, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { EmailService } from 'src/email/email.service';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class NotificationService {
  @Inject(EmailService)
  private emailService: EmailService;

  @OnEvent('user.register')
  async handleUserRegister(data) {
    console.log('user.register');

    await this.emailService.sendMail({
      to: data.email,
      subject: '欢迎' + data.username,
      html: '欢迎新人',
    });
  }

  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}

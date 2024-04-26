import { Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DepartmentService } from './department.service';
import { EmployeeService } from './employee.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Inject(DepartmentService)
  private departmentService: DepartmentService;

  @Inject(EmployeeService)
  private employeeService: EmployeeService;

  @Post('create')
  async create() {
    const department = await this.departmentService.create({
      name: '技术部',
    });

    const employee = await this.employeeService.create({
      name: '张三',
      phone: '123456789',
      department: {
        connect: {
          id: department.id,
        },
      },
    });

    return employee;
  }
}

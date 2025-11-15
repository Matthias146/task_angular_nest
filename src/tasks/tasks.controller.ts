import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import type { Request } from 'express';
import { User } from '../users/entity/user.entity';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Req() req: Request) {
    const user = req.user as User;
    return this.tasksService.findAll(user.id);
  }

  @Post()
  create(@Body() dto: CreateTaskDto, @Req() req: Request) {
    const user = req.user as User;
    return this.tasksService.create(dto, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateTaskDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.tasksService.update(id, dto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Req() req: Request) {
    const user = req.user as User;
    return this.tasksService.remove(id, user.id);
  }
}

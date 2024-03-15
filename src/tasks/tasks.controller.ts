import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TasksStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { filter } from 'rxjs';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.taskService.getTasksFilters(filterDto)
        } else {
            return this.taskService.getAllTasks();
        }

    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto,
    ): Task {
        return this.taskService.createTask(createTaskDto);
    }

    @Patch('/:id/status')
    updateTaskById(
        @Param('id') id: string,
        @Body('status') status: TasksStatus): Task {
        return this.taskService.updateTaskById(id, status);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): string {
        return this.taskService.deleteTaskById(id);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  // Create a new task
  async create(title: string): Promise<Task> {
    const task = this.taskRepository.create({ title });
    return this.taskRepository.save(task);
  }

  // Get all tasks
  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  // Get a single task by id
  async findOne(id: number): Promise<Task | null> {
    return this.taskRepository.findOneBy({ id });
  }

  // Update a task
  async update(id: number, updateData: Partial<Task>): Promise<Task | null> {
    await this.taskRepository.update(id, updateData);
    return this.findOne(id);
  }

  // Delete a task
  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
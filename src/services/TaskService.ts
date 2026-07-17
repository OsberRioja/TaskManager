import { Task } from '../models/task';
import { FileManager } from '../utils/FileManager';

export class TaskService {
    private fileManager: FileManager;

    constructor(fileManager: FileManager) {
        this.fileManager = fileManager;
    }

    async getAllTasks(): Promise<Task[]> {
        return await this.fileManager.loadTasks();
    }

    async getPendingTasks(): Promise<Task[]> {
        const tasks = await this.fileManager.loadTasks();
        return tasks.filter(task => !task.completed);
    }

    async getTaskById(id: number): Promise<Task | undefined> {
        const tasks = await this.fileManager.loadTasks();
        return tasks.find(task => task.id === id);
    }
}
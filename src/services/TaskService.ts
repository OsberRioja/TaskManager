import { Task } from '../models/task';
import { FileManager } from '../utils/FileManager';

export class TaskService {
    private fileManager: FileManager;

    constructor(fileManager: FileManager) {
        this.fileManager = fileManager;
    }

    //OBTIENE TODAS LAS TAREAS
    async getAllTasks(): Promise<Task[]> {
        return await this.fileManager.loadTasks();
    }

    //OBTIENE TODAS LAS TAREAS PENDIENTES
    async getPendingTasks(): Promise<Task[]> {
        const tasks = await this.fileManager.loadTasks();
        return tasks.filter(task => !task.completed);
    }

    //OBTIENE UNA TAREA POR ID
    async getTaskById(id: number): Promise<Task | undefined> {
        const tasks = await this.fileManager.loadTasks();
        return tasks.find(task => task.id === id);
    }
    
    //AGREGA UNA NUEVA TAREA
    async addTask(title: string): Promise<Task> {
        const tasks = await this.fileManager.loadTasks();
        const newTask = new Task(tasks.length + 1, title);
        tasks.push(newTask);
        await this.fileManager.saveTasks(tasks);
        return newTask;
    }

    //ELIMINA UNA TAREA POR ID
    async deleteTask(id: number): Promise<boolean> {
        const tasks = await this.fileManager.loadTasks();
        const index = tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            tasks.splice(index, 1);
            await this.fileManager.saveTasks(tasks);
            return true;
        }
        return false;
    }

    //MARCA UNA TAREA COMO COMPLETADA
    async completeTask(id: number): Promise<Task | undefined> {
        const tasks = await this.fileManager.loadTasks();
        const task = tasks.find(task => task.id === id);
        if (task) {
            task.completed = true;
            await this.fileManager.saveTasks(tasks);
            return task;
        }
        return undefined;
    }
}
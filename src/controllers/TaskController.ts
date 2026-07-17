import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";

export class TaskController {
    private taskService: TaskService;
    
    constructor(taskService: TaskService) {
        this.taskService = taskService;
    }

    //POST /tasks - Crea una nueva tarea
    async createTask(req: Request, res: Response) {
        const { title } = req.body;
        const newTask = await this.taskService.addTask(title);
        res.status(201).json(newTask);
    }

    //DELETE /tasks/:id - Elimina una tarea por ID
    async deleteTask(req: Request, res: Response) {
        const id = Number(req.params.id);
        const deleted = await this.taskService.deleteTask(id);
        if (!deleted) {
            res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    }

    //PUT /tasks/:id - Marca una tarea como completada
    async completeTask(req: Request, res: Response) {
        const id = Number(req.params.id);
        const task = await this.taskService.completeTask(id);
        if (!task) {
            res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    }

    //GET /tasks/pending - Obtiene todas las tareas pendientes
    async getPendingTasks(req: Request, res: Response) {
        const tasks = await this.taskService.getPendingTasks();
        res.json(tasks);
    }

    //GET /tasks/:id - Obtiene una tarea por ID
    async getTaskById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const task = await this.taskService.getTaskById(id);
        if (!task) {
            res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    }

    //GET /tasks - Obtiene todas las tareas
    async getAllTasks(req: Request, res: Response) {
        const tasks = await this.taskService.getAllTasks();
        res.json(tasks);
    }
}
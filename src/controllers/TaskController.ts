import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { success, error } from "../utils/response";

export class TaskController {
    private taskService: TaskService;
    
    constructor(taskService: TaskService) {
        this.taskService = taskService;
    }

    //POST /tasks - Crea una nueva tarea
    async createTask(req: Request, res: Response) {
        const { title } = req.body;

        if (!title || title.trim() === "") {
            return error(res, "Title is required", 400);
        }

        const newTask = await this.taskService.addTask(title);
        res.status(201).json(newTask);
    }

    //DELETE /tasks/:id - Elimina una tarea por ID
    async deleteTask(req: Request, res: Response) {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return error(res, "Invalid task ID", 400);
        }

        const deleted = await this.taskService.deleteTask(id);

        if (!deleted) {
            res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" });
    }

    //PUT /tasks/:id - Marca una tarea como completada
    async completeTask(req: Request, res: Response) {
        try{
            const id = Number(req.params.id);

            if (Number.isNaN(id)) {
                return error(res, "Invalid task ID", 400);
            }

            const task = await this.taskService.completeTask(id);

            if (!task) {
                res.status(404).json({ message: "Task not found" });
            }
            return success(res, task);

        } catch (err) {
        return error(res, "Error completing task", 500);
        }
    }

    //GET /tasks/pending - Obtiene todas las tareas pendientes
    async getPendingTasks(req: Request, res: Response) {
        try{
            const tasks = await this.taskService.getPendingTasks();
            return success(res, tasks);

        } catch (err) {
            return error(res, "Error fetching pending tasks", 500);
        }
    }

    //GET /tasks/:id - Obtiene una tarea por ID
    async getTaskById(req: Request, res: Response) {
        try{
            const id = Number(req.params.id);

            if(Number.isNaN(id)) {
                return error(res, "Invalid task ID", 400);
            }

            const task = await this.taskService.getTaskById(id);

            if (!task) {
                res.status(404).json({ message: "Task not found" });
            }

            return success(res, task);

        } catch (err) {
            return error(res, "Error fetching task", 500);
        }
    }

    //GET /tasks - Obtiene todas las tareas
    async getAllTasks(req: Request, res: Response) {
        try{
            const tasks = await this.taskService.getAllTasks();
            return success(res, tasks);
        } catch (err) {
            return error(res, "Error fetching all tasks", 500);
        }
    }
}
// Representa una tarea dentro del sistema.
export class Task {
    id: number;
    title: string;
    completed: boolean;

    // Inicializa una nueva tarea.
    constructor(id: number, title: string, completed: boolean = false) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
}
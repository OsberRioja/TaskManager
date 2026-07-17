import readline from "readline";
import { FileManager } from "./utils/FileManager";
import { TaskService } from "./services/TaskService";

const fileManager = new FileManager();
const taskService = new TaskService(fileManager);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Permite utilizar readline con async/await.
function question(text: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(text, resolve);
    });
}

async function pause(): Promise<void> {
    await question("\nPresione ENTER para continuar...");
}

// Muestra todas las tareas pendientes.
async function showPendingTasks(): Promise<void> {
    const tasks = await taskService.getPendingTasks();

    if (tasks.length === 0) {
        console.log("\nNo hay tareas pendientes.\n");
        return;
    }

    console.log("\n===== TAREAS PENDIENTES =====");

    tasks.forEach(task => {
        console.log(`${task.id}. ${task.title}`);
    });

    console.log();
}

// Agrega una nueva tarea.
async function addTask(): Promise<void> {
    const title = await question("Ingrese el título de la tarea: ");

    const task = await taskService.addTask(title);

    console.log(`\nTarea creada con ID ${task.id}\n`);
}

// Elimina una tarea.
async function deleteTask(): Promise<void> {
    const id = Number(await question("Ingrese el ID de la tarea: "));

    const deleted = await taskService.deleteTask(id);

    if (deleted) {
        console.log("\nTarea eliminada correctamente.\n");
    } else {
        console.log("\nNo existe una tarea con ese ID.\n");
    }
}

// Marca una tarea como completada.
async function completeTask(): Promise<void> {
    const id = Number(await question("Ingrese el ID de la tarea: "));

    const task = await taskService.completeTask(id);

    if (task) {
        console.log("\nTarea marcada como completada.\n");
    } else {
        console.log("\nNo existe una tarea con ese ID.\n");
    }
}

async function showAllTasks(): Promise<void> {
    const tasks = await taskService.getAllTasks();

    if (tasks.length === 0) {
        console.log("\nNo hay tareas.\n");
        return;
    }

    console.log("\n===== TODAS LAS TAREAS =====");

    tasks.forEach(task => {
        console.log(`${task.id}. ${task.title} - ${task.completed ? 'Completada' : 'Pendiente'}`);
    });

    console.log();
}

// Menú principal.
async function showMenu(): Promise<void> {

    let running = true;

    while (running) {

        console.clear();
        console.log("=================================");
        console.log("         TASK MANAGER");
        console.log("=================================");
        console.log("1. Agregar tarea");
        console.log("2. Eliminar tarea");
        console.log("3. Completar tarea");
        console.log("4. Listar tareas pendientes");
        console.log("5. Listar todas las tareas");
        console.log("6. Salir");

        const option = await question("\nSeleccione una opción: ");

        switch (option) {

            case "1":
                console.clear();
                await addTask();
                await pause();
                break;

            case "2":
                console.clear();
                await deleteTask();
                await pause();
                break;

            case "3":
                console.clear();
                await completeTask();
                await pause();
                break;

            case "4":
                console.clear();
                await showPendingTasks();
                await pause();
                break;

            case "5":
                console.clear();
                await showAllTasks();
                await pause();
                break;

            case "6":
                running = false;
                break;

            default:
                console.log("\nOpción inválida.\n");
        }
    }

    rl.close();
}

showMenu();
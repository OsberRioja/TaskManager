# TaskManager

Aplicación para gestión de tareas desarrollada en TypeScript.

## Instalación

Instalar dependencias:

```bash
npm install
```

## Aplicación de consola

Ejecutar:

```bash
npm run console
```

La aplicación permite:

- Crear tareas.
- Eliminar tareas.
- Marcar tareas como completadas.
- Listar tareas pendientes.
- Guardar tareas en un archivo JSON.

## API REST

Ejecutar servidor:

```bash
npm run dev
```

La API estará disponible en:
http://localhost:3000

### Endpoints

#### Crear tarea

`POST /tasks`

Body:

```json
{
    "title": "Nueva tarea"
}
```

#### Listar tareas pendientes

`GET /tasks/pending`

#### Obtener tarea por ID

`GET /tasks/:id`

Ejemplo:
/tasks/1

#### Marcar tarea como completada

`PUT /tasks/:id`

#### Eliminar tarea

`DELETE /tasks/:id`

### Listar todas las tareas

`GET /tasks`

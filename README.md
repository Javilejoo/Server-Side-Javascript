# LAB 6 Backend
## API
Esta API está diseñada para proporcionar acceso a una colección de personajes. Permite a los usuarios recuperar información sobre los personajes a través de varios endpoints.
## Endpoints

### GET /posts
Este endpoint recupera todos los personajes de la API.

### GET /posts/{id}
Este endpoint recupera un personaje específico según el id proporcionado.

### POST /posts
Este endpoint permite a los usuarios crear un nuevo personaje.

### PUT /posts/{id}
Este endpoint permite a los usuarios actualizar un personaje existente según el id proporcionado.

### DELETE /posts/{id}
Este endpoint permite a los usuarios eliminar un personaje según el id proporcionado.

## Instalación

1. Clona el repositorio.
2. Ejecuta `npm install` para instalar las dependencias.
3. Ejecuta `npm run lint` para ver lint.
4. Ejecuta `npm start` para iniciar la aplicación.

## Uso

Un ejemplo de uso de un endpoint get para traer todos los personajes.

1. Abrir Postman.
2. Ingresa la URL `http://127.0.0.1:3010` en la barra de direcciones con un GET.
3. agregarle `http://127.0.0.1:3010/posts` al get para acceder al endpoint.
3. Se mostrará los personajes si lo hay de la Api o un array vacio.
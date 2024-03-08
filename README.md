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
2. Crear imagen de docker y contenedor con los siguientes comandos
para generar la imagen ejecutar primero este `docker build -t mysql_blog .`
luego este comando `docker run --name mysql_container -d -p 33068:3306 mysql_blog`
3. Ejecuta `npm install` para instalar las dependencias.
4. Ejecuta `npm run lint` para ver lint.
5. Ejecuta `npm start` para iniciar la aplicación.

## Uso

Un ejemplo de uso de un endpoint get para traer todos los personajes.

1. Abrir Postman.
2. Ingresa la URL `http://127.0.0.1:3010` en la barra de direcciones con un GET.
3. agregarle `http://127.0.0.1:3010/posts` al get para acceder al endpoint.
3. Se mostrará los personajes si lo hay de la Api o un array vacio.
4. En caso de usar los endpoints de crear o modificar, este es el bodyraw.
{
  "name": "Monkey D. Luffy",
  "age": 19,
  "epithet": "Sombrero de Paja",
  "occupation": "Pirata, Capitán",
  "bounty": 3000000000,
  "devilFruit": "Gomu Gomu no Mi",
  "imageUrl": "https://example.com/luffy.jpg",
  "imageBase64": "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAgACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbW//Z",
  "description": "Monkey D. Luffy es el protagonista principal de la serie de anime y manga One Piece. Es el capitán de la tripulación de los Piratas del Sombrero de Paja y se le conoce como 'Luffy del Sombrero de Paja'. Luffy es un joven valiente y aventurero que tiene como objetivo principal encontrar el legendario tesoro conocido como el 'One Piece' y convertirse en el Rey de los Piratas. Posee la Fruta del Diablo llamada Gomu Gomu no Mi, que le otorga la capacidad de estirar su cuerpo como si fuera de goma, lo que le permite realizar ataques elásticos y poderosos en combate."
}

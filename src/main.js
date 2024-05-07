import express from 'express'
import cors from 'cors'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import pool  from './conn.js'
import {
  getAllCharacters, getCharacterById, createCharacter, deleteCharacterById, updateCharacterById,
} from './db.js'

const app = express()
app.use(express.json())
app.use(cors())
const port = 3010

// Configuración de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Personajes de One Piece',
      version: '1.0.0',
      description: 'Una API para administrar personajes de One Piece.',
    },
  },
  apis: ['./main.js'],
}

const specs = swaggerJsdoc(options)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtiene todos los personajes
 *     description: Endpoint para obtener todos los personajes.
 *     responses:
 *       200:
 *         description: Lista de personajes obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Character'
 *       500:
 *         description: Error en el servidor.
 */
app.get('/posts', async (req, res) => {
  try {
    const characters = await getAllCharacters()
    res.json(characters)
  } catch (error) {
    console.error('Error en la solicitud de personajes:', error)
    res.status(500).json({ error: 'Error en el servidor' })
  }
})

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Obtiene un personaje por su ID
 *     description: Endpoint para obtener un personaje por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del personaje a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Personaje obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       404:
 *         description: Personaje no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
app.get('/posts/:id', async (req, res) => {
  const character = await getCharacterById(req.params.id)
  res.json(character)
})

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crea un nuevo personaje
 *     description: Endpoint para crear un nuevo personaje.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCharacter'
 *     responses:
 *       200:
 *         description: Personaje creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       400:
 *         description: Error de validación de la solicitud.
 *       500:
 *         description: Error en el servidor.
 */
app.post('/posts', async (req, res) => {
  try {
    const character = await createCharacter(
      req.body.name,
      req.body.age,
      req.body.epithet,
      req.body.occupation,
      req.body.bounty,
      req.body.devilFruit,
      req.body.imageUrl,
      req.body.imageBase64,
      req.body.description,
    )
    // Devolver el estado y los datos del personaje creado en la respuesta JSON
    res.status(200).json({ status: 200, data: character.data })
  } catch (error) {
    console.error('Error al crear el personaje:', error)
    res.status(error.status || 500).json(error.data || { error: 'Error en el servidor' })
  }
})

/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Elimina un personaje por su ID
 *     description: Endpoint para eliminar un personaje por su ID.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID del personaje a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Personaje eliminado correctamente.
 *       404:
 *         description: Personaje no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
app.delete('/posts/:postId', async (req, res) => {
  const postId = req.params.postId
  try {
    const result = await deleteCharacterById(postId)
    if (result.status === 204) {
      res.json(result)
    } else {
      res.status(result.status).json(result.data)
    }
  } catch (error) {
    console.error('Error al borrar el post:', error)
    return { status: 500, data: { error: 'Error en el servidor' } }
  }
})

/**
 * @swagger
 * /characters/{id}:
 *   put:
 *     summary: Actualiza un personaje por su ID
 *     description: Endpoint para actualizar un personaje por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del personaje a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCharacter'
 *     responses:
 *       200:
 *         description: Personaje actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       400:
 *         description: Error de validación de la solicitud.
 *       404:
 *         description: Personaje no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
app.put('/characters/:id', async (req, res) => {
  try {
    const character = await updateCharacterById(
      req.params.id,
      req.body.name,
      req.body.age,
      req.body.epithet,
      req.body.occupation,
      req.body.bounty,
      req.body.devilFruit,
      req.body.imageUrl,
      req.body.imageBase64,
      req.body.description,
    )
    res.status(character.status).json({ status: character.status, data: character.data })
  } catch (error) {
    console.error('Error al actualizar el personaje:', error)
    res.status(error.status || 500).json({ status: error.status || 500, data: error.data || { error: 'Error en el servidor' } }) // Enviamos el código de estado y el mensaje de error
  }
})

/**
 * @swagger
 * /:
 *   get:
 *     summary: Maneja rutas no encontradas
 *     description: Middleware para manejar rutas no encontradas.
 *     responses:
 *       404:
 *         description: Ruta no encontrada.
 */
app.use((req, res) => {
  res.status(400).json({ error: 'Ruta no encontrada' })
})

/**
 * @swagger
 * /:
 *   all:
 *     summary: Maneja métodos HTTP no implementados
 *     description: Middleware para manejar métodos HTTP no implementados.
 *     responses:
 *       501:
 *         description: Método HTTP no implementado.
 */
app.use((req, res) => {
  res.status(501).json({ error: 'Método HTTP no implementado' })
})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})


async function createTable() {
  try {
    const sql = `
    CREATE TABLE characters (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      age INT,
      epithet VARCHAR(100),
      occupation VARCHAR(100),
      bounty BIGINT,
      devilFruit VARCHAR(100),
      imageUrl TEXT,
      imageBase64 TEXT,
      description TEXT
  );`;

    await pool.query(sql);
    console.log('La tabla ya existe.');
  } catch (err) {
    console.error('Error al crear la tabla', err);
  }
}

createTable();
import express from 'express'
import cors from 'cors'
import {
  getAllCharacters, getCharacterById, createCharacter, deleteCharacterById, updateCharacterById,
} from './db.js'

const app = express()
app.use(express.json())
app.use(cors())
const port = 3010

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Ruta para obtener todos los personajes
app.get('/posts', async (req, res) => {
  try {
    const characters = await getAllCharacters()
    res.json(characters)
  } catch (error) {
    console.error('Error en la solicitud de personajes:', error)
    res.status(500).json({ error: 'Error en el servidor' })
  }
})

// obtener un character por su id
app.get('/posts/:id', async (req, res) => {
  const character = await getCharacterById(req.params.id)
  res.json(character)
})

// Crear un personaje
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

// Ruta para borrar un post por su ID
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

// Actualiza un personaje
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

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(400).json({ error: 'Ruta no encontrada' })
})

// Middleware para manejar métodos HTTP no implementados
app.use((req, res) => {
  res.status(501).json({ error: 'Método HTTP no implementado' })
})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})

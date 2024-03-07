import express from 'express'
import cors from 'cors'
import { getAllCharacters, createCharacters, getCharacterById, deleteCharacterById, updateCharacterById} from './db.js'

const app = express()
app.use(express.json())
app.use(cors())
const port = 3010

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//obtener todos los character
app.get('/characters', async (req, res) => {
  const character = await getAllCharacters()
  res.json(character)
})

// Crear un character
app.post('/characters', async (req, res) => {
  try {
    const character = await createCharacters(req.body.name, req.body.age, req.body.epithet, req.body.occupation, req.body.bounty, req.body.devil_fruit, req.body.image_url, req.body.image_base64, req.body.description)
    // Verifica si se creó correctamente y devuelve el personaje con status 200
    res.status(200).json(character) // Incluimos el status 200 aquí
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: error.message })
  }
})


// Obtener un character por id
app.get('/characters/:id', async (req, res) => {
  try {
    const character = await getCharacterById(req.params.id)
    res.status(200).json(character) // Responder con el personaje encontrado
  } catch (error) {
    res.status(500).json({ error: error.message })// Manejar errores
  }
})

//borrar un character
app.delete('/characters/:id', async (req, res) => {
  const character = await deleteCharacterById(req.params.id)
  res.json(character)
})

//actualizar un character
app.put('/characters/:id', async (req, res) => {
  const character = await updateCharacterById(req.params.id, req.body.name, req.body.age, req.body.epithet, req.body.occupation, req.body.bounty, req.body.devil_fruit, req.body.image_url, req.body.image_base64, req.body.description)
  res.json(character)
})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
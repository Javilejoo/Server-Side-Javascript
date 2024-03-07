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
  const posts = await getAllCharacters()
  res.json(posts)
})

//crear un character
app.post('/characters', async (req, res) => {
  const posts = await createCharacters(req.body.name, req.body.epithet, req.body.occupation, req.body.bounty, req.body.devil_fruit, req.body.image_url, req.body.description)
  res.json(posts)
})

//obtener un character por id
app.post('/characters/:id', async (req, res) => {
  const posts = await getCharacterById(req.params.id)
  res.json(posts)
})

//borrar un character
app.delete('/characters/:id', async (req, res) => {
  const post = await deleteCharacterById(req.params.id)
  res.json(post)
})

//actualizar un character
app.put('/characters/:id', async (req, res) => {
  const posts = await updateCharacterById(req.params.id, req.body.name, req.body.epithet, req.body.occupation, req.body.bounty, req.body.devil_fruit, req.body.image_url, req.body.description)
  res.json(posts)
})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
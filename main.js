import express from 'express'
import { getAllPosts, createPost, getPostbyid, deletePostbyid, updatePostbyid} from './db.js'

const app = express()
app.use(express.json())
const port = 3010

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/posts', async (req, res) => {
  const posts = await getAllPosts()
  res.json(posts)
})

app.post('/posts', async (req, res) => {
  const posts = await createPost(req.body.title, req.body.content)
  res.json(posts)
})

app.post('/posts/:id', async (req, res) => {
  const posts = await getPostbyid(req.params.id)
  res.json(posts)
})

app.delete('/posts/:id', async (req, res) => {
  const post = await deletePostbyid(req.params.id)
  res.json(post)
})

app.put('/posts/:id', async (req, res) => {
  const posts = await updatePostbyid(req.params.id, req.body.title, req.body.content)
  res.json(posts)
})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
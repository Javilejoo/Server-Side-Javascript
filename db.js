import conn from './conn.js'

export async function getAllPosts() {
 const [rows] = await conn.query('SELECT * FROM blogs')
 return rows
}

export async function createPost(title, content) {
    const [result] = await conn.query('INSERT INTO blogs (title, content) VALUES (?, ?)', [title, content])
    return result
}

export async function getPostbyid(id){
    const [result] = await conn.query('SELECT * FROM blogs WHERE id  = ?', [id])
    return result
}

export async function deletePostbyid(id){
    const [result] = await conn.query('DELETE FROM blogs WHERE id = ?', [id]) 
    return result
}

export async function updatePostbyid(id,title,content){
    const [result] = await conn.query('UPDATE blogs SET title = ?, content = ? WHERE id = ?', [title, content, id])
    return result
}
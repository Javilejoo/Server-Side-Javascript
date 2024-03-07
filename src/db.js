import conn from './conn.js'

//Trae todos los characters de one piece 
export async function getAllCharacters() {
 const [rows] = await conn.query('SELECT * FROM characters')
 return rows
}

//Crea un nuevo character
export async function createCharacters(name, epithet, occupation, bounty, devil_fruit, image_url, description) {
    const [result] = await conn.query('INSERT INTO characters (name, epithet, occupation, bounty, devil_fruit, image_url, description) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, epithet, occupation, bounty, devil_fruit, image_url, description])
    return result
}

//trae un personaje por su id
export async function getCharacterById(id){
    const [result] = await conn.query('SELECT * FROM characters WHERE id  = ?', [id])
    return result
}

//eliminar un personaje
export async function deleteCharacterById(id){
    const [result] = await conn.query('DELETE FROM characters WHERE id = ?', [id]) 
    return result
}

//actualizar un personaje
export async function updateCharacterById(id,name,epithet,occupation,bounty,devil_fruit,image_url,description){
    const [result] = await conn.query('UPDATE characters SET name = ?, epithet = ?, occupation = ?, bounty = ?, devil_fruit = ?, image_url = ?, description = ? WHERE id = ?', [name, epithet, occupation, bounty, devil_fruit, image_url, description, id])
    return result
}
import conn from './conn.js'

//Trae todos los characters de one piece 
export async function getAllCharacters() {
 const [rows] = await conn.query('SELECT * FROM characters')
 return {status: 200, data: rows}
}
// Crea un nuevo character
export async function createCharacters(name, age, epithet, occupation, bounty, devil_fruit, image_url, image_base64, description) {
    const [result] = await conn.query('INSERT INTO characters (name, age, epithet, occupation, bounty, devil_fruit, image_url, image_base64, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, age, epithet, occupation, bounty, devil_fruit, image_url, image_base64, description])
    
    // Verifica si se creó correctamente y devuelve el objeto del personaje creado con un status 200
    if (result && result.insertId) {
        return { status: 200, data: { id: result.insertId, name, age, epithet, occupation, bounty, devil_fruit, image_url, image_base64, description } }
    } else {
        // Manejo de error si la inserción falla
        throw new Error("Error al crear el personaje")
    }
}

  // Traer un personaje por su id
export async function getCharacterById(id) {
    try {
        const [result] = await conn.query('SELECT * FROM characters WHERE id = ?', [id])

        if (result.length > 0) {
            return { status: 200, data: result[0] } // Devolver el personaje encontrado
        } else {
            throw new Error("Personaje no encontrado")// Lanzar un error si no se encuentra el personaje
        }
    } catch (error) {
        throw new Error("Error al buscar el personaje") // Lanzar un error si hay un problema con la base de datos
    }
}


//eliminar un personaje
export async function deleteCharacterById(id){
    const [result] = await conn.query('DELETE FROM characters WHERE id = ?', [id]) 
    return {status: 204}
}

//actualizar un personaje
export async function updateCharacterById(id,name,age,epithet,occupation,bounty,devil_fruit,image_url, image_base64, description){
    const [result] = await conn.query('UPDATE characters SET name = ?, age = ?, epithet = ?, occupation = ?, bounty = ?, devil_fruit = ?, image_url = ?, image_base64 = ?, description = ? WHERE id = ?', [name, age, epithet, occupation, bounty, devil_fruit, image_url, image_base64, description, id])
    return {status: 200, data: result}
}
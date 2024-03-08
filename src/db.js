import conn from './conn.js'
// Trae todos los characters de one piece
export async function getAllCharacters() {
  try{
    const [rows] = await conn.query('SELECT * FROM characters')
    return { status: 200, data: rows }
  } catch (e) {
    console.error('Error en la solicitud de personajes:', e)
    return { status: 500, data: { error: 'Error en el servidor' } }
  }
}

// Trae un personaje por su id
export async function getCharacterById(id) {
  try {
    const [rows] = await conn.query('SELECT * FROM characters WHERE id = ?', [id])
    return { status: 200, data: rows }
  } catch (e) {
    console.error('Error en la solicitud de personajes:', e)
    return { status: 500, data: { error: 'Error en el servidor' } }
  }
}

// Crear un personaje
export async function createCharacter(name, age, epithet, occupation, bounty, devilFruit, imageUrl, imageBase64, description) {
  try {
    // Validar que se hayan proporcionado todos los campos necesarios
    if (!name || !age || !epithet || !occupation || !bounty || !devilFruit || !imageUrl || !imageBase64 || !description) {
      throw { status: 400, data: { error: 'Se deben proporcionar todos los campos' } }
    }

    const [result] = await conn.query(
      'INSERT INTO characters (name, age, epithet, occupation, bounty, devilFruit, imageUrl, imageBase64, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, age, epithet, occupation, bounty, devilFruit, imageUrl, imageBase64, description],
    );

    // Obtener el personaje recién creado
    const [createdCharacter] = await conn.query('SELECT * FROM characters WHERE id = ?', [result.insertId])

    return { status: 200, data: createdCharacter }; // Devolver el estado 201 (Created) y los datos del personaje creado
  } catch (error) {
    console.error('Error al crear el personaje en la base de datos:', error)
    if (error.status) {
      throw error; // Re-lanzamos el error con el código de estado apropiado
    } else {
      throw { status: 500, data: { error: 'Error en el servidor' } }; // En caso de error desconocido, retornamos 500
    }
  }
}

// Función para borrar un post por su ID
export async function deleteCharacterById(postId) {
  try {
    const [result] = await conn.query('DELETE FROM characters WHERE id = ?', [postId])
    if (result.affectedRows > 0) {
      return { status: 204 } // Retornamos 204 si el post fue eliminado exitosamente
    } else {
      return { status: 404, data: { error: 'El post no fue encontrado' } }
    }
  } catch (error) {
    console.error('Error al borrar el post en la base de datos:', error)
    return { status: 500, data: { error: 'Error en el servidor' } }
  }
}

// Actualiza un personaje por su ID
export async function updateCharacterById(
  id,
  name,
  age,
  epithet,
  occupation,
  bounty,
  devilFruit,
  imageUrl,
  imageBase64,
  description,
) {
  try {
    // Validar que se hayan proporcionado todos los campos necesarios
    if (!name || !age || !epithet || !occupation || !bounty || !devilFruit || !imageUrl || !imageBase64 || !description) {
      throw { status: 400, data: { error: 'Se deben proporcionar todos los campos' } }
    }

    const [updateResult] = await conn.query(
      'UPDATE characters SET name = ?, age = ?, epithet = ?, occupation = ?, bounty = ?, devilFruit = ?, '
      + 'imageUrl = ?, imageBase64 = ?, '
      + 'description = ? WHERE id = ?',
      [name, age, epithet, occupation, bounty, devilFruit, imageUrl, imageBase64, description, id],
    )

    // Validar que se haya actualizado al menos un registro en la base de datos
    if (updateResult.affectedRows === 0) {
      throw { status: 404, data: { error: 'El personaje no fue encontrado' } }
    }

    // Consultar el personaje actualizado
    const [characterResult] = await conn.query('SELECT * FROM characters WHERE id = ?', [id])
    return { data: characterResult[0], status: 200}
  } catch (error) {
    console.error('Error al actualizar el personaje en la base de datos:', error)
    if (error.status) {
      throw error; // Re-lanzamos el error con el código de estado apropiado
    } else {
      throw { status: 500, data: { error: 'Error en el servidor' } } // En caso de error desconocido, retornamos 500
    }
  }
}

CREATE DATABASE IF NOT EXISTS blog_db;
USE blog_db;

-- Create a user and grant privileges
CREATE USER IF NOT EXISTS 'blog_user'@'%' IDENTIFIED BY 'blog_password';
GRANT ALL PRIVILEGES ON blog_db.* TO 'blog_user'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

CREATE TABLE characters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    epithet VARCHAR(100),
    occupation VARCHAR(100),
    bounty INT,
    devil_fruit VARCHAR(100),
    image_url VARCHAR(255),
    description TEXT
);


{

  "name": "Monkey D. Luffy",
  "epithet": "Sombrero de Paja",
  "occupation": "Pirata, Capitán",
  "bounty": 3000000000,
  "devil_fruit": "Gomu Gomu no Mi",
  "image_url": "https://example.com/luffy.jpg",
  "description": "Monkey D. Luffy es el protagonista principal de la serie de anime y manga One Piece. Es el capitán de la tripulación de los Piratas del Sombrero de Paja y se le conoce como 'Luffy del Sombrero de Paja'. Luffy es un joven valiente y aventurero que tiene como objetivo principal encontrar el legendario tesoro conocido como el 'One Piece' y convertirse en el Rey de los Piratas. Posee la Fruta del Diablo llamada Gomu Gomu no Mi, que le otorga la capacidad de estirar su cuerpo como si fuera de goma, lo que le permite realizar ataques elásticos y poderosos en combate."
}
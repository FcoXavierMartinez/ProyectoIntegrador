const express = require('express');
const axios = require('axios');

const app = express();

const URL = 'https://rickandmortyapi.com/api/character/';

// Middleware para parsear el body en formato JSON
app.use(express.json());

// Middleware para agregar el prefijo /rickandmorty a todas las rutas
app.use('/rickandmorty', (req, res, next) => {
  next();
});

// Controlador para obtener un personaje por id
app.get('/rickandmorty/character/:id', (req, res) => {
  const { id } = req.params;
  axios.get(`${URL}${id}`)
    .then((response) => {
        const { id, status, name, species, origin, image, gender } = response.data;
        res.json({ id, status, name, species, origin, image, gender });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  });
  
  // Arreglo de usuarios
  let users = [
    { email: 'foo@example.com', password: 'password123' },
    { email: 'bar@example.com', password: 'password456' },
  ];
  
  // Controlador para login
  app.get('/rickandmorty/login', (req, res) => {
    const { email, password } = req.query;
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      res.json({ access: true });
    } else {
      res.json({ access: false });
    }
  });
  
  // Arreglo de personajes favoritos
  let favorites = [];
  
  // Controlador para agregar personaje favorito
  app.post('/rickandmorty/fav', (req, res) => {
    const character = req.body;
    favorites.push(character);
    res.json(favorites);
  });
  
  // Controlador para eliminar personaje favorito
  app.delete('/rickandmorty/fav/:id', (req, res) => {
    const { id } = req.params;
    favorites = favorites.filter((character) => character.id != id);
    res.json(favorites);
  });
  
  const PORT = 3001;
  
  app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
  });
  
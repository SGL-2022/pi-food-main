const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const recipes = require('./recipes');
const diets = require('./diets');
//const users = require('./users');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.use('/users', users);
router.use('/diets', diets);
router.use('/recipes', recipes)

module.exports = router;

const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const countriesRoute = require ("./countries")
const activitiesRoute = require ("./activities")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/countries", countriesRoute)
router.use("/activities", activitiesRoute)

module.exports = router;

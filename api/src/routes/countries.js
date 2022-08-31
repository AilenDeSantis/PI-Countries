const { Router } = require("express");

const router = Router();

const { Country, TouristActivity } = require ("../db")
const { getDbCountries, searchByName, searchById } = require ("../controllers/controllers.js")

// [ ] GET /countries/{idPais}:
// Obtener el detalle de un país en particular
// Debe traer solo los datos pedidos en la ruta de detalle de país
// Incluir los datos de las actividades turísticas correspondientes

router.get('/:id', async (req, res, next) => { 
    try {
        const { id } = req.params
        let countryDetail = await searchById(id)
        if(countryDetail) {
            return res.status(200).json(countryDetail)
        } else {
            return res.status(404).send('Country not found')
        }
        } catch (err){
            next(err) 
        }
})

// [ ] GET /countries:
// En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe retonar sólo los datos necesarios para la ruta principal)
// Obtener un listado de los paises.

router.get('/', async (req, res, next) => { //FUNCIONA!!
    try {
        if(req.query.name) next() 
        else{
            let countries = await getDbCountries();
            res.status(200).send(countries)
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
})

// [ ] GET /countries?name="...":
// Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
// Si no existe ningún país mostrar un mensaje adecuado

router.get('/', async (req, res) => { 
    try {
        const { name } = req.query
        if (name) {
            let nameCountry = await searchByName(name)
            if (nameCountry) return res.send(nameCountry);
            return res.status(404).send({ msg: "We're so sorry, name is not valid" })
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router
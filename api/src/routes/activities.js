const { Router } = require("express");

const router = Router();

const { TouristActivity, Country } = require ("../db")

// POST /activities:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos, relacionada con los países correspondientes

router.post('/', async (req, res, next) => { //FUNCIONA!!
    try{                                
        const { name, difficulty, duration, season, countries } = req.body
        let [activityCreated, bolean] = await TouristActivity.findOrCreate({
            //acá se fija si existe la actividad creada 
            where: {name},
            defaults: {
                name, 
                difficulty, 
                duration, 
                season
            },
        })
        //acá se fija si el país ya tiene esa act
        const country_ies = await Country.findAll({
            where: {name: countries}, //que el nombre del pais esté en country_ies
            include: TouristActivity
        })
        country_ies.forEach(async c => {
            if(!c.touristActivities.find(act => act.name === name)) {
            //comprueba si touristact tiene un obj con ese name de la actividad
            await c.addTouristActivity(activityCreated)
            }
        });

        res.status(200).send(activityCreated)
        } catch(error) {
            res.send(error.message)
        }
})

//GET /activities
//Esto no lo piden pero lo voy a necesitar
router.get('/', async (req, res) => {
    try {
        let activities = await TouristActivity.findAll({
            attributes: ["id", "name", "difficulty", "duration", "season"],
            include: {
                model: Country,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        })
        res.status(200).send(activities)
    } catch (error) {
        res.status(404).send(error.message)
    }

})

module.exports = router
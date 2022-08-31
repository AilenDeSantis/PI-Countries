const axios = require ("axios")
const { Op } = require("sequelize")
const { Country, TouristActivity } = require ('../db.js')

const getApiCountries = async () => { 
    const apiUrl = await axios.get('https://restcountries.com/v3/all')
    const info = apiUrl.data.map(el => {

        return {
            flagImage:  el.flags[1],
            name:  el.name.common,
            continent:  el.continents[0],
            id:  el.cca3,
            capital:  el.capital?el.capital[0]:"This country don't have capital",
            subregion:  el.subregion,
            area:  el.area,
            population:  el.population 
        }
    })
    return info 
}

const getDbCountries = async () => {//LLAmar desde las rutas a esta func
    return await Country.findAll({
        attributes: ["id", "flagImage", "name", "continent", "population"],
        include: { 
            model: TouristActivity,
            attributes: ['name'],//atributos de las actividades
            through: {//Esto es para que no me traiga nada de la tabla intermedia
                attributes: [],//atributos de la tabla intermedia
            }
        }
    })
}

async function searchByName(name) { //Esta func define la info que le llega al front, x eso 
//importa que le llegue population para poder filtrar luego
    try {
        let searchCountryDB= await Country.findAll({
            where:{
                name:{
                    [Op.iLike]:`%${name}%` // % Para que no sea exacto, para que traiga lo que coincida entre %
                }
            }, attributes: ["id", "flagImage", "name", "continent", "population"],
            include: TouristActivity,
        })
        return searchCountryDB
    } catch (error) {
        console.log(error.message)
    }
}

async function searchById(id) {
    try { //Acá no le digo qué me traiga las cosas que necesito xq me trae todo (lo que tiene la db)
        return await Country.findOne({
            where: {
                id: id 
            }, include: TouristActivity
        })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { getApiCountries, getDbCountries, searchByName, searchById }
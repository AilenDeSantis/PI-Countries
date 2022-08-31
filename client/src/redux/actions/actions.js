import axios from 'axios';
import {
    GET_ALL_COUNTRIES,
    GET_DETAILS,
    SEARCH_BY_NAME,
    ADD_ACTIVITY,
    FILTER_BY_CONTINENT,
    FILTER_BY_TOURIST_ACTIVITY,
    ORDER_ALPHABETICALLY,
    SORT_BY_POPULATION,
    PAGINATE,
    GET_ALL_ACTIVITIES,
    VACIAR,
} from "./constants";

export function getAllCountries() {
    return async function (dispatch) {
        axios.get('http://localhost:3001/countries')
        .then ((res) => {
            dispatch({
                type: GET_ALL_COUNTRIES,
                payload: res.data
            })
        })
    }
};

export function searchByName(name) {
    return async function (dispatch) {
        try {
            if (name) {
                return axios.get('http://localhost:3001/countries?name=' + name)
                    .then(res => {
                        dispatch({
                            type: SEARCH_BY_NAME, 
                            payload: res.data 
                        })
                    })
                    .catch(err => dispatch({type: SEARCH_BY_NAME, payload: err.data}))
            }
            let json = await axios.get('http://localhost:3001/countries');
            return dispatch({
                type: SEARCH_BY_NAME,
                payload: json.data,
            })
        } catch(err){
            return err 
        }
    }
};

export function vaciar(){
    return function(dispatch) {
            dispatch({
                type: GET_DETAILS
            })
        }
    }


export function getDetails (id) {
    return async function (dispatch) {
        axios.get(`http://localhost:3001/countries/${id}`)
        .then ((res) => {
            dispatch({
                type: GET_DETAILS,
                payload: res.data
            })
        })
    }
};

export function addActivity(values) {
    return async function (dispatch) {
        axios.post('http://localhost:3001/activities',values)
        .then ((res) => {
            dispatch({
                type: ADD_ACTIVITY,
                payload: res.data
            })
        })
    }
};

export function getAllActivities() {
    return async function (dispatch) {
        axios.get('http://localhost:3001/activities')
        .then ((res) => {
            dispatch({
                type: GET_ALL_ACTIVITIES,
                payload: res.data
            })
        })
    }
};

export function filterByContinent(continent) {
    return{
        type: FILTER_BY_CONTINENT,
        payload: [continent, true]
    }
};

export function filterByTouristActivity(touristActivity) {
    return{
        type: FILTER_BY_CONTINENT,
        payload: [touristActivity, false]
    }
};

export function orderAlphabetically(alf) {
    return{
        type: ORDER_ALPHABETICALLY,
        payload: alf
    }
};

export function sortByPopulation(order) {
    return {
        type: SORT_BY_POPULATION,
        payload: order
    }
};

export function paginate() {
    return async function (dispatch) {
        axios.get('http://localhost:3001/countries')
        .then ((res) => {
            dispatch({
                type: PAGINATE,
                payload: res.data
            })
        })
    }
};
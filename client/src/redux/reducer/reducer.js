import {
    GET_ALL_COUNTRIES,
    GET_DETAILS,
    SEARCH_BY_NAME,
    ADD_ACTIVITY,
    GET_ALL_ACTIVITIES,
    FILTER_BY_CONTINENT,
    FILTER_BY_TOURIST_ACTIVITY,
    ORDER_ALPHABETICALLY,
    SORT_BY_POPULATION,
    PAGINATE,
    VACIAR
} from "../actions/constants";

const initialState = {
    countries: [],
    details: {},
    activities: [],
    filteredByContinent: 'all',
    filteredByTouristActivity: 'all',
    allCountries: []
    
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return{
                ...state,
                countries: [...action.payload],
                allCountries: [...action.payload]
            };
        case VACIAR:
            return{
                ...state,
                details: {}
            }
        case  GET_DETAILS:
            return {
                ...state,
                details: {...action.payload}
            };
        case SEARCH_BY_NAME:
            return{
                ...state,
                countries: [...action.payload]
            };
        case ADD_ACTIVITY:
            return{
                ...state,
            };
        case GET_ALL_ACTIVITIES:
            return {
                ...state,
                activities: [...action.payload]
            }
        case FILTER_BY_CONTINENT:
            const continentToFilter = action.payload[1] ? action.payload[0] : state.filteredByContinent
            const activityToFilter = !action.payload[1] ? action.payload[0] : state.filteredByTouristActivity
            let filterContinent = []
            let filterActivity = []
            if(continentToFilter != 'all') {
                filterContinent = [...state.allCountries].filter(country => continentToFilter === 'Americas'? country.continent === 'South America' || country.continent === 'North America' : country.continent === continentToFilter)
            } else {
                filterContinent = [...state.allCountries]
            }
            if(activityToFilter != 'all') {
                filterActivity = filterContinent.filter(country => country.touristActivities.find(act => act.name === activityToFilter))
            } else {
                filterActivity = filterContinent
            }
            return{
                ...state,
                countries: filterActivity,
                filteredByContinent: continentToFilter,
                filteredByTouristActivity: activityToFilter
            };
        case FILTER_BY_TOURIST_ACTIVITY:
           return{
                ...state,
                filteredByTouristActivity: [...action.payload]
            };
        case ORDER_ALPHABETICALLY:
            var orderedCountries = [...state.countries]
            orderedCountries.sort((country1, country2)=> {
                if(country1.name > country2.name) {
                    return 1
                } 
                if (country1.name < country2.name) {
                    return -1
                } 
                return 0
            })
            if(action.payload==="asc"){
                orderedCountries = orderedCountries.reverse()
            }
            return{
                ...state,
                countries: [...orderedCountries]
            };
        case SORT_BY_POPULATION:
            var orderedCountries = [...state.countries]
            orderedCountries.sort((country1, country2)=> {
                if(country1.population > country2.population) {
                    return 1
                } 
                if (country1.population < country2.population) {
                    return -1
                } 
                return 0
            })
            if(action.payload==="desc"){
                orderedCountries = orderedCountries.reverse()
            }
            return{
                ...state,
                countries: [...orderedCountries]
            };
        case PAGINATE:
            return{
                ...state,
                countries: [...action.payload]
            };
            default:
                return state
        }
    }
    
export default rootReducer;
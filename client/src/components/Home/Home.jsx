import React, { useEffect } from "react";
import './Home.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { filterByContinent, filterByTouristActivity, getAllActivities, getAllCountries, orderAlphabetically, sortByPopulation } from "../../redux/actions/actions";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import Paginate from "../Paginate/Paginate";
import { useState } from "react";

export default function Home(){
    const allcountries = useSelector(state=>state.countries)
    const activities = useSelector(state=>state.activities)
    const filtered = useSelector(state=>state.filteredCountries)
    const [actualPage, setPage] = useState(1)
    const dispatch = useDispatch()

    const [actualCountries, setActualCountries] = useState([]) 

    useEffect(() => {
        if(actualPage == 1) {
        setActualCountries(allcountries.slice(0,9))
        }else {
        setActualCountries(allcountries.slice((actualPage -1) *10 -1, actualPage*10 -1))
        }
    }, [actualPage, allcountries]) //cada vez que allcountries cambie pasa algo

    useEffect(()=>{
        dispatch(getAllCountries())
        dispatch(getAllActivities())
    },[dispatch])

    function onChangeContinent(e) {
        dispatch(filterByContinent(e.target.value))
    }

    function onChangeActivity(e) {
        dispatch(filterByTouristActivity(e.target.value))
    }  
    
    function handleOnChange(e) {
        dispatch(orderAlphabetically(e.target.value))
    }

    function handlePopulation(e) {
        dispatch(sortByPopulation(e.target.value))
    }

    return (
        
        <div className='baimage'>
            <h1 className="title">Countries Page</h1>
            <div className='aver'>
                <ul className="nav">
                    <li>
                        <div className="">
                            Filter by Continent:
                            <select className="select" onChange={onChangeContinent}>
                                <option value= 'all'>All</option>
                                <option value= 'Africa'>Africa</option>
                                <option value= 'Americas'>Americas</option>
                                <option value= 'Antarctica'>Antarctica</option>
                                <option value= 'Asia'>Asia</option>
                                <option value= 'Europe'>Europe</option>
                                <option value= 'Oceania'>Oceania</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <div>
                            Filter by Tourist Activity:
                            <select className="select" onChange={onChangeActivity}>
                                <option value='all'>All</option>
                                {
                                activities?.map(e => {
                                    return (
                                    <option value={e.name} key={e.id}>{e.name}</option>
                                    )
                                })
                                }
                            </select>
                        </div>
                    </li>
                    <li>
                        <div>
                            Sort Alphabetically:
                            <select className="select" onChange={handleOnChange}>
                                <option disabled selected>select</option> 
                                {/* Esta opcion no puede ser clickeada */}
                                <option value= 'desc'>A-Z</option>
                                <option value= 'asc'>Z-A</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <div>
                            Sort by Population:
                            <select className="select" onChange={handlePopulation}>
                            <option disabled selected>select</option> 
                            <option value= 'desc'>+ Population</option>
                            <option value= 'asc'>- Population</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <div>
                        <SearchBar/>
                        </div>
                        </li>
                    <li>
                        <div className=''>
                            <div className=''>
                            <Link to= {'/create'}id="click">
                            <button className='btnnav'>Create!</button>
                            </Link>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            {allcountries && <Paginate
            countries = {allcountries}
            setPage = {setPage}
            actualPage = {actualPage}
            />}
            <div className="cards">
                {
                    actualCountries?actualCountries.map((country,i)=>{
                        return (   
                        <Card
                        key={i}
                        id={country.id}
                        flagImage ={country.flagImage}
                        name={country.name}
                        continent={country.continent}
                        />
                        )
                    })
                    :<span>Loading...</span>
                }
            </div>
        </div>
        
    )
}
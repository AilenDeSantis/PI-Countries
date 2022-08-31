import React from "react";
import './Details.css';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, vaciar } from '../../redux/actions/actions';
import { Link, useParams } from 'react-router-dom';



export default function Details(){

    const dispatch = useDispatch();
    const {id} = useParams()

    const backgrounds ={
        Summer:"https://cutewallpaper.org/26/beach-sand-shells-wallpaper/1570392.jpg",
        Autumn:"https://wallpapercave.com/wp/wp7493670.jpg",
        Spring:"https://wallpaperaccess.com/full/4139616.jpg",
        Winter:"https://graffitiwallpaper.com/pics/listings/361_wide_thumb.jpg",
    }
    React.useEffect(() => {
        dispatch(getDetails(id))
    }, [id]);
    
    React.useEffect(() => {
        dispatch(vaciar())
    }, [dispatch])

    const details = useSelector(state => state.details);

    return (
        <div className="graldet">
            <div className="carddet">
                <img src= {details.flagImage} className='imgdet'/>
                <h2 className="name">{details.name}</h2>
                <h4 className="id">{details.id}</h4>
                <h4 className="capital">Capital: {details.capital}</h4>
                <h4 className="subregion">Subregion: {details.subregion}</h4>
                <h4 className="continent">Continent: {details.continent}</h4>
                <h4 className="area">Area: {details.area} km²</h4>
                <h4 className="population">Population: {details.population} inhabitants </h4>
            </div>
            <div className="cardact">
                <h2 className="titleact">Tourist Activities: </h2>
                {details.touristActivities?.map(activity => 
                    <div className={"content "+activity.season}> 
                        <img src={backgrounds[activity.season]}></img>
                        <h2>{activity.name}</h2>
                        <h4>Difficulty: {activity.difficulty}</h4>
                        <h4>Duration: {activity.duration} hs</h4> 
                        <h4>Season: {activity.season}</h4>
                    </div>
                )}
            </div>
            <Link className='btnback' to= {'/home'}id="click">
                Back to home
            </Link>
        </div>
    )
}
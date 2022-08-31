import React from "react";
import './Card.css';
import { Link } from 'react-router-dom';


export default function Card({id, flagImage, name, continent}){
    return (
        <Link key={id} className="card" to= {`/details/${id}`}>
            <img src={flagImage} alt= "not found" className="cardimg"/>
            <h3><b className="text">{name}</b></h3>
            <p className="text">{continent}</p> 
        </Link>
        
    )
}
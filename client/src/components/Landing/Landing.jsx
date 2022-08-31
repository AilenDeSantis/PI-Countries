import React from "react";
import './Landing.css';
import { Link } from 'react-router-dom';

export default function Landing(){
    return (
       
        <div className='bimage'>
            <div className='caption'>
            <h2 className='wel'>Welcome to the Countries app!</h2>
            <Link to= {'/home'}id="click">
            <button className='btn'>Get into</button>
            </Link>
            </div>
        </div>
    )
}
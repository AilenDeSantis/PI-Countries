import React, { useEffect } from "react";
import './Paginate.css';

export default function Paginate ({countries, setPage, actualPage}) {
    const pages = []
    for (var i = 1; i<= countries.length/10; i++) {
        pages.push(i)
    }

    return (
        <div> {pages.map((num)=> 
            <button id = {num} className={num == actualPage? 'btnactpag' : 'btnpag'} value = {num} onClick = { (e) => { setPage(e.target.value)}}> {num}</button>)}
        </div>
    )
}


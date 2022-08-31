import React, { useState} from "react";
import { useDispatch } from 'react-redux';
import './SearchBar.css';
import { searchByName } from "../../redux/actions/actions";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
   
    function handleChange(e) {    
        e.preventDefault();    
        setInput(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
    
        if (input.length === 0) {
          return alert("Please input a name to start the search");
        } else {
          dispatch(searchByName(input));
          setInput("");
        }
    };

    return (
        <div className=''>
            <input className="input"
                type= "text" 
                placeholder = "Search a country by name..." 
                value={input} 
                onChange={(e) => handleChange(e)}
            />
            <button 
                className="btnsearch" 
                type="submit" 
                onClick={e => handleSubmit(e)}
            >
            Search
            </button>
        </div>
    )
}
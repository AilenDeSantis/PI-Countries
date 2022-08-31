import React, { useEffect, useState} from "react";
import './Create.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addActivity, getAllCountries } from '../../redux/actions/actions.js';

//EXP REG PARA VALIDAR QUE ESTÉ ENTRE UN RANGO NUM: (!/^(?:[1-4]?[0-9])?$|^[5]?[0-8](?:\.\d{1,3})?$|^210(\.0{1,3})?$/.test(input.attack)) 

export function validate(input) { //funcion de validacion para ver que se cumplan las 
    //condiciones de input.input es un obj, me doy cuenta xq accede a sus propiedades con punto .  
    let errors = {};

    if (!input.name) {
        errors.name = 'Name is required';//le agrega la prop name al obj vacio errors
    } else if (/\S+@\S+\.\S+/.test(input.name)) {//exp regular para ver si es un correo
        errors.name = 'Name is invalid';
    } else if (!/^[a-zA-Z]+$/.test(input.name)) {
        errors.name = "Name cannot contain numbers or other characters"
    }
    if (/^[a-zA-Z]+$/.test(input.difficulty)) {
        errors.difficulty = "Difficulty must be a number"
    } else if (!(input.difficulty >= 1 && input.difficulty <= 5)) {
        errors.difficulty = "Difficulty must be a integer value between 1 and 5"
    }
    if (/^[a-zA-Z]+$/.test(input.duration)) {
        errors.duration = "Duration must be a number"
    } else if (!(input.duration >= 1 && input.duration <= 10 )) {
        errors.duration = "Duration must be a value between 1 and 10 hours"
    }
    if (/\S+@\S+\.\S+/.test(input.season)) {//exp regular para ver si es un correo
        errors.season = 'Season is invalid';
    } else if (!/^[a-zA-Z]+$/.test(input.season)) {
        errors.season = "Season cannot contain numbers or other characters"
    }
    return errors;
}

export default function Form(){

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCountries());
    }, [dispatch]);

    const [input, setInput] = React.useState ({
        name: '',
        difficulty: 0,
        duration: 0,
        season: '',
        countries: [],
    })

    const [errors, setErrors] = React.useState({});
    const activities = useSelector((state) => state.activities);
    const countries = useSelector((state) => state.countries)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activities.find((el) => el.name.toLowerCase() === input.name.toLowerCase())) {
        alert("There's already a activity with that name!");
//También me tendría que fijar que no exista en el mismo pais o eso ya está?
        } else {
        const errors = validate(input)
        if(errors.name){
            alert("Your tourist activity isn't created ");
        } else {
        alert("Your tourist activity was created succesfully!");
        dispatch(addActivity(input));
        }
        }
    };

    const handleChange = function(e) { //Esta funcion es la que modifica nuestro estado único
        setInput({//llama al setinput para modificar el input
          ...input, //trae lo que ya tenia input
          [e.target.name]: e.target.value //Busca lo que vale name (username o password) y lo modifica con el valor que escribieron
        });
        setErrors(validate({//como valor le paso la ejecucion de la func que retorna el obj errors
        ...input,
        [e.target.name]: e.target.value
      }));//setErrors la pongo dentro del handle xq esta se dispara cuando escribo, y yo quiero al mismo
      //tiempo que me setee el estado de los input y a la vez el estado de errors, que me salte la alerta de ser necesario. 
    }

    const handleSelect = e => {
        if(!input.countries.includes(e.target.value)){
            setInput({
                ...input,
                countries: [...input.countries, e.target.value]
            })
        }else {
            alert('Country already selected')
        }
        e.target.value = 'Select country';
    } 
    
    const deleteCountry = e => {
        setInput({
            ...input,
            countries: input.countries.filter((country) => country !== e.target.value)
        })
    }

    // const handleSelectSeason = e => {
    //     if(!input.season.includes(e.target.value)){
    //         setInput({
    //             ...input,
    //             season: [...input.season, e.target.value]
    //         })
    //     }else {
    //         alert('Season already selected')
    //     }
    //     e.target.value = 'Select season';
    // } 
console.log(input)
return (
  <div className="backim">  
  
     <form onSubmit={(e) => handleSubmit(e)} className="form">
        <div className="ctitle">Create a Tourist Activity</div>
    
        <div className="cname">
        <div>
        <label >Name: </label>
        </div>
        <div>
        <input className={errors.name? 'danger' : 'inputs'}
            type="text" placeholder= "Name of the activity..." name="name" onChange={handleChange} value={input.name} />
        {/*Que value sea = al estado username. Cuando alguien escriba algo, que se modifique mi estado username, con el valor que hayan escrito.*/}
            {errors.name && (
                <p className="danger">{errors.name}</p>
            )}
            </div>
        </div>
        
        <div>
        <div><label>Difficulty: </label></div>
        <div><input className={errors.difficulty? 'danger' : 'inputs'}
            type="number" placeholder= "1-5" name="difficulty" onChange={handleChange} value={input.difficulty} />
            {errors.difficulty && (
                <p className="danger">{errors.difficulty}</p>
            )}
        </div></div>

        <div>
        <div><label>Duration: </label></div>
        <div><input className={errors.duration? 'danger' : 'inputs'}
            type="number" placeholder= "1 - 10 hs" name="duration" onChange={e => {handleChange(e)}} value={input.duration} />
            {errors.duration && (
                <p className="danger">{errors.duration}</p>
            )}
        </div></div>

        <div>
        <div><label>Season: </label></div>
        <div><select name='season' className={errors.season? 'danger' : 'inputs'} onChange={e => {handleChange(e)}}>
            <option disabled selected>Select a season</option> 
            <option value= 'Summer'>Summer</option>
            <option value= 'Autumn'>Autumn</option>
            <option value= 'Winter'>Winter</option>
            <option value= 'Spring'>Spring</option>
        </select></div>
        </div>

        <div>
        <label>Country: </label>
        <select className={errors.countries? 'danger' : 'inputs'} onChange={e => {handleSelect(e)}}>
            <option>Select country</option>
            {
                countries?.map(e => {
                    return <option key={e.id} value={e.name}>{e.name}</option>
                })
            }
        </select>  
            <div> { input.countries?.map(e => {
                return(
                <div>
                    <span> {e} </span>
                    <button className='x' type="button" value= {e} onClick={deleteCountry}> X </button>
                </div>
                )

            }) }</div>
        </div>

        <button type='submit' className="cbtn">Create Tourist Activity</button>
        <Link to="/home">
            <button className="cbtn">Cancel</button>
        </Link>
     </form>
  </div>
);
}

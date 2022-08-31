import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware, compose } from "redux";
import rootReducer from "../reducer/reducer.js"; 
import thunk from "redux-thunk";



const store = configureStore(
    {reducer: rootReducer},
    compose(applyMiddleware(thunk))
);
// thunk nos permite trabajar con asincronismo en el front
export default store;
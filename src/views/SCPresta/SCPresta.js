import React from 'react';
import "./SCPresta.css";
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";

export default function SCPresta() {
    return (
        <div className="SCPresta">
           <NavBar /> 
            <h1 className="title"> Service client/prestataire. </h1> <hr></hr>
            <NavBarDetail />  
        </div>
    )
}
import React from 'react';
import "./SC.css";
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";

export default function SC() {
    return (
        <div className="SC">
           <NavBar /> 
            <h1 className="title"> Service client </h1> <hr></hr>
            <NavBarDetail /> 
        </div>
    )
}
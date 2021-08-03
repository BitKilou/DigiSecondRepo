import React from 'react';
import "./RoadMap.css";
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";

export default function RoadMap() {
    return (
        <div className="RoadMap">
           <NavBar /> 
            <h1 className="road"> RoadMap. </h1> <hr></hr>

           <NavBarDetail /> 
        </div>
    )
}
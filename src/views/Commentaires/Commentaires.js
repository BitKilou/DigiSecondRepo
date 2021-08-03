import React from 'react';
import "./Commentaires.css";
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";

export default function Commentaires() {
    return (
        <div> 
            <NavBar />
            <h1 className="Commentaires"> Retour sur votre experience.</h1> <hr></hr>
             <NavBarDetail />  
        </div>
    )
}
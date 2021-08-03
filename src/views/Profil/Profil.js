import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";
import ProfilCards from "../../Components/Profil/Profil";
import "./Profil.css";

export default function userNFT() {
    return (
        <div className="App">
        <NavBar />
        <h1 className="title">Vos NFT</h1> <hr></hr>
        <ProfilCards /><hr></hr>
        <h3 className="historique">Historique</h3> <hr></hr> <br></br><br></br>  
        <NavBarDetail />
        </div>
    )
}
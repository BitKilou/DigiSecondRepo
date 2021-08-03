import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";
import NFT from "../../Components/NFT/NFT";
import "./HomePage.css";
import logo from "../../Images/TransparentLogo.png";


export default function HomePage() {
    return (
        <div className="App">
        <NavBar />
        <h1 className="title">DigiBox, le plaisir d'offrir!</h1> <hr></hr>
                <div className="text-logo">
                    <h2 className="subTitle">Les DigiBox du moment</h2>
                </div>
            <NFT />
        <NavBarDetail />
        </div>
    )
}

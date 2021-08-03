import React from 'react';
import "./Equipe.css";
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";
import Alain from '../../Images/PhotoEquipe/Alain.png';
import Nico from '../../Images/PhotoEquipe/Nico.png';
import Teo from '../../Images/PhotoEquipe/Teo.png';
import Kilian from '../../Images/PhotoEquipe/Kilian.png';
import logo from "../../Images/TransparentLogo.png";

export default function Equipe() {
    return (
        <>
        <NavBar />
        <div className="Team">
            <h1 className="titleTeam"> L'Equipe derrière le projet.</h1> <hr></hr>
              
        </div>
        

         <div className="wholeTeam">
         <img className="background" src={logo} alt="logo"/>
             <div className="Teo">
               <img  src={Teo} alt="teo"/>
                 <h4>Teo Guilhermet</h4> 
                    <p>Project manager et scrum master</p>
             </div>

                <div className="Alain" >
                  <img src={Alain} alt="alain"/>
                     <h4>Alain Praz</h4> 
                        <p>Project manager et Product owner</p>
                </div>

                    <div className="Nico">
                        <img  src={Nico} alt="nico"/>
                            <h4>Nicolas Fruneau</h4>
                               <p>Smart contract developer</p>
                    </div>

                      <div className="Kilian" >
                       <img src={Kilian} alt="kilian"/>
                            <h4>Kilian Mongey</h4> 
                               <p>Smart contract developer</p>
                      </div>
         </div>
         <NavBarDetail />
         </>
    )
}
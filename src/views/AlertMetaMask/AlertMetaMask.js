import React from 'react';
//import MetaMask from '../../Components/Metamask/Meta';

export default function Alert() {
    return (
        <div> 
            <h1 className="Commentaires"> Merci de connecter votre MetaMask.</h1> <hr></hr>
            <h4>Vous n'avez pas MetaMask d'installer ? </h4>
             <p>Voici un lien pour l'installation <a href="https://metamask.io/download">Install</a></p>
        </div>
    )
}


import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";
import NFT from "../../Components/NFT/NFT";
import "./HomePage.css";
import logo from "../../Images/TransparentLogo.png";
import Particles from 'react-particles-js';

export default function HomePage() {
    return (
        <div className="App">
            <Particles
                params={{
                    background: {
                        color: {
                            value: "#0d47a1",
                        },
                    },
                    retina_detect: true,
                    fpsLimit: 60,
                    interactivity: {
                        detectsOn: "canvas",
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 0.8,
                                size: 40,
                            },
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.3,
                            },
                        },
                    },
                    particles: {
                        move: {
                            direction: "none",
                            enable: true,
                            outMode: "bounce",
                            random: false,
                            speed: 2,
                            straight: false,
                        },                        
                        number: {
                            value: 100,
                        },
                        density: {
                            enable: true,
                            value_area: 100,
                        },
                        color: {
                            value: "#fff",
                        },
                        links: {
                            color: "#fff",
                            distance: 200,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                    }
                }}
            />

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

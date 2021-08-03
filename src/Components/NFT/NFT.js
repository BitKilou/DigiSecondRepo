import React, { useState, useEffect } from 'react';
import { NFTCard } from './components';
import "./NFT.css";
import axios from 'axios'

function NFT() {
    const [data, setData] = useState('');

    useEffect(() => {
        getAllOffers();
    }, []);

    const getAllOffers = () => {
        axios.get(process.env.REACT_APP_API_URL + '/offers')
        .then((res) => {
            const allOffers = res.data;
            setData(allOffers);
        })
    }

    return (
        <div className="holdingContainer">
            {data[0] !== undefined && data.map(item => (
                <div key={item} className="cardDisplay">
                    <NFTCard offer={item}/>
                </div>
            ))}
        </div>
    )
}

export default NFT;
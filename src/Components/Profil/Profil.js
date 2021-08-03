import React, { useState, useEffect } from 'react';
import { ProfilCard } from './components';
import "./Profil.css";
import axios from 'axios'
import Web3 from 'web3'

export default function ProfilCards() {
    const [data, setData] = useState('');
  
    useEffect(() => {
        async function getNftsByUser() {
            let web3 = new Web3(window.ethereum)
            const accounts = await web3.eth.getAccounts()

            axios.get(process.env.REACT_APP_API_URL + '/nfts', { params: { userAddress: accounts[0] } })
            .then((res) => {
                const allNfts = res.data;
                console.log(allNfts);
                setData(allNfts);
            })
        }
        getNftsByUser();
      }, []);

    return (
        <div className="holdingContainer">
            {data[0] !== undefined && data.map(item => (
                <div key={item} className="cardDisplay">
                    <ProfilCard nft={item}/>
                </div>
            ))}
        </div>
    )
}

# Table of content
 * Introduction 
 * Technologies
 * Setup for Launch
 * Project status
 * Sources
 
## DigiBox intro to the project
DigiBox is a blockChain Dapp. We intend to simplify the interaction between customers and sellers using blockchain technology. Why you ask ? Using blockchain in this case is efficient as we will cut third parties sellers so less fees for customers.

### Technologies
 - Truffle
 - React
 - Material UI
 - Ganache
 - Solidity ^0.8.0
 - Pinata API
 - CoinGecko API
   
#### Launch 
  - launch Ganache
  - npm i  
  - truffle migrate  
  - npm start  
    
  This project uses Pinata to store data on IPFS, in order to run it correctly create a Pinata account add this variables to your environment:  
  REACT_APP_PINATA_SECRET_API_KEY=  
  REACT_APP_PINATA_API_KEY=  

  This project runs along with a nodeJs server that you can run locally, you need to set up this variable, with your local port:  
  REACT_APP_API_URL=http://localhost:3001  

  Check out the server Part here: https://github.com/alpsoft/DigiBox-Server  
  
##### Project status
Still in development, project being created, We will deliver a full functional project in Q4 2021. Stay tunned !  
To-Do list :  
Front-end -> HomePage of Dapp and global css/Styling.  
Backend -> use of PDF library for NFT creation
Smart contract -> Creation of a Vault that allow use to receive eth and send it eth/Dai to our external providers and partners.  
  
###### Sources 
Alyra, blockchain school.  
@openzeppelin/contracts.  
#Uniswap-v3-periphery.              

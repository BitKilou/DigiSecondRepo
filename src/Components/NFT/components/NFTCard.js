import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import Web3 from 'web3'
import erc721Json from "../../../contracts/TokenERC721.json";

export default function NftCard(props) {

  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
  const classes = useStyles();
  
  const [account, setAccount] = useState(null)
  let [web3, setWeb3] = useState(null)
  const [erc721Contract, setErc721Contract] = useState(null)

  useEffect(() => {
    connectWeb3()
  }, [])
  
  // invoke to connect to wallet account
  // async function activate() {
  //   if (window.ethereum) {
  //     try {
  //       // await window.ethereum.enable();
  //       await window.ethereum.request({ method: 'eth_requestAccounts' });
  //       connectWeb3()
  //     } catch (err) {
  //       console.log('user did not add account...', err)
  //     }
  //   }
  // }
  
  async function connectWeb3() {
    let web3 = new Web3(window.ethereum)
    setWeb3(web3)
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = erc721Json.networks[networkId];
    const erc721 = new web3.eth.Contract(
      erc721Json.abi,
      deployedNetwork && deployedNetwork.address,
    );
    setErc721Contract(erc721);
  }

  async function createPinata() {
    if (process.env.REACT_APP_PINATA_API_KEY === undefined) {
      console.log('Pinata keys are not set in your environment !');
    }
    if (account === undefined) {
      alert("Please connect your account to Metamask");
    }

    return new Promise((resolve, reject) => {
      axios.post(process.env.REACT_APP_API_URL + '/pinata/create', {
        Owner: account,
        OfferId: props.offer.id
      })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      })
    })
  }

  async function createNFT(assetHash, metadataHash) {
    return new Promise((resolve, reject) => {
      var weiValue = web3.utils.toBN(props.offer.price);

      erc721Contract.methods.awardItem(props.offer.smartContractOfferId, assetHash, metadataHash)
        .send({from: account, value: weiValue})
        .then(response => { resolve(response) })
        .catch(error => {
          // unpin pinata if payment fail
          reject(error);
        })
    })
  }

  async function handleBuyProduct() {
    const pinataJson = await createPinata();
    const assetHash = pinataJson.data.pinata.asset;
    const metadataHash = pinataJson.data.pinata.metadata;

    const res = await createNFT(assetHash, metadataHash);
    const nftData = {
      ownerAddress: account,
      nftId: res.events.Transfer.returnValues.tokenId,
      offerId: props.offer.smartContractOfferId,
      imageIpfsHash: assetHash,
      metadataIpfsHash: metadataHash
    }
    await axios.post(process.env.REACT_APP_API_URL + '/nfts/create', nftData)
    .then(response => {
        console.log(response, "success");
    })
    .catch(error => {
        console.log(error)
    })
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={process.env.REACT_APP_API_URL + '/uploads/' + props.offer.filename}
          title={props.offer.filename}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.offer.provider}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {props.offer.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.offer.price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.offer.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => { handleBuyProduct() }}>Acheter</Button>
      </CardActions>
    </Card>
  );
}
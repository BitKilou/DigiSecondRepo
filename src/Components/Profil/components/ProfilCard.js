import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import erc721Json from "../../../contracts/TokenERC721.json";
import Popover from '@material-ui/core/Popover';
import Web3 from 'web3'
import "./ProfilCard.css";
import axios from 'axios'

export default function ProfilCard(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
    typography: {
      padding: theme.spacing(2),
    },
    popoverButton: {
      display: 'block',
      margin: '0 auto',
      padding: '10px 20px'
    }
  }));
  const classes = useStyles();

  const [account, setAccount] = useState(null)
  const [transferAddress, setTransferAddress] = useState(null)
  const [web3, setWeb3] = useState(null)
  const [erc721Contract, setErc721Contract] = useState(null)
  const [contractBalance, setContractBalance] = useState(null)

  useEffect(() => {
    connectWeb3();
  }, [])

  async function getBalanceContract() {
    const bal = await erc721Contract.methods.balanceContract().call()
    console.log(bal);
  }
  
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

  async function handleTransfer() {
    await erc721Contract.methods.transferFrom(account, transferAddress, props.nft.nftId).send({from: account})
    .then(async () => {
      const body = {
        ownerAddress: transferAddress,
        nftId: props.nft.nftId
      }
      axios.post(process.env.REACT_APP_API_URL + '/nfts/update', body)
    })
    .then(response => { console.log(response, "success") })
    .catch(error => { console.log(error) })
  }

  async function handleReimbursement() {
    await erc721Contract.methods.reimbursement(props.nft.nftId).send({from: account})
    .then(async (res) => {
      const body = {
        ownerAddress: '0x0',
        nftId: props.nft.nftId
      }
      axios.post(process.env.REACT_APP_API_URL + '/nfts/update', body)
    })
    .then(response => { console.log(response, "success") })
    .catch(error => { console.log(error) })
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Card className={classes.root}>
      <CardActionArea>
          <CardMedia
          className={classes.media}
          image={'https://gateway.pinata.cloud/ipfs/'+props.nft.imageIpfsHash}
          />
          <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Nft Id: {props.nft.nftId}
          </Typography>
          <a href={'https://gateway.pinata.cloud/ipfs/' + props.nft.metadataIpfsHash}>Metadata Link</a>
          <Typography variant="body2" color="textSecondary" component="p">
              Price
          </Typography>
          </CardContent>
      </CardActionArea>
      <CardActions>
        <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
          Transfert
        </Button>
        <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}
          anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{vertical: 'top', horizontal: 'center',}}
        >
          <TextField
              label="Addresse de transfert"
              type="text"
              onChange={(event) => { setTransferAddress(event.target.value); }}
          />
          <Button className={classes.popoverButton} onClick={handleTransfer} size="small" color="primary">Transférer</Button>
        </Popover>
        <Button aria-describedby={id} variant="contained" color="primary" onClick={handleReimbursement}>
          Remboursement
        </Button>
      </CardActions>
      <Button aria-describedby={id} variant="contained" color="primary" onClick={getBalanceContract}>Balance</Button>
    </Card>
  );
}

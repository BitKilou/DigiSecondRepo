import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import theme from "./theme";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import "@fontsource/inter";
import React from "react";

function MetaMask() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <ConnectButton handleOpenModal={onOpen} />
        <AccountModal isOpen={isOpen} onClose={onClose} />
      </Layout>
    </ChakraProvider>
  );
}

export default MetaMask;


/*
import { useWallet, UseWalletProvider } from 'use-wallet'
import React from 'react'
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import "./Meta.css";
///import { DAppProvider } from '@usedapp/core';

function Connection() {
    const wallet = useWallet()
    return (
            <div className="btn-meta">
              {wallet.status === 'connected' ? (
                <div className="display-meta">
                  <div className="accounts">Account: {wallet.account}</div>
                  <div className="balance">Balance: {wallet.balance} wei</div>
                </div>
              ) : (
                <div>
                  <Button onClick={() => wallet.connect()}>Connect to MetaMask</Button>
                </div>
              )}
            </div>     
          )
}

// Wrap everything in <UseWalletProvider />
export default () => (
    <UseWalletProvider
      chainId={1337}
      connectors={{
        // This is how connectors get configured
        provided: {provider: window.cleanEthereum},
      }}
    >
      <Connection />
    </UseWalletProvider>
  ) */
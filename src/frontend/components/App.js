import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.js';
import { Spinner } from 'react-bootstrap';
import './App.css';
import { ethers } from 'ethers';
import abi from '../contractsData/NFT.json';
import addy from '../contractsData/NFT-address.json';

function App() {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null);
  const [blokes, setBlokes] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    console.log('Setting up Ethereum event listeners');
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        console.log('Accounts Changed:', accounts);
        setAccount(accounts[0] || null);
      });

      window.ethereum.on('chainChanged', (_chainId) => {
        console.log('Chain Changed:', _chainId);
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        console.log('Removing Ethereum event listeners');
        window.ethereum.removeListener('accountsChanged', setAccount);
        window.ethereum.removeListener('chainChanged', window.location.reload);
      }
    };
  }, []);

  const web3Handler = async () => {
    try {
      setLoading(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Accounts received:', accounts);
      setAccount(accounts[0]);
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner();
      console.log('Signer resolved:', signer);
      loadContracts(signer);
      setProvider(provider)
      setLoading(false);
    } catch (error) {
      console.error('Error in web3Handler:', error);
      setLoading(false);
    }
  };

  const loadContracts = async (signer) => {
    try {
      console.log('Loading contracts with signer:', signer);
      const contractAddress = addy.address;
      const contractABI = abi;
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      console.log('Contract instance created:', contract);
      setBlokes(contract)
    } catch (error) {
      console.error('Error loading contracts:', error);
    }
  };

  const handleDisconnect = () => {
    console.log('Disconnecting...');
    setAccount(null);
  };

  return (
    <BrowserRouter>
      <div className="App">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <Spinner animation="border" style={{ display: 'flex' }} />
            <p className='mx-3 my-0'>Awaiting Wallet Connection...</p>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home account={account} web3Handler={web3Handler} disconnectHandler={handleDisconnect} provider={provider} blokes={blokes} />} />
          </ Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;



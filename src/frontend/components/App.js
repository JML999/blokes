import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.js';
import { Spinner } from 'react-bootstrap';
import './App.css';
import { ethers } from 'ethers';


function App() {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null); // Assuming account is now just the address as a string
  const [signer, setSigner] = useState(null);
  const [nft, setNFT] = useState({});
  const [factory, setFactory] = useState({});

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || null);
      });

      window.ethereum.on('chainChanged', (_chainId) => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', setAccount);
        window.ethereum.removeListener('chainChanged', window.location.reload);
      }
    };
  }, []);

  const web3Handler = async () => {
    setLoading(true);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]); // Directly setting the first account as the account string
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    loadContracts(signer);    
    setSigner(signer)
    setLoading(false);
  };

  const handleDisconnect = () => {
    setAccount(null); // Assuming 'setAccount' is your state setter for the 'account'
  };

  const loadContracts = async (signer) => {
  };

  return (
    <BrowserRouter>
      <div className="App">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <Spinner animation="border" style={{ display: 'flex' }} />
            <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
          </div>
        ) : (
          <Routes>
            <Route path="/" element= {<Home account={account} web3Handler={web3Handler} disconnectHandler={handleDisconnect} />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;


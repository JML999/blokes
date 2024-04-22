import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './Navbar';
import Home from './Home.js';
import Landing from './Landing.js';
import Socials from './Socials.js';
import Viewer from './Viewer.js';
import About from './About.js';
import Edit from './SkinEditor.jsx';
import Gallery from './Gallery.js';
import Dashboard from "./Dashboard.js";
import { Spinner } from 'react-bootstrap';
import './App.css';
import { ethers } from 'ethers';
import StanABI from '../contractsData/NFT.json';
import StanAddress from '../contractsData/NFT-address.json';

function App() {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null); // Assuming account is now just the address as a string
  const [nft, setNFT] = useState({});

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
  };

  const loadContracts = async (signer) => {
    const stanContract = new ethers.Contract(StanAddress.address, StanABI, signer);
    setNFT(stanContract);
    console.log("stanContract")
    console.log(stanContract)
    setLoading(false);
  };

  if (loading) {
    return (
      <Spinner animation="border" style={{ display: 'flex' }} />
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation web3Handler={web3Handler} account={account} />
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <Spinner animation="border" style={{ display: 'flex' }} />
            <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Edit" element={<Edit account={account} nft={nft} />} />
            <Route path="/Gallery" element={<Gallery userAddress={account} nft={nft} />} />
            <Route path="/Socials" element={<Socials />} />
            <Route path="/dashboard" element={<Dashboard account={account} nftContract={nft} />} />
            <Route path="/viewer/:id" element={<Viewer userAddress={account} nft={nft} />}/>
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;


import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './Navbar';
import Home from './Home.js';
import Landing from './Landing.js';
import Socials from './Socials.js';
import About from './About.js';
import Dashboard from "./Dashboard.js";
import { Spinner } from 'react-bootstrap';
import './App.css';
import { ethers } from 'ethers';
import StanABI from '../contractsData/NFT.json';
import StanAddress from '../contractsData/NFT-address.json';


function App() {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const { chainId } = await provider.getNetwork();
    console.log(chainId)
    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    });
    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });
    loadContracts(signer);
  };

  const loadContracts = async (signer) => {
    const stanContract = new ethers.Contract(StanAddress.address, StanABI, signer )
    setNFT(stanContract)
    setLoading(false);
  };
  

  return (
    <BrowserRouter>
      <div className="App">
        <>
          <Navigation web3Handler={web3Handler} account={account} />
        </>
        <div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Landing/>} />
              <Route path="/Home" element={<Home />} />
              <Route path="/About" element={<About />}/>
              <Route path="/Socials" element={<Socials />}/>
              <Route path="/dashboard" element={<Dashboard account={account} nftContract={nft} />} />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

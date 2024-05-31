import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ethers } from 'ethers';
import './Home.css';
import pinkBackground from './Renders/Pink_Background_Medium.png';

const Home = ({ web3Handler, account, disconnectHandler, provider, blokes }) => {
  const [mintStatus, setMintStatus] = useState('');
  const [data, setData] = useState([]);
  const [mintIsActive, setMintActive] = useState(false);
  const [whitelistActive, setWhitelistActive] = useState(true);
  const [mintPrice, setMintPrice] = useState(450);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [totalSupply, setTotalSupply] = useState(null);
  const [logs, setLogs] = useState([]);

  const expectedChainId = 2911;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/all_uris.json');
      const combinedData = await response.json();
      setData(combinedData);
    };

    const fetchContractData = async () => {
      try {
        const nftContract = blokes;
        const whitelistStatus = await nftContract.whitelistActive();
        const mintIsActive = await nftContract.mintIsActive();
        const price = whitelistStatus ? await nftContract.whitelistPrice() : await nftContract.mintPrice();
        const totalSupply = await nftContract.totalSupply();

        setMintActive(mintIsActive);
        setWhitelistActive(whitelistStatus);
        setMintPrice(ethers.utils.formatEther(price));
        setTotalSupply(totalSupply.toNumber());

        // Debugging steps
        await debugSimpleMethods(nftContract);
      } catch (error) {
        console.error('Error fetching contract data:', error);
      }
    };

    fetchData();
    fetchContractData();
  }, []);

  const debugSimpleMethods = async (nftContract) => {
    try {
      const totalSupply = await nftContract.totalSupply();
      console.log(`Total Supply: ${totalSupply.toString()}`);
    } catch (error) {
      console.error('Failed to call totalSupply:', error);
    }

    try {
      const whitelistActive = await nftContract.whitelistActive();
      console.log(`Whitelist Active: ${whitelistActive}`);
    } catch (error) {
      console.error('Failed to call whitelistActive:', error);
    }
  };

  const mintPressed = async () => {
    if (!account) {
      setMintStatus('Please connect your wallet');
      return;
    }
    if (!mintIsActive) {
      setMintStatus('Minting Soon');
      return;
    }
    setMintStatus('processing');
    try {
      // Fetch the next token ID & URI
      const nextTokenId = await blokes.getNextTokenId();
      const response = await fetch(`https://blokesofhytopia.netlify.app/.netlify/functions/metadata/${nextTokenId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const entry = await response.json();
      if (!entry) {
        throw new Error('Metadata not found for the current token ID or image link is missing');
      }
      const txOptions = {
        value: whitelistActive ? ethers.utils.parseEther("0.001") : ethers.utils.parseEther("0.002"),
        gasLimit: 1500000
      };
      const tx = whitelistActive
        ? await blokes.whitelistMint(account, txOptions)
        : await blokes.normalMint(account, txOptions);
      const receipt = await tx.wait();
      setMintStatus('success');
      
      const newTotalSupply = await blokes.totalSupply();
      setTotalSupply(newTotalSupply.toNumber());
    } catch (error) {
      console.error('Minting failed:', error);
      setMintStatus('error');
    }
  };

  return (
    <div className="home" style={{ backgroundImage: `url(${pinkBackground})` }}>
      <div className="content">
        <h1 className="title">blokes</h1>
        <div className="sub-title">
          {totalSupply !== null ? `${totalSupply} / 2000 minted` : '2000 Diggers'}
        </div>
        <div className="price-info">
          {whitelistActive ? 'Whitelist Mint: ' : ''} {mintPrice} TOPIA
        </div>
        <div className="home-button-group">
          {mintIsActive ? (
            <button className="home-custom-button" onClick={mintPressed}>Mint</button>
          ) : null}
          <div className={`mint-status ${mintStatus}`}>{getStatusMessage(mintStatus)}</div>
        </div>
        <div className="wallet-button-group">
          {account ? (
            <Button onClick={disconnectHandler} variant="outline-light" className="custom-button" style={{ fontSize: isMobile ? '0.8rem' : '1rem' }}>
              Disconnect
            </Button>
          ) : (
            <Button onClick={web3Handler} variant="outline-light" className="custom-button" style={{ fontSize: isMobile ? '0.8rem' : '1rem' }}>
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const getStatusMessage = (status) => {
  switch (status) {
    case 'processing':
      return 'Processing...';
    case 'success':
      return 'Mint successful!';
    case 'error':
      return 'Mint failed.';
    case 'Please connect your wallet':
      return 'Please connect your wallet';
    case 'Please switch to the correct network. Expected Chain ID: 29112':
      return 'Please switch to the correct network: HYCHAIN';
    default:
      return '';
  }
};

export default Home;











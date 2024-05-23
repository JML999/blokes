import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ethers } from 'ethers';
import abi from '../contractsData/NFT.json';
import address from '../contractsData/NFT-address.json';
import './Home.css';
import pinkBackground from './Renders/Pink_Background_Large.png';

const Home = ({ web3Handler, account, disconnectHandler, provider, blokes }) => {
  const [mintStatus, setMintStatus] = useState('');
  const [data, setData] = useState([]);
  const [whitelistActive, setWhitelistActive] = useState(false);
  const [mintPrice, setMintPrice] = useState(null);
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
        const price = whitelistStatus ? await nftContract.whitelistPrice() : await nftContract.mintPrice();
        const totalSupply = await nftContract.totalSupply();

        // Subscribe to contract events
        nftContract.on('DebugLog', (message, user) => {
          console.log(`DebugLog: ${message} - ${user}`);
          setLogs((prevLogs) => [...prevLogs, `DebugLog: ${message} - ${user}`]);
        });

        nftContract.on('DebugLogValue', (message, value) => {
          console.log(`DebugLogValue: ${message} - ${ethers.utils.formatEther(value)} ETH`);
          setLogs((prevLogs) => [...prevLogs, `DebugLogValue: ${message} - ${ethers.utils.formatEther(value)} ETH`]);
        });

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
    setMintStatus('processing');
    try {
      // Fetch the next token ID
      const nextTokenId = await blokes.getNextTokenId();
      console.log("Next", nextTokenId)
      console.log(account)
      // Fetch metadata URI for the current token ID
      const response = await fetch(`https://blokesofhytopia.netlify.app/.netlify/functions/metadata/${nextTokenId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const entry = await response.json();
      if (!entry || !entry.image) {
        throw new Error('Metadata not found for the current token ID or image link is missing');
      }
      const metadataUri = entry.image;
      console.log('Metadata URI:', metadataUri);
      // Prepare transaction options
      const txOptions = {
        value: whitelistActive ? ethers.utils.parseEther("0.001") : ethers.utils.parseEther("0.002"),
        gasLimit: 300000
      };
      console.log('Transaction options:', txOptions);
      const tx = whitelistActive
        ? await blokes.whitelistMint(account, txOptions)
        : await blokes.normalMint(account, txOptions);
      const receipt = await tx.wait();
      console.log('Minted token ID:', nextTokenId);
      setMintStatus('success');
      setTotalSupply(totalSupply + 1); // Increment the total supply
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
          {totalSupply !== null ? `${totalSupply} / 1400 minted` : '1400 Diggers'}
        </div>
        <div className="price-info">
          {whitelistActive ? 'Whitelist Mint: ' : ''} {mintPrice} TOPIA
        </div>
        <div className="home-button-group">
          <button className="home-custom-button" onClick={mintPressed}>mint</button>
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
        {/* Display logs */}
        <div className="logs">
          <h3>Debug Logs:</h3>
          <ul>
            {logs.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
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
      return 'Mint failed. Please try again.';
    case 'Please connect your wallet':
      return 'Please connect your wallet';
    case 'Please switch to the correct network. Expected Chain ID: 29112':
      return 'Please switch to the correct network: HYCHAIN';
    default:
      return '';
  }
};

export default Home;











import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap'; // Import Button from react-bootstrap
import { ethers } from 'ethers';
import abi from '../contractsData/NFT.json';
import address from '../contractsData/NFT-address.json';
import './Home.css';
import pinkBackground from './Renders/Pink_Background_Large.png';

const Home = ({ web3Handler, account, disconnectHandler }) => {
  const [mintStatus, setMintStatus] = useState('');
  const [data, setData] = useState([]);
  const [whitelistActive, setWhitelistActive] = useState(false);
  const [mintPrice, setMintPrice] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(address.address, abi, signer);

        const whitelistStatus = await nftContract.whitelistActive();
        const price = whitelistStatus ? await nftContract.whitelistPrice() : await nftContract.mintPrice();

        setWhitelistActive(whitelistStatus);
        setMintPrice(ethers.utils.formatEther(price));
      } catch (error) {
        console.error('Error fetching contract data:', error);
      }
    };

    fetchData();
    fetchContractData();
  }, []);

  const mintPressed = async () => {
    setMintStatus('processing');
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(address.address, abi, signer);
  
      // Fetch the next token ID
      const nextTokenId = await nftContract.getNextTokenId();
  
      // Fetch metadata from your server
      const response = await fetch(`https://blokemeta.netlify.app/.netlify/functions/metadata/${nextTokenId}`);
      const metadata = await response.json();
  
      if (!metadata || !metadata["Direct Download Link"]) {
        throw new Error('Metadata not found for the current token ID or Direct Download Link is missing');
      }
  
      console.log('Direct Download Link (ipfsMetadata):', metadata["Direct Download Link"]);
  
      // Mint the token with the expected token ID and URI
      const tx = whitelistActive
        ? await nftContract.whitelistMint({ value: ethers.utils.parseEther("0.001"), gasLimit: 300000 })
        : await nftContract.normalMint({ value: ethers.utils.parseEther("0.002"), gasLimit: 300000 });
  
      const receipt = await tx.wait();
  
      console.log('Minted token ID:', nextTokenId);
      setMintStatus('success');
    } catch (error) {
      console.error('Minting failed:', error);
      setMintStatus('error');
    }
  };

  return (
    <div className="home" style={{ backgroundImage: `url(${pinkBackground})` }}>
      <div className="content">
        <h1 className="title">blokes</h1>
        <div className="price-info">
          {whitelistActive ? 'Whitelist Mint Price: ' : 'Mint Price: '} {mintPrice} TOPIA
        </div>
        {/* Action Buttons */}
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
    default:
      return '';
  }
};

export default Home;













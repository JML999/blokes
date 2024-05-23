import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
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
  const [totalSupply, setTotalSupply] = useState(null);

  const expectedChainId = 11155111;

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
        const totalSupply = await nftContract.totalSupply();

        setWhitelistActive(whitelistStatus);
        setMintPrice(ethers.utils.formatEther(price));
        setTotalSupply(totalSupply.toNumber());
      } catch (error) {
        console.error('Error fetching contract data:', error);
      }
    };

    fetchData();
    fetchContractData();
  }, []);

  const mintPressed = async () => {
    if (!account) {
      setMintStatus('Please connect your wallet');
      return;
    }

    setMintStatus('processing');
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const { chainId } = await provider.getNetwork();

      if (chainId !== expectedChainId) {
        setMintStatus(`Please switch to the correct network. Expected Chain ID: ${expectedChainId}`);
        return;
      }

      const nftContract = new ethers.Contract(address.address, abi, signer);

      // Fetch the next token ID
      const nextTokenId = await nftContract.getNextTokenId();

      // Fetch metadata URI for the current token ID
      const response = await fetch(`https://blokesofhytopia.netlify.app/.netlify/functions/metadata/${nextTokenId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const entry = await response.json();

      console.log('Metadata entry:', entry);

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

      // Mint the token with the expected token ID and URI
      const tx = whitelistActive
        ? await nftContract.whitelistMint(account, txOptions)
        : await nftContract.normalMint(account, txOptions);

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
    case 'Please connect your wallet':
      return 'Please connect your wallet';
    case 'Please switch to the correct network. Expected Chain ID: 11155111':
      return 'Please switch to the correct network: HYCHAIN';
    default:
      return '';
  }
};

export default Home;














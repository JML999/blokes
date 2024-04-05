import React, { useState, useEffect } from 'react';
import steveImage from './SmallStan.png';
import { convertUTCToEST } from './utils';
import './fonts.css'; // Import the CSS file
import skinTest from './stan_edit.png'; // Import the CSS file
import capeTest from './cape.png'; // Import the CSS file

import { SkinViewer, WalkingAnimation } from "skinview3d";
import ReactSkinview3d from "react-skinview3d";


const Buy = ({ auction, account }) => {
  const [loading, setLoading] = useState(true);
  const [tokenData, setTokenData] = useState([]); // State to store token data
  const [sortBy, setSortBy] = useState('price'); // State to track the sorting option
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current token index

  useEffect(() => {
    loadMarketplaceItems();
  }, []);

  const loadMarketplaceItems = async () => {
    try {
      // Your code to load marketplace items goes here...
      // Sample data for demonstration
      const tokenData = [
        { tokenId: '1', price: 100 },
        { tokenId: '2', price: 200 },
        { tokenId: '4', price: 30 },
        { tokenId: '30', price: 30 },
        { tokenId: '444', price: 10000 },
        { tokenId: '8', price: 678 }
      ];
      // Sort by price initially
      const sortedTokenData = tokenData.sort((a, b) => a.price - b.price || parseInt(a.tokenId) - parseInt(b.tokenId));
      setTokenData(sortedTokenData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading marketplace items:', error);
      setLoading(false);
    }
  };

  // Function to handle sorting by lowest price
  const sortByPrice = () => {
    setSortBy('price');
    const sortedTokenData = tokenData.sort((a, b) => a.price - b.price || parseInt(a.tokenId) - parseInt(b.tokenId));
    setTokenData(sortedTokenData);
    setCurrentIndex(0); // Reset current index to 0
  };

  // Function to handle sorting by lowest token number
  const sortByTokenNumber = () => {
    setSortBy('tokenId');
    const sortedTokenData = tokenData.sort((a, b) => parseInt(a.tokenId) - parseInt(b.tokenId) || a.price - b.price);
    setTokenData(sortedTokenData);
    setCurrentIndex(0); // Reset current index to 0
  };

  // Function to handle next token
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tokenData.length);
  };

  // Function to handle previous token
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + tokenData.length) % tokenData.length);
  };

  return (
    
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <div className="d-flex flex-column align-items-center mb-4">
        <h2 className="highest-bid-title mb-2" style={{ fontSize: '1.25rem' }}>
          Price: <span className="highlight">{tokenData.length > 0 ? tokenData[currentIndex].price : ''}</span> TOPIA
        </h2>
        <div className="mb-2" style={{ maxWidth: '80px' }}>
          <a href={`https://explorer.hychain.com/token/0xEb6F6c95C1A31C97e61a0f18CFB02c544DFE7436/Instance/${tokenData.length > 0 ? tokenData[currentIndex].tokenId : ''}`} target="_blank" rel="noopener noreferrer">
            <img src={steveImage} alt="Stan" style={{ maxWidth: '100%', height: 'auto' }} />
          </a>
        </div>
        <div className="auction-end-time mb-1" style={{ fontSize: '0.75rem', fontStyle: 'italic', color: 'grey', cursor: 'pointer' }} onClick={sortBy === 'price' ? sortByTokenNumber : sortByPrice}>
          {sortBy === 'price' ? 'Sorted by: Lowest Price' : 'Sorted by: Lowest Token'}
        </div>
        <div className="d-flex align-items-center mb-2">
          <button onClick={handlePrev} style={{ fontFamily: 'Minecraftia', fontSize: '1rem', padding: '10px 20px', marginRight: '10px' }}>-</button>
          <p className="token-title" style={{ fontFamily: 'Minecraftia', fontSize: '0.8rem', margin: '0' }}>Stan{tokenData.length > 0 ? tokenData[currentIndex].tokenId : ''}</p> {/* Render selected token ID */}
          <button onClick={handleNext} style={{ fontFamily: 'Minecraftia', fontSize: '1rem', padding: '10px 20px', marginLeft: '10px' }}>+</button>
        </div>
        <div className="mb-2">
          <button className="buy-button">Buy</button>
        </div>
      </div>
      <div className="mt-auto ml-3">
        {/* Withdrawal and error handling */}
      </div>
    </div>
  );
};

export default Buy;
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { ethers } from 'ethers';
import HighQualityImage from './HighQualityImage';
import { useNavigate } from 'react-router-dom';
import './UserMints.css';
import nyskinABI from '../contractsData/nySkinNFTABI.json';

const UserMints = ({ userAddress, ethereumProvider, onSelectEntry }) => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastDocs, setLastDocs] = useState([null]); // Store last document for each page
    const pageSize = 3;
    const navigate = useNavigate();
    const isMobile = window.innerWidth <= 768;

    useEffect(() => {
        fetchEntries();
    }, [currentPage, ethereumProvider]);

    const fetchEntries = async () => {
        setLoading(true);
        let query = db.collection('userMints')
            .where('userId', '==', userAddress)
            .orderBy('timestamp')
            .limit(pageSize);
    
        if (currentPage > 1 && lastDocs[currentPage - 1]) {
            query = query.startAfter(lastDocs[currentPage - 1]);
        }
    
        try {
            const snapshot = await query.get();
            if (snapshot.empty) {
                setEntries([]);
            } else {
                const mints = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const validMints = [];
                for (const mint of mints) {
                    const nftContract = new ethers.Contract(mint.collectionAddress, nyskinABI, ethereumProvider);
                    try {
                        const owner = await nftContract.ownerOf(mint.tokenId.toString());
                        if (owner.toLowerCase() === userAddress.toLowerCase()) {
                            validMints.push(mint);
                        } else {
                            console.log(`User no longer owns token ${mint.tokenId}, deleting...`);
                            await db.collection('userMints').doc(mint.id).delete();
                        }
                    } catch (error) {
                        console.error(`Failed to check ownership for token ${mint.tokenId}:`, error);
                    }
                }
                setEntries(validMints);
                if (validMints.length === pageSize) {
                    const newLastDocs = [...lastDocs];
                    newLastDocs[currentPage] = snapshot.docs[snapshot.docs.length - 1];
                    setLastDocs(newLastDocs);
                }
            }
        } catch (error) {
            console.error('Failed to fetch entries:', error);
        } finally {
            setLoading(false);
        }
    };

    const nextPage = () => {
        if (!loading && entries.length === pageSize) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (!loading && currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <div className="user-mints">
            <div className="text-center mb-2">
                <h2 className="user-mints-title" style={{ fontFamily: 'Minecraftia' }}>Skinz</h2>
            </div>
            {loading ? (
                <p>Loading mints...</p>
            ) : (
                <div className="user-mints-grid">
                    {entries.map(entry => (
                        <div key={`${entry.tokenId}-${entry.collectionAddress}`} className="user-mint-card" onClick={() => onSelectEntry(entry)}>
                            {isMobile ? (
                                <img src={entry.image} className="user-mint-image" />
                            ) : (
                                <HighQualityImage imageUrl={entry.image} className="user-mint-image" scale={2.5} />
                            )}
                        </div>
                    ))}
                </div>
            )}
            <div className="user-pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>{"<"}</button>
                <span>{currentPage}</span>
                <button onClick={nextPage} disabled={entries.length < pageSize}>{">"}</button>
            </div>
        </div>
    );
};

export default UserMints;


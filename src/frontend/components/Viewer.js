import React, { useState, useEffect } from 'react';
import AvatarViewer from './AvatarViewer';
import './Viewer.css';
import { useLocation, useParams } from 'react-router-dom';
import { db } from "../../firebase";
import { doc, getDoc, increment, serverTimestamp } from "firebase/firestore";
import { ethers } from 'ethers';

import nyskinABI from '../contractsData/nySkinNFTABI.json';

const Viewer = ({ entry, imageData, account }) => {
    const [likes, setLikes] = useState(entry?.likes || 0);
    const [dislikes, setDislikes] = useState(entry?.dislikes || 0);
    const [mints, setMints] = useState(entry?.mints || 0);
    const [hasVoted, setHasVoted] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [lastMint, setLastMint] = useState(null);
    const [mintCounts, setMintCounts] = useState({});

    
    const [mintStatus, setMintStatus] = useState({
        message: '',
        visible: false,
        success: true
    });

    useEffect(() => {
        if (entry && !(entry.id in mintCounts)) {
            setMintCounts(prev => ({
                ...prev,
                [entry.id]: entry.mints  // Initialize this entry's mint count from the entry prop
            }));
        }
    }, [entry, mintCounts]);

    const updateMintStatus = (message, isSuccess) => {
        setMintStatus({
            message: message,
            visible: true,
            success: isSuccess
        });
    };

    useEffect(() => {
        if (imageData && entry) {
            setImageUrl(imageData);
            setMintStatus({
                message: '',
                visible: false,
                success: true
            });
            setMints(entry.mints)
        }
    }, [imageData, entry]);

    const handleMint = async () => {
        if (!account) {
            alert("Please connect your wallet to mint.");
            return;
        }

        updateMintStatus("processing...", true);
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const nftContract = new ethers.Contract(entry.collectionAddress, nyskinABI, signer);
            const tx = await nftContract.safeMint(account, entry.ipfsMetadata);
            const receipt = await tx.wait();

            updateMintStatus("Transaction confirmed. Processing mint...", true);

            const transferEvent = receipt.events?.find(e => e.event === "Transfer" && e.args.from === "0x0000000000000000000000000000000000000000");
            const tokenId = transferEvent.args.tokenId.toString();

            await db.collection('userMints').add({
                userId: account,
                collectionAddress: entry.collectionAddress,
                tokenId,
                metadata: entry.ipfsMetadata,
                image: entry.firebaseImageUrl,
                name: entry.name,
                timestamp: serverTimestamp()
            });

            updateMintStatus("NFT minted successfully!", true);
            setMints(mints + 1);

            const incrementAmount = increment(1);
            const editDocRef = db.collection('skins').doc(entry.id);
            const fieldToUpdate = 'mints';
            await editDocRef.update({ [fieldToUpdate]: incrementAmount });
            setMintCounts(prev => ({
                ...prev,
                [entry.id]: (prev[entry.id] || entry.mints) + 1  // Increment the local mint count
            }));
        } catch (error) {
            updateMintStatus("Failed to mint NFT. Please try again.", false);
        }
    };

    if (!entry) {
        return (
            <div className="alt-viewer-container">
                Select a Skin Collection to View & Mint
            </div>
        );
    }

    const createdAtDate = entry.createdAt ? new Date(entry.createdAt.seconds * 1000) : new Date();
    const formattedDate = createdAtDate.toDateString();

    return (
        <div className="viewer-container">
            <div className="avatar-viewer">
                {imageUrl ? (
                    <AvatarViewer skinUrl={entry.firebaseImageUrl} autoRotate={false} />
                ) : (
                    <p>Loading image...</p>
                )}
            </div>
            <div className="entity-details">
                <h2>{entry.name}</h2>
                <p><strong>Mints:</strong> {mintCounts[entry.id] ?? entry.mints} {' / '} {entry.supply} </p>
                <p><strong>Creator:</strong> {entry.creator}</p>
                <p><strong>Created At:</strong> {formattedDate}</p>
                <p><strong>Collection:</strong> {entry.collectionAddress}</p>
                <div className="viewer-interactions">
                    <button onClick={handleMint} style={{ backgroundColor: 'grey' }}>
                        Mint
                    </button>
                </div>
                <div style={{ marginTop: '2px' }}>
                {mintStatus.visible && (
                    <div style={{ color: 'red' }} className={`status-message ${mintStatus.success ? 'success' : 'error'}`}>
                        {mintStatus.message}
                    </div>
                )}
            </div>
            </div>
        </div>
    );
};

export default Viewer;



/*
                <div className= "viewer-interactions">
                    <button onClick={() => handleInteraction('like', entry.id)} style={{ backgroundColor: 'grey' }}>
                        👍 ({likes})
                    </button>
                    <button onClick={() => handleInteraction('dislike', entry.id)} style={{ backgroundColor: 'grey' }}>
                        👎 ({dislikes})
                    </button>
                </div>
*/
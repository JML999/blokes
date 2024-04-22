import React, { useState, useEffect } from 'react';
import AvatarViewer from './AvatarViewer';
import './Viewer.css';
import { useLocation } from 'react-router-dom';
import { db } from "../../firebase";
import { increment } from "firebase/firestore";

const Viewer = ({ userAddress, nft }) => {
    const location = useLocation();
    const entry = location.state?.entry;
    const [imageUrl, setImageUrl] = useState('');
    const [likes, setLikes] = useState(entry?.likes || 0);
    const [dislikes, setDislikes] = useState(entry?.dislikes || 0);
    const [hasVoted, setHasVoted] = useState(false);
    const [isStanOwner, setStanOwner] = useState(false);

    useEffect(() => {
        if (entry && entry.firebaseImageUrl) {
            fetchImage(entry.firebaseImageUrl);
        }
        checkUserInteraction(entry?.id);
    }, [entry]);

    useEffect(() => {
        if (userAddress && nft.balanceOf) {
          const checkIfStanOwner = async () => {
            try {
              console.log("account")
              console.log(userAddress)
              const balance = await nft.balanceOf(userAddress);
              console.log("balance")
              console.log(balance)
              setStanOwner(balance > 0);
            } catch (error) {
              console.error('Error checking balance:', error);
            }
          };
          checkIfStanOwner();
        }
      }, [userAddress, nft]);

    const fetchImage = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const localUrl = URL.createObjectURL(blob);
            setImageUrl(localUrl);
        } catch (error) {
            console.error('Error fetching image:', error);
            setImageUrl('');
        }
    };

    useEffect(() => {
        return () => imageUrl && URL.revokeObjectURL(imageUrl);
    }, [imageUrl]);

    const handleInteraction = async (interactionType) => {
        if (!userAddress) {
            alert("Please connect your web3 wallet to interact.");
            return;
        }

        if (!isStanOwner) {
            alert("You must own a Stan to vote.");
            return;
          }

        if (hasVoted) {
            alert("You have already voted for this post.");
            return;
        }

        // Optimistically update the UI
        if (interactionType === 'like') {
            setLikes(likes + 1);
        } else if (interactionType === 'dislike') {
            setDislikes(dislikes + 1);
        }

        // Update database with user interaction
        await db.collection('interactions').add({
            photoId: entry.id,
            interactionType,
            userAddress,
        });

        // Increment likes or dislikes in the database based on interaction type
        const incrementAmount = increment(1);
        const editDocRef = db.collection('edits').doc(entry.id);
        try {
            if (interactionType === 'like') {
                await editDocRef.update({ likes: incrementAmount });
            } else if (interactionType === 'dislike') {
                await editDocRef.update({ dislikes: incrementAmount });
            }
            setHasVoted(true); // Prevent further votes
        } catch (error) {
            console.error('Failed to record interaction:', error);
            // Rollback optimistic updates if error occurs
            setLikes(likes);
            setDislikes(dislikes);
        }
    };

    const checkUserInteraction = async (photoId) => {
        if (!photoId) return;
        const query = db.collection('interactions')
            .where('photoId', '==', photoId)
            .where('userAddress', '==', userAddress);
        const snapshot = await query.get();
        setHasVoted(!snapshot.empty);
    };

    if (!entry) {
        return <div>No data available.</div>;
    }

    const createdAtDate = entry.createdAt ? new Date(entry.createdAt.seconds * 1000) : new Date();
    const formattedDate = createdAtDate.toDateString();

    return (
        <div className="viewer-container">
            <div className="avatar-viewer">
                {imageUrl ? (
                    <AvatarViewer skinUrl={imageUrl} autoRotate={false} />
                ) : (
                    <p>Loading image...</p>
                )}
            </div>
            <div className="entity-details">
                <h2>{entry.name}</h2>
                <p><strong>Creator:</strong> {entry.creator}</p>
                <p><strong>Created At:</strong> {formattedDate}</p>
                <p><strong>ipfs:</strong> {entry.ipfsMetadata}</p>
                <div className= "viewer-interactions">
                    <button onClick={() => handleInteraction('like')} style={{ backgroundColor: 'grey' }}>
                        👍 ({likes})
                    </button>
                    <button onClick={() => handleInteraction('dislike')} style={{ backgroundColor: 'grey' }}>
                        👎 ({dislikes})
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Viewer;

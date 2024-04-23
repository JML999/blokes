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

    const checkUserInteraction = async (photoId) => {
        console.log("we are checking")
        const query = db.collection('interactions')
          .where('photoId', '==', photoId)
          .where('userAddress', '==', userAddress);
          const snapshot = await query.get();
          console.log(snapshot)
          console.log(!snapshot.empty)
          return !snapshot.empty;
      };

    useEffect(() => {
        if (userAddress && nft.balanceOf) {
          const checkIfStanOwner = async () => {
            try {
              const balance = await nft.balanceOf(userAddress);
              setStanOwner(balance > 0);
            } catch (error) {
              console.error('Error checking balance:', error);
            }
          };
          checkIfStanOwner();
        }
      }, [userAddress, nft]);

      useEffect(() => {
        if (entry && entry.firebaseImageUrl) {
            fetchImage(entry.firebaseImageUrl);
        }
    }, [entry]);


    useEffect(() => {
        return () => imageUrl && URL.revokeObjectURL(imageUrl);
    }, [imageUrl]);


    const handleInteraction = async (interactionType, id) => {
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
    
        // Check if the user has already interacted
        const hasInteracted = await checkUserInteraction(id);
        if (hasInteracted) {
            alert("You have already voted for this post.");
            setHasVoted(true); // Update state to reflect this to avoid future checks
            return;
        }
    
        try {
            // Update database with user interaction
            await db.collection('interactions').add({
                photoId: id,
                interactionType,
                userAddress,
            });
    
            // Increment likes or dislikes in the database based on interaction type
            const incrementAmount = increment(interactionType === 'like' ? 1 : -1);
            const editDocRef = db.collection('edits').doc(id);
            const fieldToUpdate = interactionType === 'like' ? 'likes' : 'dislikes';
    
            await editDocRef.update({ [fieldToUpdate]: incrementAmount });
    
            // Optimistically update the UI only after successful database update
            if (interactionType === 'like') {
                setLikes(likes + 1);
            } else {
                setDislikes(dislikes + 1);
            }
            setHasVoted(true); // Prevent further votes
        } catch (error) {
            console.error('Failed to record interaction:', error);
            // Optionally undo optimistic UI update here or handle error
        }
    };

    const formatIPFSLink = (ipfsUrl) => {
        if (!ipfsUrl) return '';
    
        // Assuming the URL is a direct link to the IPFS gateway
        const shortened = `${ipfsUrl.slice(0, 15)}...${ipfsUrl.slice(-5)}`;
        return shortened;
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
                <p><strong>Creator:</strong> {formatIPFSLink(entry.creator)}</p>
                <p><strong>Created At:</strong> {formattedDate}</p>
                <p><strong>ipfs:</strong> 
          <a href={entry.ipfsMetadata} target="_blank" rel="noopener noreferrer">
            {formatIPFSLink(entry.ipfsMetadata)}
          </a>
        </p>
                <div className= "viewer-interactions">
                    <button onClick={() => handleInteraction('like', entry.id)} style={{ backgroundColor: 'grey' }}>
                        👍 ({likes})
                    </button>
                    <button onClick={() => handleInteraction('dislike', entry.id)} style={{ backgroundColor: 'grey' }}>
                        👎 ({dislikes})
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Viewer;

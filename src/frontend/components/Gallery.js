import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { increment } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import HighQualityImage from './HighQualityImage';
import './Gallery.css';

const Gallery = ({ userAddress, nft }) => {
    const [entries, setEntries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastDoc, setLastDoc] = useState(null);
    const pageSize = 10;
    const navigate = useNavigate();
    const [isStanOwner, setStanOwner] = useState(false);

    const isMobile = window.innerWidth <= 768; 

    useEffect(() => {
        fetchEntries();
    }, [currentPage]);

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

    const fetchEntries = async () => {
      console.log("fetch is being called")
        let query = db.collection('edits')
          .orderBy('createdAt') // Make sure you have an index on this field
          .limit(pageSize);
    
        if (currentPage > 1 && lastDoc) {
          query = query.startAfter(lastDoc);
        }
    
        const snapshot = await query.get();
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEntries(docs);
        if (docs.length > 0) {
          // Set the lastDoc for the next page query
          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        }
      };

      const navigateToViewer = (entry) => {
        navigate(`/viewer/${entry.id}`, { state: { entry } });
    };

    const handleInteraction = async (event, id, interactionType) => {
         event.stopPropagation();
        // Check if user is authenticated with web3 wallet
        if (!userAddress) {
          alert("Please connect your web3 wallet to interact with edits.");
          return;
        }

        if (!isStanOwner) {
          alert("You must own a Stan to vote.");
          return;
        }
      
        const hasInteracted = await checkUserInteraction(id);
        if (hasInteracted) {
          alert("You have already voted for this post.");
          return;
        }
        // Optimistically update the UI
        const updatedEntries = entries.map(entry => {
          if (entry.id === id) {
            return {
              ...entry,
              likes: interactionType === 'like' ? (entry.likes || 0) + 1 : entry.likes,
              dislikes: interactionType === 'dislike' ? (entry.dislikes || 0) + 1 : entry.dislikes,
            };
          }
          return entry;
        });
        setEntries(updatedEntries);
      
        // Update database with user interaction
        await db.collection('interactions').add({
            photoId: id,
            interactionType,
            userAddress,
        });
      
        // Increment likes or dislikes in the database based on interaction type
        const incrementAmount = increment(1);
        const editDocRef = db.collection('edits').doc(id);
        
        if (interactionType === 'like') {
          await editDocRef.update({ likes: incrementAmount });
        } else if (interactionType === 'dislike') {
          await editDocRef.update({ dislikes: incrementAmount });
        }
      };

      const checkUserInteraction = async (photoId) => {
        const query = db.collection('interactions')
          .where('photoId', '==', photoId)
          .where('userAddress', '==', userAddress);
        const snapshot = await query.get();
        return !snapshot.empty;
      };
      

    // Handlers for pagination

    const nextPage = () => {
        setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        setCurrentPage(prev => prev > 1 ? prev - 1 : prev);
    };

    return (
        <div>
            <div className="text-center mb-4">
              <h2 className="title" style={{ fontFamily: 'Minecraftia', fontSize: '1.25rem', margin: '20px 0' }}>
                Stan Edits
              </h2>
            </div>
            <div className="text-center mb-4">
              <p className="gallery-description" style={{ fontFamily: 'Minecraftia', fontSize: '0.725rem', maxWidth: '600px' }}>
                Click an edit to view its details.
              </p>
              <p className="gallery-description" style={{ fontFamily: 'Minecraftia', fontSize: '0.725rem', maxWidth: '600px' }}>
                Stan holders get a vote (like or dislike) for each edit. Community favorites will be minted in a new collection with proceeds to creators.
              </p>
            </div>
            <div className="skins-grid">
                {entries.map(entry => (
                  <div key={entry.id} className="skin-card" onClick={() => navigateToViewer(entry)} >
                      {isMobile ? (
                        // Render standard image tag for mobile
                        <img
                          src={entry.firebaseImageUrl}
                          alt={entry.name}
                          className="skin-image"
                        />
                      ) : (
                          // Render HighQualityImage component for desktop
                          <HighQualityImage imageUrl={entry.firebaseImageUrl} scale={4.5} />
                      )}
                    <div className="skin-details">
                      <strong>{entry.name}</strong> {/* Name of entry */}
                      <div className="like-dislike-interactions">
                        <button
                          className="button-like" // Add class for consistency
                          onClick={(event) => handleInteraction(event, entry.id, 'like')}
                          style={{ backgroundColor: 'white' }} // Adjust as needed
                        >
                          👍 ({entry.likes || 0})
                        </button>
                        <button
                          className="button-dislike" // Add class for consistency
                          onClick={(event) => handleInteraction(event, entry.id, 'dislike')}
                          style={{ backgroundColor: 'white' }} // Adjust as needed
                        >
                          👎 ({entry.dislikes || 0})
                        </button>
                    </div>
                  </div>
            </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>{"<"}</button>
                 <span>{currentPage}</span>
                 <button onClick={nextPage} disabled={entries.length < pageSize}>{">"}</button>
            </div>
        </div>

    );
};

export default Gallery;








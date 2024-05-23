import React, { useState, useRef, useEffect, useCallback } from 'react';
import AvatarViewer from './AvatarViewer.js';
import './Uploader.css';
import axios from 'axios';
import {serverTimestamp } from "firebase/firestore";
import { db, storage } from '../../firebase.js';
import black from '../../frontend/components/Skins/blackSkin.png'

const pinataApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwZGYxYTRmOC1lZWEwLTRiODEtOTgwZi1iZDI4NGQ3M2ZhNGIiLCJlbWFpbCI6ImpsZWUzNDI0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwNzM2OGVmYTdhZWEzMDE1MGMxNSIsInNjb3BlZEtleVNlY3JldCI6IjVmZWRmMDA3YjNlZmRlYjZiODcyYTI1ZTQ2N2UzZDAzNjE3NWM1ODY4MjIyYWI2NDI0YmUzNWY1YmQ4ODkzNDYiLCJpYXQiOjE3MTM1MzU4MzJ9.fdW3B8HHFLfdj75Zbrvbw2cjBC3oCiX31Y0jdJsgpBA';

const avatars = [
  { skin: black, cape: null, description: 'Default' }
];

const Uploader = ({ account, factory }) => {
  const [originalImage, setOriginalImage] = useState(null);
  const [name, setName] = useState("");
  const [abv, setABV] = useState("SKN");
  const [supply, setSupply] = useState(1);
  const firstAvatar = avatars[0];

  const fileInputRef = useRef(null);

  useEffect(() => {
    console.log("account")
    console.log(account)
  }, [account]);
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
        alert("No file selected.");
        return;
    }

    if (file.type !== "image/png") {
        alert("The file must be a PNG image.");
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        console.log("File read as data URL:", e.target.result);  // Log the data URL
        setOriginalImage(e.target.result);
        console.log("State should be set but is asynchronous");
    };
    reader.onerror = () => {
        alert("Failed to read the file.");
    };
    reader.readAsDataURL(file);
  };
  
  const handleNameChange = (newName) => {
    setName(newName);
  };
  const handleSymbolChange = (newABV) => {
    console.log("handle abv")
    console.log(newABV)
    setABV(newABV);
  };
  
  const handleSupplyChange = (newSupply) => {
    console.log("handle supply")
    console.log(newSupply)
    setSupply(newSupply);
  };

  const [mintStatus, setMintStatus] = useState({
    message: '',
    visible: false,
    success: true
  });

  const updateMintStatus = (message, isSuccess) => {
    setMintStatus({
        message: message,
        visible: true,
        success: isSuccess
    });
  };

  const handleMint = async () => {
    if (!account) {
        alert("Connect a web3 wallet to begin creating.");
        return;
    }
    updateMintStatus('Processing...', false);
    try {
        console.log("original")
        console.log(originalImage)
        const file = dataURLtoFile(originalImage, 'edited-skin.png');
        const metadataUrl = await pinFileToIPFS(file);
        const {collectionAddress, collectionIndex} = await createCollection(name, abv, supply);
        await uploadCollectionToFirebase(file, metadataUrl, collectionAddress, supply, collectionIndex); // Now passing the collection address
    } catch (error) {
        updateMintStatus(`Error: ${error.message}`, false);
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length; // Ensure 'n' is declared with 'let' for modification
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  };

  const pinFileToIPFS = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const metadata = {
        name: name,
        creator: account,
        created: new Date().toISOString(),
        description: "nyskin.v1",
    };

    try {
        const imageResponse = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            headers: {
                'Authorization': `Bearer ${pinataApiKey}`
            }
        });
        metadata.image = `https://ipfs.io/ipfs/${imageResponse.data.IpfsHash}`;
        const metadataResponse = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', metadata, {
            headers: {
                'Authorization': `Bearer ${pinataApiKey}`
            }
        });
        return `https://ipfs.io/ipfs/${metadataResponse.data.IpfsHash}`;
    } catch (error) {
        console.error("Error uploading to Pinata:", error);
        updateMintStatus('Upload failed.', false);
        throw error;
    }
  };
  


  const createCollection = async (name, symbol, supply) => {
    updateMintStatus('Processing...', false);
    console.log("fire supply")
    console.log(supply)
    console.log(`Creating collection with name: ${name}, symbol: ${symbol}`);
    try {
        const tx = await factory.createCollection(name, symbol, supply);
        console.log("Transaction initiated:", tx.hash);
        console.log('Waiting for transaction to be mined...');
        const receipt = await tx.wait();

        console.log('Events emitted during transaction:', receipt.events);
        const collectionCreatedEvent = receipt.events.find(event => event.event === 'CollectionCreated');

        if (collectionCreatedEvent && collectionCreatedEvent.args) {
            const collectionAddress = collectionCreatedEvent.args.collectionAddress;
            console.log('Transaction mined, collection created at:', collectionAddress);

            // Assuming the factory contract instance is available here
            const collections = await factory.getCollections();
            const collectionIndex = collections.length - 1; // Zero-indexed position of the new collection

            console.log(`New collection is at index: ${collectionIndex} (1-based position: ${collectionIndex + 1})`);
            console.log("fire supply2")
            console.log(supply)
            return { collectionAddress, collectionIndex }; // Return both address and 1-based index
        } else {
            throw new Error("Transaction completed, but no 'CollectionCreated' event was emitted.");
        }
    } catch (error) {
        console.error('Failed to create collection:', error);
        updateMintStatus(`Error: ${error.message}`, false);
        throw error; // Re-throw to catch it in handleMint
    }
};

const uploadCollectionToFirebase = async (file, ipfsMetadata, collectionAddress, supply, collectionIndex) => {
  const effectiveName = name.trim() === "" || name === "Name (max char 20)" ? "random nyskin" : name;
  try {
      console.log("Attempting to upload edit to storage...");
      const storageRef = storage.ref();
      const timeStamp = new Date().getTime();
      const randomNum = Math.floor(Math.random() * 1000);
        const imageName = `image-${timeStamp}-${randomNum}`;
        const fileRef = storageRef.child(`skins/${imageName}`);
        await fileRef.put(file);
        const fileUrl = await fileRef.getDownloadURL();
        console.log("Attempting to upload edit to firestore...");
        const editsCollectionRef = db.collection('skins');
        const docRef = await editsCollectionRef.add({
            name: effectiveName, 
            creator: account,
            ipfsMetadata: ipfsMetadata,
            firebaseImageUrl: fileUrl,
            collectionAddress: collectionAddress, // Store the collection address
            likes: 0,
            dislikes: 0,
            mints: 0,
            supply: supply,
            createdAt: serverTimestamp(), 
            collectionIndex: collectionIndex
        });
        console.log("Document written with ID:", docRef.id);
        updateMintStatus("Success", true);
    } catch (error) {
       console.error("Error uploading edit to Firebase:", error);
        updateMintStatus('Upload failed.', false);
        throw error;
    }
  };  

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100" style={{ backgroundColor: 'white', paddingTop: '12px'}}>
        {!account ? (
            <div>
              <p className="connect">
                connect a web3 wallet to start creating
              </p>
            </div>
        ) : (
          <>
           </>
        )}
       <div className="text-center mb-4">
        <h1 className="title" style={{ fontFamily: 'Minecraftia', fontSize: '2rem', marginTop: '25px' }}>
          Uploader
        </h1>
        <p style={{ fontFamily: 'Minecraftia', fontSize: '0.85rem', marginTop: '5px' }}>
          Mint your skin to HYCHAIN
        </p>
      </div>
      <AvatarViewer
        key={firstAvatar.description} // Unique key for React list rendering
        skinUrl={ originalImage ?? firstAvatar.skin}
        capeUrl={firstAvatar.cape}
        autoRotate={false}
        // No navigation control for the Landing page
      />
        {!account ? (
            <div>
            </div>
        ) : (
          <>
            <div style={{ marginTop: '10px' }} >
              <input type="file" onChange={handleFileChange} style={{ display: 'none' }} ref={fileInputRef} />
              <button style={{ marginTop: '5px', fontFamily: 'Minecraftia', fontSize: '1.05em' }} onClick={() => fileInputRef.current.click()}>Upload Skin</button>
            </div>
            <div style={{ marginTop: '15px' }} >
            <input
              type="text"
              maxLength="20"
              placeholder="Model Name"
              onChange={(e) => handleNameChange(e.target.value)}  // Use the passed callback
              style={{ width: '60%', fontFamily: 'Minecraftia', fontSize: '14px' }}
            />
            </div>
            <div style={{ marginTop: '10px' }} >
              <input
                type="text"
                maxLength="4"
                placeholder="Symbol"
                onChange={(e) => handleSymbolChange(e.target.value)}  // Use the passed callback
                style={{ width: '60%', fontFamily: 'Minecraftia', fontSize: '14px' }}
              />
            </div>

            <div style={{ marginTop: '10px' }}>
              <input
                type="number"  // Correct type for numeric inputs
                maxLength="9"  // Note: maxLength does not work with input type number in some browsers
                placeholder="Supply"
                onChange={(e) => handleSupplyChange(Number(e.target.value))}  // Convert string to number here
                style={{ width: '60%', fontFamily: 'Minecraftia', fontSize: '14px' }}  // Increased font size for better readability
              />
            </div>
            <div style={{ marginTop: '2px' }}>
              <button className="mint-button" onClick={handleMint}>Mint</button>
              {mintStatus.visible && (
                <div className={`status-message ${mintStatus.success ? 'success' : 'error'}`}>
                  {mintStatus.message}
                </div>
              )}
            </div>  
            </>
        )}
    
    </div>
  );
};

export default Uploader;


import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Stage, Layer, Rect, Image as KonvaImage } from 'react-konva';
import ToolBar from './ToolBar.js';
import AvatarViewer from './AvatarViewer';
import SkinOverlay from './SkinOverlay.js';
import editStan from './Skins/jerry.png';
import skinGuide from './Skins/cut-out.jpg';
import './SkinEditor.css';
import axios from 'axios';
import {serverTimestamp } from "firebase/firestore";
import { db, storage } from '../../firebase.js';

const pinataApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwZGYxYTRmOC1lZWEwLTRiODEtOTgwZi1iZDI4NGQ3M2ZhNGIiLCJlbWFpbCI6ImpsZWUzNDI0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwNzM2OGVmYTdhZWEzMDE1MGMxNSIsInNjb3BlZEtleVNlY3JldCI6IjVmZWRmMDA3YjNlZmRlYjZiODcyYTI1ZTQ2N2UzZDAzNjE3NWM1ODY4MjIyYWI2NDI0YmUzNWY1YmQ4ODkzNDYiLCJpYXQiOjE3MTM1MzU4MzJ9.fdW3B8HHFLfdj75Zbrvbw2cjBC3oCiX31Y0jdJsgpBA';

const SkinEditor = ( { entry, imageData, account  }) => {
    const [color, setColor] = useState('#ffffff');
    const [originalImage, setOriginalImage] = useState(null);
    const [skinUrl, setSkinUrl] = useState(null);
    const [pixels, setPixels] = useState({});
    const [displayPixels, setDisplayPixels] = useState({});
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const scale = 8;
    const hiddenCanvasRef = useRef(null);
    const [name, setName] = useState("");
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [overlayImage, setOverlayImage] = React.useState(null);
    const [overlayOpacity, setOverlayOpacity] = useState(0.0);

    // Load and update canvas with new image data
    useEffect(() => {
        if (imageData) {
            setPixels({}); // Clear pixel data
            setDisplayPixels({}); // Clear display pixel data
            updateCanvas();
            const img = new Image();
            img.onload = () => {
                setOriginalImage(img);
                updateCanvas(img);
            };
            img.src = imageData;
        }
    }, [imageData]);

    useEffect(() => {
        const loadOverlayImage = () => {
          const img = new Image();
          img.src = skinGuide; 
          img.onload = () => setOverlayImage(img);
        };
    
        loadOverlayImage();
      }, []);

    useEffect(() => {
      const handleResize = () => setIsDesktop(window.innerWidth > 1024);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (originalImage) {
            const canvas = document.createElement('canvas');
            canvas.width = originalImage.width;
            canvas.height = originalImage.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(originalImage, 0, 0);
            hiddenCanvasRef.current = canvas;
            setSkinUrl(canvas.toDataURL());
        }
    }, [originalImage]);

    const updateCanvas = useCallback(() => {
        const ctx = hiddenCanvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, hiddenCanvasRef.current.width, hiddenCanvasRef.current.height);
        ctx.drawImage(originalImage, 0, 0);
    
        Object.entries(pixels).forEach(([key, value]) => {
            const [x, y] = key.split(',').map(Number);
            if (value !== 'transparent') {
                ctx.fillStyle = value;
                ctx.fillRect(x, y, 1, 1);
            } else {
                ctx.clearRect(x, y, 1, 1);
            }
        });
    
        setSkinUrl(hiddenCanvasRef.current.toDataURL());
    }, [originalImage, pixels]); // Dependencies based on what the function uses
    
    useEffect(() => {
        if (hiddenCanvasRef.current && originalImage) {
            updateCanvas();
        }
    }, [hiddenCanvasRef, originalImage, updateCanvas]);

    useEffect(() => {
        const initialImg = new Image();
        initialImg.src = editStan;
        initialImg.onload = () => setOriginalImage(initialImg);
    }, []);

    const handleFileChange = (file) => {
        if (!file) {
            alert("No file selected.");
            return;
        }
    
        // Check if the file type is PNG
        if (file.type !== "image/png") {
            alert("The file must be a PNG image.");
            return;
        }
    
        const reader = new FileReader();
        reader.onload = (e) => {
            const newImg = new Image();
            newImg.onload = () => {
                // Check the dimensions of the image
                if (newImg.width === 64 && newImg.height === 64) {
                    setPixels({}); // Clear pixel data
                    setDisplayPixels({}); // Clear display pixel data
                    updateCanvas();
                    setOriginalImage(newImg);
                } else {
                    alert("The image must be 64x64 pixels in size.");
                }
            };
            newImg.onerror = () => {
                alert("Invalid image. Please upload a valid PNG file.");
            };
            newImg.src = e.target.result;
        };
        reader.onerror = () => {
            alert("Failed to read the file.");
        };
        reader.readAsDataURL(file);
    };

    // Handler to update name from ToolBar
    const handleNameChange = (newName) => {
        setName(newName);
    };

    const pinFileToIPFS = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const metadata = {
            name: name,
            creator: account,
            created: new Date().toISOString(),
            description: "A custom skin edited with Stan Editor",
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
    
    
    const uploadEditToFirebase = async (file, ipfsMetadata) => {
        const effectiveName = name.trim() === "" || name === "Name (max char 20)" ? "Random Stan Edit" : name;
        try {
            console.log("Attempting to upload edit to storage...");
            // Upload file to Firebase Storage
            const storageRef = storage.ref();

            const timeStamp = new Date().getTime(); // Gets the current time in milliseconds
            const randomNum = Math.floor(Math.random() * 1000); // Generates a random number between 0 and 999
            const imageName = `image-${timeStamp}-${randomNum}`;
            const fileRef = storageRef.child(`edits/${imageName}`);
            await fileRef.put(file);
            const fileUrl = await fileRef.getDownloadURL(); // Get URL after uploading
    
            // Accessing Firestore
            console.log("Attempting to upload edit to firestore...");
            const editsCollectionRef = db.collection('edits');
            const docRef = await editsCollectionRef.add({
                name: effectiveName, 
                creator: account,
                ipfsMetadata: ipfsMetadata,
                firebaseImageUrl: fileUrl, // Store the URL from Firebase Storage
                likes: 0,
                dislikes: 0,
                createdAt:  serverTimestamp()
            });
            console.log("Document written with ID:", docRef.id);
            updateMintStatus("Success", true)
        } catch (error) {
            console.error("Error uploading edit to Firebase:", error);
            updateMintStatus('Upload failed.', false);
            throw error;
        }
    };
    
    const handleMint = async () => {
        updateMintStatus('Processing...', false);
        try {
            const file = dataURLtoFile(skinUrl, 'edited-skin.png');
            const metadataUrl = await pinFileToIPFS(file);
            await uploadEditToFirebase(file, metadataUrl);  // Upload to Firebase
            /*
            const result = await mintNFT(metadataUrl);  // Your minting logic
            */
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

    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        console.log("isDeleteMode")
        console.log(isDeleteMode)
        processInteraction(e);
    };
    
    const handleMouseUp = (e) => {
        processInteraction(e);
        setIsMouseDown(false);
        if (isDeleteMode) {
            updateCanvas(); // Force a redraw of the canvas to ensure all changes are rendered
        }
    };
    
    
    const handleMouseMove = (e) => {
        console.log("isDeleteMode")
        console.log(isDeleteMode)
        if (isMouseDown) {
            processInteraction(e);
        }
        
    };

    const handleMouseOut = () => {
        setIsMouseDown(false);
    };

    const toggleOverlayOpacity = () => {
        setOverlayOpacity(overlayOpacity === 0.0 ? 0.5 : 0.0);
    };

    const handlePixelInteraction = (x, y) => {
        const key = `${x},${y}`;
      //  setPixels(prev => ({ ...prev, [key]: color }));
        setDisplayPixels(prev => ({ ...prev, [key]: color }));
        const newColor = isDeleteMode ? 'transparent' : color;
        setPixels(prev => ({ ...prev, [key]: newColor }));
        setDisplayPixels(prev => ({ ...prev, [key]: newColor }));
    };

    const processInteraction = (e) => {
        if (isMouseDown) {
            const mousePos = e.target.getStage().getPointerPosition();
            const x = Math.floor(mousePos.x / scale);
            const y = Math.floor(mousePos.y / scale);
            handlePixelInteraction(x, y);
        }
    };

    if (!isDesktop) {
        return (
            <div className="no-editor">
                <h2 style={{ fontFamily: 'Minecraftia', fontSize: '1.25rem', margin: '20px 0' }}>Stan Editor</h2>
                <p style={{ fontFamily: 'Minecraftia', fontSize: '1.25rem', margin: '10px 0' }}>The editor is currently only for desktop.</p>
            </div>
        );
    }

    return (
        <div className="skin-editor">
            <h2 className="title" style={{ fontFamily: 'Minecraftia', fontSize: '1.25rem', margin: '20px 0' }}>
                Skin Editor (Beta)
            </h2>
            <p className="description" style={{ fontFamily: 'Minecraftia', fontSize: '0.75rem', maxWidth: '600px' }}>
                Select a color and click a pixel in the 2D skin to edit the color. See the changes in the 3D renderer on the left.
            </p>
            <div className="editor-container">
                <div className="avatar-container">
                    <AvatarViewer skinUrl={skinUrl} autoRotate={false} />
                </div>
                <div className="canvas-container">
                    {originalImage && (
                        <Stage 
                        width={originalImage.width * scale} 
                        height={originalImage.height * scale}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseOut}
                        onMouseMove={handleMouseMove}
                        >
                            <Layer imageSmoothingEnabled={false}>
                                <KonvaImage
                                    image={hiddenCanvasRef.current}
                                    width={originalImage.width}
                                    height={originalImage.height}
                                    scaleX={scale}
                                    scaleY={scale}
                                />
                                {overlayImage && <SkinOverlay image={overlayImage} opacity={overlayOpacity} />}
                                {[...Array(originalImage.height)].map((_, i) =>
                                    [...Array(originalImage.width)].map((_, j) => (
                                        <Rect
                                            key={`${i},${j}`}
                                            x={j * scale}
                                            y={i * scale}
                                            width={scale}
                                            height={scale}
                                            fill={displayPixels[`${j},${i}`] || 'transparent'}
                                          //  onMouseMove={() => handlePixelClick(j, i)}
                                           // onClick={() => handlePixelClick(j, i)}
                                            stroke="grey"
                                            strokeWidth={0.5}
                                        />
                                    ))
                                )}
                            </Layer>
                        </Stage>
                    )}
                </div>
                <ToolBar
                    color={color}
                    onColorChange={setColor}
                    isDeleteMode={isDeleteMode}
                    onToggleDeleteMode={setIsDeleteMode}
                    onUpload={handleFileChange}
                    onMint={handleMint}
                    mintStatus={mintStatus}
                    updateMintStatus={updateMintStatus} // Passing the update function
                    onTextFieldChange={handleNameChange}
                    onToggleOverlay={toggleOverlayOpacity} 
            />
            </div>
        </div>
    );
};

export default SkinEditor;









/*
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Stage, Layer, Rect, Image as KonvaImage } from 'react-konva';
import EditToolBar from './EditToolBar.js';
import AvatarViewer from './AvatarViewer';
import SkinOverlay from './SkinOverlay.js';
import jerry from './Skins/jerry.png';
import skinGuide from './Skins/cut-out.jpg';
import './SkinEditor.css';
import axios from 'axios';
import {serverTimestamp } from "firebase/firestore";
import { db, storage } from '../../firebase.js';
import nyskinABI from '../contractsData/nySkinNFTABI.json'
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';

const pinataApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwZGYxYTRmOC1lZWEwLTRiODEtOTgwZi1iZDI4NGQ3M2ZhNGIiLCJlbWFpbCI6ImpsZWUzNDI0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwNzM2OGVmYTdhZWEzMDE1MGMxNSIsInNjb3BlZEtleVNlY3JldCI6IjVmZWRmMDA3YjNlZmRlYjZiODcyYTI1ZTQ2N2UzZDAzNjE3NWM1ODY4MjIyYWI2NDI0YmUzNWY1YmQ4ODkzNDYiLCJpYXQiOjE3MTM1MzU4MzJ9.fdW3B8HHFLfdj75Zbrvbw2cjBC3oCiX31Y0jdJsgpBA';

const MintEditor = ( { account, ethereumProvider }) => {
    const [color, setColor] = useState('#ffffff');
    const [originalImage, setOriginalImage] = useState(null);
    const [skinUrl, setSkinUrl] = useState(null);
    const [pixels, setPixels] = useState({});
    const [displayPixels, setDisplayPixels] = useState({});
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const scale = 8;
    const hiddenCanvasRef = useRef(null);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [overlayImage, setOverlayImage] = React.useState(null);
    const [overlayOpacity, setOverlayOpacity] = useState(0.0);

    const location = useLocation();
    const { entry } = location.state || {};

    useEffect(() => {
        const stockImage = new Image();
        stockImage.src = jerry;
        stockImage.onload = () => {
            setOriginalImage(stockImage);
            updateCanvas(stockImage);
        };
        
        if (entry && entry.image) {
            const entryImage = new Image();
            entryImage.crossOrigin = "anonymous";  // Needed if the image is from a different origin
            entryImage.src = entry.image;
            entryImage.onload = () => {
                setOriginalImage(entryImage);
                updateCanvas(entryImage);
            };
        }
    }, [entry]);
    

    useEffect(() => {
        const loadOverlayImage = () => {
          const img = new Image();
          img.src = skinGuide; 
          img.onload = () => setOverlayImage(img);
        };
    
        loadOverlayImage();
      }, []);

    useEffect(() => {
      const handleResize = () => setIsDesktop(window.innerWidth > 1024);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (originalImage) {
            const canvas = document.createElement('canvas');
            canvas.width = originalImage.width;
            canvas.height = originalImage.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(originalImage, 0, 0);
            hiddenCanvasRef.current = canvas;
            setSkinUrl(canvas.toDataURL());
        }
    }, [originalImage]);

    const updateCanvas = useCallback(() => {
        if (!hiddenCanvasRef.current) {
            console.warn('Canvas not initialized');
            return;
        }
        const ctx = hiddenCanvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, hiddenCanvasRef.current.width, hiddenCanvasRef.current.height);
        ctx.drawImage(originalImage, 0, 0);
        // Rest of your drawing logic...
    }, [originalImage, pixels]);// Dependencies based on what the function uses
    
    useEffect(() => {
        if (hiddenCanvasRef.current && originalImage) {
            updateCanvas();
        }
    }, [hiddenCanvasRef, originalImage, updateCanvas]);

    useEffect(() => {
        const initialImg = new Image();
        initialImg.src = entry.image;
        initialImg.onload = () => setOriginalImage(initialImg);
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            alert("No file selected.");
            return;
        }
    
        // Check if the file type is PNG
        if (file.type !== "image/png") {
            alert("The file must be a PNG image.");
            return;
        }
    
        const reader = new FileReader();
        reader.onload = (e) => {
            const newImg = new Image();
            newImg.onload = () => {
                // Check the dimensions of the image
                if (newImg.width === 64 && newImg.height === 64) {
                    setPixels({}); // Clear pixel data
                    setDisplayPixels({}); // Clear display pixel data
                    updateCanvas();
                    setOriginalImage(newImg);
                } else {
                    alert("The image must be 64x64 pixels in size.");
                }
            };
            newImg.onerror = () => {
                alert("Invalid image. Please upload a valid PNG file.");
            };
            newImg.src = e.target.result;
        };
        reader.onerror = () => {
            alert("Failed to read the file.");
        };
        reader.readAsDataURL(file);
    };
    
    const pinFileToIPFS = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const metadata = {
            name: entry.name ?? "Random Edit",
            creator: entry.creator ?? "Random Creator",
            editor: account,
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
    
    const handleMint = async () => {
        if (!account) {
            alert("Connect a web3 wallet to begin creating.");
            return;
        }
        updateMintStatus('Processing...', false);
        try {
            const file = dataURLtoFile(skinUrl, 'edited-skin.png');
            const newURI = await pinFileToIPFS(file);
            await updateTokenURI(newURI);
            await uploadEditToFirebase(file, newURI); // Now passing the collection address
        } catch (error) {
            updateMintStatus(`Error: ${error.message}`, false);
        }
    };

    const updateTokenURI = async (newURI) => {
        if (!ethereumProvider || !entry) {
            alert("Ethereum provider or entry not set correctly.");
            return;
        }
        const signer = ethereumProvider.getSigner();
        const nftContract = new ethers.Contract(entry.collectionAddress, nyskinABI, signer);
        const transaction = await nftContract.setTokenURI(entry.tokenId, newURI);
        await transaction.wait();
        alert("Token URI updated successfully!");
    };

    const uploadEditToFirebase = async (file, newURI) => {
        const effectiveName = entry.name ?? "Random Nyskin";
        try {
            const imageToDelete = entry.firebaseImageUrl
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
            try {
                // Query Firestore to find the document with the matching collection address
                const querySnapshot = await editsCollectionRef.where('contractAddress', '==', entry.collectionAddress).get();
                // Check if any document matches the query
                if (querySnapshot.empty) {
                    throw new Error('No document found with the specified collection address.');
                }
                // Update the URI field of the matching document
                querySnapshot.forEach(async (doc) => {
                    await doc.ref.update({ 
                        ipfsMetadata: newURI,
                        firebaseImageUrl: fileUrl
                    });
                });
                console.log('Document URI updated successfully in Firebase.');
            } catch (error) {
                console.error('Error updating document URI in Firebase:', error.message);
                throw error; // Propagate the error to the caller
            }
            updateMintStatus("Success", true);
        } catch (error) {
            console.error("Error uploading edit to Firebase:", error);
            updateMintStatus('Upload failed.', false);
            throw error;
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

    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        console.log("isDeleteMode")
        console.log(isDeleteMode)
        processInteraction(e);
    };
    
    const handleMouseUp = (e) => {
        processInteraction(e);
        setIsMouseDown(false);
        if (isDeleteMode) {
            updateCanvas(); // Force a redraw of the canvas to ensure all changes are rendered
        }
    };
    
    
    const handleMouseMove = (e) => {
        console.log("isDeleteMode")
        console.log(isDeleteMode)
        if (isMouseDown) {
            processInteraction(e);
        }
        
    };

    const handleMouseOut = () => {
        setIsMouseDown(false);
    };

    const toggleOverlayOpacity = () => {
        setOverlayOpacity(overlayOpacity === 0.0 ? 0.5 : 0.0);
    };

    const handlePixelInteraction = (x, y) => {
        const key = `${x},${y}`;
        setDisplayPixels(prev => ({ ...prev, [key]: color }));
        const newColor = isDeleteMode ? 'transparent' : color;
        setPixels(prev => ({ ...prev, [key]: newColor }));
        setDisplayPixels(prev => ({ ...prev, [key]: newColor }));
    };

    const processInteraction = (e) => {
        if (isMouseDown) {
            const mousePos = e.target.getStage().getPointerPosition();
            const x = Math.floor(mousePos.x / scale);
            const y = Math.floor(mousePos.y / scale);
            handlePixelInteraction(x, y);
        }
    };

    const fileInputRef = useRef(null);

    const downloadButtonStyle = {
        marginTop: '5px',
        fontFamily: 'Minecraftia',
        fontSize: '1.05em'
    };

    if (!isDesktop) {
        return (
            <div className="no-editor">
                <h2 style={{ fontFamily: 'Minecraftia', fontSize: '1.25rem', margin: '20px 0' }}>welcome to nyskin</h2>
                <p style={{ fontFamily: 'Minecraftia', fontSize: '1.25rem', margin: '10px 0' }}>The editor is currently only for desktop.</p>
            </div>
        );
    }

    return (
        <div className="skin-editor">
            <h2 className="title" style={{ fontFamily: 'Minecraftia', fontSize: '1.25rem', margin: '20px 0' }}>
                 Skin Collection Creator (Beta)
            </h2>
            {!account ? (
                <div>
                    <p className="connect">
                        connect a web3 wallet to start creating
                    </p>
                </div>
            ) : (
                <>
                    <p className="description" style={{ fontFamily: 'Minecraftia', fontSize: '0.75rem', maxWidth: '600px' }}>
                        Select a color and click a pixel in the 2D skin to edit the color. See the changes in the 3D renderer on the left.
                    </p>
                    <div style={{ marginTop: '10px' }} >
                        <input type="file" onChange={handleFileChange} style={{ display: 'none' }} ref={fileInputRef} />
                        <button style={{ marginTop: '5px', fontFamily: 'Minecraftia', fontSize: '1.05em' }} onClick={() => fileInputRef.current.click()}>Upload Skin</button>
                    </div>
                </>
            )}
            <div className="editor-container">
                <div className="avatar-container">
                    <AvatarViewer skinUrl={skinUrl} autoRotate={false} />
                </div>
                <div className="canvas-container">
                    {originalImage && (
                        <Stage 
                        width={originalImage.width * scale} 
                        height={originalImage.height * scale}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseOut}
                        onMouseMove={handleMouseMove}
                        >
                            <Layer imageSmoothingEnabled={false}>
                                <KonvaImage
                                    image={hiddenCanvasRef.current}
                                    width={originalImage.width}
                                    height={originalImage.height}
                                    scaleX={scale}
                                    scaleY={scale}
                                />
                                {overlayImage && <SkinOverlay image={overlayImage} opacity={overlayOpacity} />}
                                {[...Array(originalImage.height)].map((_, i) =>
                                    [...Array(originalImage.width)].map((_, j) => (
                                        <Rect
                                            key={`${i},${j}`}
                                            x={j * scale}
                                            y={i * scale}
                                            width={scale}
                                            height={scale}
                                            fill={displayPixels[`${j},${i}`] || 'transparent'}
                                          //  onMouseMove={() => handlePixelClick(j, i)}
                                           // onClick={() => handlePixelClick(j, i)}
                                            stroke="grey"
                                            strokeWidth={0.5}
                                        />
                                    ))
                                )}
                            </Layer>
                        </Stage>
                    )}
                </div>
                <EditToolBar
                    color={color}
                    onColorChange={setColor}
                    isDeleteMode={isDeleteMode}
                    onToggleDeleteMode={setIsDeleteMode}
                    onUpload={handleFileChange}
                    onMint={handleMint}
                    mintStatus={mintStatus}
                    updateMintStatus={updateMintStatus} // Passing the update function
                    onToggleOverlay={toggleOverlayOpacity} 
            />
            </div>
            <p className="browser-warning">
                Note: Browser features such as ad blockers or privacy shields (like with Brave) may affect editor functionality. Please adjust settings if you experience issues.
            </p>
        </div>
    );
};

export default MintEditor;
*/
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Stage, Layer, Rect, Image as KonvaImage } from 'react-konva';
import ToolBar from './ToolBar.js';
import AvatarViewer from './AvatarViewer';
import editStan from './Skins/stan_to_edit.png';
import './SkinEditor.css';
import axios from 'axios';
import {serverTimestamp } from "firebase/firestore";
import { db, storage } from '../../firebase.js';

const pinataApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwZGYxYTRmOC1lZWEwLTRiODEtOTgwZi1iZDI4NGQ3M2ZhNGIiLCJlbWFpbCI6ImpsZWUzNDI0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwNzM2OGVmYTdhZWEzMDE1MGMxNSIsInNjb3BlZEtleVNlY3JldCI6IjVmZWRmMDA3YjNlZmRlYjZiODcyYTI1ZTQ2N2UzZDAzNjE3NWM1ODY4MjIyYWI2NDI0YmUzNWY1YmQ4ODkzNDYiLCJpYXQiOjE3MTM1MzU4MzJ9.fdW3B8HHFLfdj75Zbrvbw2cjBC3oCiX31Y0jdJsgpBA';

const SkinEditor = ( { account, nft }) => {
    const [color, setColor] = useState('#ffffff');
    const [originalImage, setOriginalImage] = useState(null);
    const [skinUrl, setSkinUrl] = useState(null);
    const [pixels, setPixels] = useState({});
    const [displayPixels, setDisplayPixels] = useState({});
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const scale = 8;
    const hiddenCanvasRef = useRef(null);
    const [isStanOwner, setStanOwner] = useState(false);
    const [name, setName] = useState("");
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

    useEffect(() => {
      const handleResize = () => setIsDesktop(window.innerWidth > 1024);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (account && nft.balanceOf) {
          const checkIfStanOwner = async () => {
            try {
              const balance = await nft.balanceOf(account);
              setStanOwner(balance > 0);
            } catch (error) {
            }
          };
          checkIfStanOwner();
        }
      }, [account, nft]);

    useEffect(() => {
        console.log('is this running omgg')
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

    const handlePixelClick = (x, y) => {
        const key = `${x},${y}`;
        const newColor = isDeleteMode ? 'transparent' : color;
        const displayColor = isDeleteMode ? 'white' : color;

        setPixels(prev => ({ ...prev, [key]: newColor }));
        setDisplayPixels(prev => ({ ...prev, [key]: displayColor }));
    };

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
    
    if (!isStanOwner) {
        return (
            <div className="no-editor">
                <h2 style={{ fontFamily: 'Minecraftia', fontSize: '1.25rem', margin: '20px 0' }}>Stan Editor</h2>
                <p style={{ fontFamily: 'Minecraftia', fontSize: '1.25rem', margin: '10px 0' }}>This editor is for Stan holders.</p>
            </div>
        );
    }

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
                Stan Editor
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
                        <Stage width={originalImage.width * scale} height={originalImage.height * scale}>
                            <Layer imageSmoothingEnabled={false}>
                                <KonvaImage
                                    image={hiddenCanvasRef.current}
                                    width={originalImage.width}
                                    height={originalImage.height}
                                    scaleX={scale}
                                    scaleY={scale}
                                />
                                {[...Array(originalImage.height)].map((_, i) =>
                                    [...Array(originalImage.width)].map((_, j) => (
                                        <Rect
                                            key={`${i},${j}`}
                                            x={j * scale}
                                            y={i * scale}
                                            width={scale}
                                            height={scale}
                                            fill={displayPixels[`${j},${i}`] || 'transparent'}
                                            onClick={() => handlePixelClick(j, i)}
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
            />
            </div>
        </div>
    );
};

export default SkinEditor;




/*
    const mintNFT = async (metadataUrl) => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const accounts = await provider.send('eth_accounts', []);
            const connectedAddress = accounts[0]; 
            const signer = provider.getSigner();
            const contract = new ethers.Contract(StanEditAddress.address, StanEditABI, signer);
            // Execute the minting
            const transaction = await contract.safeCheckMint(connectedAddress, metadataUrl); // Adding a buffer
            const receipt = await transaction.wait();
            console.log("Transaction Receipt: ", receipt);
            if (receipt && receipt.status === 1) {
                updateMintStatus("Success", true)
            } else {
                console.log("Rejected")
                updateMintStatus('Tx failed.', false);
            }
        } catch (error) {
            updateMintStatus('Tx failed.', false);
            console.error("Minting failed:", error);
            return { success: false, message: error.message };
        }
    };
*/




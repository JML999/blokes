import React, { useRef } from 'react';
import { SketchPicker } from 'react-color';
import downloadArt from './Skins/stan_to_download.png';
import './ToolBar.css';

const ToolBar = ({
    color,
    onColorChange,
    isDeleteMode,
    onToggleDeleteMode,
    onUpload,
    onMint,
    updateMintStatus, // Function to update mint status
    mintStatus,       // Status of minting to display message
    onTextFieldChange,
    onToggleOverlay
}) => {
    const fileInputRef = useRef(null);

    const paintButtonStyle = {
        backgroundColor: isDeleteMode ? undefined : 'lightblue',
        fontFamily: 'Minecraftia',
        fontSize: '1em'
    };
    const deleteButtonStyle = {
        backgroundColor: isDeleteMode ? 'lightcoral' : undefined,
        fontFamily: 'Minecraftia',
        fontSize: '1em',
        marginLeft: '3px'
    };
    const downloadButtonStyle = {
        marginTop: '5px',
        fontFamily: 'Minecraftia',
        fontSize: '0.75em'
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = downloadArt;
        link.download = 'stan_to_download.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            onUpload(file);
        }
    };

    const handleMint = async () => {
        updateMintStatus('Processing...', false);
        try {
            await onMint();
        } catch (error) {
            updateMintStatus(`Error: ${error.message}`, false);
        }
    };

    return (
        <div className="toolbar" style={{ marginTop: '25px' }}>
            <button style={paintButtonStyle} onClick={() => onToggleDeleteMode(false)}>Paint</button>
            <button style={deleteButtonStyle} onClick={() => onToggleDeleteMode(true)}>Delete</button>
            <div style={{marginTop: '4px', marginBottom:'4px'}} >
                <button className="key-button" onClick={onToggleOverlay}>Body Key</button>
            </div>
            <SketchPicker color={color} onChangeComplete={(color) => onColorChange(color.hex)} />
            <div style={{ marginTop: '10px' }}>
                <button style={downloadButtonStyle} onClick={handleDownload}>Download Stan Art</button>
            </div>
            <div>
                <input type="file" onChange={handleFileChange} style={{ display: 'none' }} ref={fileInputRef} />
                <button style={downloadButtonStyle} onClick={() => fileInputRef.current.click()}>Upload Art</button>
            </div>
            <div style={{ marginTop: '20px' }} >
                <input
                    type="text"
                    maxLength="20"
                    placeholder="Model Name"
                    onChange={(e) => onTextFieldChange(e.target.value)}  // Use the passed callback
                    style={{ width: '75%', fontFamily: 'Minecraftia', fontSize: 10 }}
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
        </div>
    );
};

export default ToolBar;











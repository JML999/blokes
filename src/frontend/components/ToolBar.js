import React, { useRef } from 'react';
import { SketchPicker } from 'react-color';
import downloadArt from './Skins/jerry_to_download.png';
import './ToolBar.css';

const ToolBar = ({
    color,
    onColorChange,
    isDeleteMode,
    onToggleDeleteMode,
    onMint,
    updateMintStatus, 
    mintStatus,       
    onTextFieldChange,
    onABVFieldChange,
    onSupplyFieldChange,
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
            <div style={{ marginTop: '15px' }} >
                <input
                    type="text"
                    maxLength="20"
                    placeholder="Model Name"
                    onChange={(e) => onTextFieldChange(e.target.value)}  // Use the passed callback
                    style={{ width: '60%', fontFamily: 'Minecraftia', fontSize: 10 }}
                />
            </div>
            <div style={{ marginTop: '10px' }} >
                <input
                    type="text"
                    maxLength="4"
                    placeholder="Symbol"
                    onChange={(e) => onABVFieldChange(e.target.value)}  // Use the passed callback
                    style={{ width: '60%', fontFamily: 'Minecraftia', fontSize: 10 }}
                />
            </div>
            <div style={{ marginTop: '10px' }}>
                <input
                    type="number"  // Correct type for numeric inputs
                    maxLength="9"  // Note: maxLength does not work with input type number in some browsers
                    placeholder="Supply"
                    onChange={(e) => onSupplyFieldChange(Number(e.target.value))}  // Convert string to number here
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
        </div>
    );
};

export default ToolBar;











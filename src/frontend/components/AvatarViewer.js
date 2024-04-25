import React, { useEffect } from 'react';
import ReactSkinview3d from 'react-skinview3d';

const AvatarViewer = ({ skinUrl, capeUrl, autoRotate = true }) => {
  useEffect(() => {
    return () => {
      console.log("AvatarViewer unmounting. Clean up resources here.");
      // Here you would clean up any manual WebGL contexts, animations, or event listeners.
    };
  }, [skinUrl, capeUrl]); // This effect depends on skinUrl and capeUrl and will re-run when they change.

  return (
    <ReactSkinview3d
      className="viewer"
      skinUrl={skinUrl}
      capeUrl={capeUrl || undefined} // Ensure capeUrl is undefined if not provided, so the viewer knows not to render a cape.
      height={300}
      width={150}
      onReady={({ viewer }) => {
        viewer.autoRotate = autoRotate;
        // Additional setup can be done here if needed.
      }}
    />
  );
};

export default AvatarViewer;

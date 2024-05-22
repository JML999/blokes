import React, { useRef, useEffect } from 'react';
import ReactSkinview3d from 'react-skinview3d';

const AvatarViewer = ({ skinUrl, capeUrl, autoRotate = true, initialYaw }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.viewer.yaw = initialYaw;  // Set initial yaw rotation
    }
  }, [initialYaw]);
  
  return (
    <ReactSkinview3d
      className="viewer"
      skinUrl={skinUrl}
      capeUrl={capeUrl || undefined} 
      height={300}
      width={150}
      onReady={({ viewer }) => {
        viewer.autoRotate = autoRotate;
      }}
    />
  );
};

export default AvatarViewer;

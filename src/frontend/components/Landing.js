import React, { useEffect, useState } from 'react';
import AvatarViewer from './AvatarViewer'; // Adjust the import path as needed
import newStan from './Skins/stan_new_edit.png';

// Assuming your avatars' array is either passed as props or defined here
const avatars = [
  { skin: newStan, cape: null, description: 'Default' }
];

const Landing = () => {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      if (!canvas.getContext('webgl') && !canvas.getContext('experimental-webgl')) {
        throw new Error('WebGL not supported');
      }
    } catch (error) {
      console.error("WebGL not supported:", error);
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return <div>WebGL is not supported by your browser.</div>;
  }

  // For the landing page, we're just showing the first avatar in the array
  const firstAvatar = avatars[0];

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100" style={{ backgroundColor: 'white', paddingTop: '80px'}}>
      <AvatarViewer
        key={firstAvatar.description} // Unique key for React list rendering
        skinUrl={firstAvatar.skin}
        capeUrl={firstAvatar.cape}
        // No navigation control for the Landing page
      />
    </div>
  );
};

export default Landing;


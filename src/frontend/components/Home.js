import React, { useState } from 'react';
import './fonts.css';
import AvatarViewer from './AvatarViewer';
import { avatars } from './skans';


const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % avatars.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + avatars.length) % avatars.length);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100" style={{ backgroundColor: 'white' }}>
      <div className="text-center mb-4">
        <h2 className="title" style={{ fontFamily: 'Minecraftia', fontSize: '1.25rem', margin: '20px 0' }}>
          Stan Edits: The Official Stan Skin Collection
        </h2>
        <p className="description" style={{ fontFamily: 'Minecraftia', fontSize: '0.75rem', maxWidth: '600px' }}>
          Each holder has access to their 1 of 500 Default avatar on HYTOPIA, as well as a community-created library of downloadable skins. Community favorites will be minted in a new collection with proceeds to creators.
        </p>
      </div>

      {/* Viewer Container with fixed size */}
      <div style={{ width: '150px', height: '300px', backgroundColor: 'white', marginBottom: '40px' }}>
        <AvatarViewer
          key={currentIndex + (avatars[currentIndex].cape ? "-cape" : "")} // Key change forces React to remount the component, ensuring cleanup
          skinUrl={avatars[currentIndex].skin}
          capeUrl={avatars[currentIndex].cape || undefined}
          autoRotate={true}
        />
      </div>

      <div className="d-flex align-items-center">
        <button onClick={handlePrev} style={{ fontFamily: 'Minecraftia', fontSize: '1rem', padding: '10px 20px', marginRight: '10px' }}>- Prev</button>
        <p className="token-title" style={{ fontFamily: 'Minecraftia', fontSize: '0.8rem', margin: '0 10px' }}>
          {avatars[currentIndex].description}
        </p>
        <button onClick={handleNext} style={{ fontFamily: 'Minecraftia', fontSize: '1rem', padding: '10px 20px', marginLeft: '10px' }}>Next +</button>
      </div>
    </div>
  );
};

export default Home;



/*





*/



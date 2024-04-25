import React from 'react';
import { Image as KonvaImage } from 'react-konva';

const SkinOverlay = ({ image, opacity }) => {
  return (
    <KonvaImage
      image={image}
      x={0}
      y={0}
      width={image.width * 1.11}
      height={image.height * 1.11}
      opacity={opacity}
      listening={false} // This makes the overlay non-interactive
    />
  );
};

export default SkinOverlay;
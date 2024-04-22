import React, { useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

const HighQualityImage = ({ imageUrl, scale = 8 }) => {
    const [image] = useImage(imageUrl);
    const [canvasImage, setCanvasImage] = useState(null);

    useEffect(() => {
        if (image) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = image.width * scale;
            canvas.height = image.height * scale;
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            setCanvasImage(canvas);
        }
    }, [image, scale]);

    if (!canvasImage) {
        return null;
    }

    return (
        <Stage width={canvasImage.width} height={canvasImage.height}>
            <Layer>
                <KonvaImage image={canvasImage} />
            </Layer>
        </Stage>
    );
};

export default HighQualityImage;

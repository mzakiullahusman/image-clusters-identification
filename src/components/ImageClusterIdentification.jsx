import { useEffect, useRef, useState } from "react";
import { kmeans } from "ml-kmeans";
import PropTypes from "prop-types";

const ImageClusterIdentification = ({ imagePath, k }) => {
  const canvasRef = useRef(null);
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const extractPalette = async () => {
      try {
        const img = new Image();
        img.onload = () => {
          // Set canvas dimensions
          setCanvasDimensions({ width: img.width, height: img.height });
          setImageLoaded(true);

          // Call performKMeans with a callback for drawing
          performKMeans(getPixelData(img), img, drawClusteredImage);
        };
        img.src = imagePath;
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const performKMeans = async (data, img, drawCallback) => {
      try {
        const result = await kmeans(data, k);
        drawCallback(result, data, img);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const getPixelData = (img) => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const pixelData = [];
      for (let i = 0; i < imageData.data.length; i += 4) {
        pixelData.push([
          imageData.data[i],
          imageData.data[i + 1],
          imageData.data[i + 2],
        ]);
      }
      return pixelData;
    };

    const drawClusteredImage = (result, data, img) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Draw the image as the background
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw each pixel with its cluster color
      data.forEach((pixel, index) => {
        const clusterIndex = result.clusters[index];
        const clusterColor = result.centroids[clusterIndex];
        ctx.fillStyle = `rgb(${clusterColor.join(",")})`;
        ctx.fillRect(
          index % canvas.width,
          Math.floor(index / canvas.width),
          1,
          1
        );
      });
    };

    extractPalette();
  }, [imagePath, k, imageLoaded]);

  return (
    <>
      <div>
        <h3>Resultant Image, k = {k}:</h3>
        {imageLoaded ? (
          <canvas
            ref={canvasRef}
            width={canvasDimensions.width}
            height={canvasDimensions.height}
          />
        ) : (
          <p>Processing...</p>
        )}
      </div>
    </>
  );
};

ImageClusterIdentification.propTypes = {
  imagePath: PropTypes.string.isRequired, // Validate imagePath as a required string
  k: PropTypes.number.isRequired, // Validate k as a required number
};

export default ImageClusterIdentification;

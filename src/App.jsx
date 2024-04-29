import { useState } from "react";
import "./App.css";
import ImageClusterIdentification from "./components/ImageClusterIdentification";

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [k, setK] = useState(3); // Initial value of k

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const incrementK = () => {
    setK((prevK) => prevK + 1);
  };

  const decrementK = () => {
    if (k > 1) {
      setK((prevK) => prevK - 1);
    }
  };

  return (
    <div>
      <h2>
        Image Cluster <br /> Identification
      </h2>
      <p>Select the value of k</p>
      <div>
        <button onClick={decrementK}>-</button>
        <span>k = {k}</span>
        <button onClick={incrementK}>+</button>
      </div>
      <br />
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      {uploadedImage && (
        <ImageClusterIdentification imagePath={uploadedImage} k={k} />
      )}
    </div>
  );
}

export default App;

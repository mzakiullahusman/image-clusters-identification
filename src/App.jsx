import { useState } from "react";
import "./App.css";
import ImageClusterIdentification from "./components/ImageClusterIdentification";

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [k, setK] = useState(3); // Initial value of k
  const [showComparison, setShowComparison] = useState(false);

  const handleImageUpload = (event) => {
    setUploadedImage(null);
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUploadedImage(reader.result);
      setShowComparison(false);
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

  const toggleComparison = () => {
    setShowComparison((prevState) => !prevState);
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
        <>
          <ImageClusterIdentification
            imagePath={uploadedImage}
            k={k}
            showComparison={showComparison}
          />
          <br />
          <button onClick={toggleComparison}>
            {showComparison ? "Hide Original" : "Show Original"}
          </button>
        </>
      )}
      <br />
      <br />
      <br />
      <a
        href="https://github.com/mzakiullahusman/image-clusters-identification"
        target="_blank"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.25rem",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="GitHub"
            width="30"
            height="30"
          />
          <p>Consider Starring the Repo if You Found It Useful</p>
        </div>
      </a>
      <p>Created by: Muhammad Zakiullah Usman</p>
    </div>
  );
}

export default App;

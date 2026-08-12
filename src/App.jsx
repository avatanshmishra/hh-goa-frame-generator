import React, { useEffect, useRef, useState } from "react";
import {
  Download,
  ImagePlus,
  RotateCcw,
  Share2,
  Upload,
} from "lucide-react";
import heic2any from "heic2any";

import { generateCard } from "./utils/generateCard";

const titles = {
  "AI / ML": [
    "MODEL WHISPERER",
    "NEURAL NOMAD",
    "PROMPT ALCHEMIST",
  ],

  Frontend: [
    "PIXEL ARCHITECT",
    "INTERFACE BUILDER",
    "UI SHAPESHIFTER",
  ],

  Backend: [
    "API ALCHEMIST",
    "SERVER BUILDER",
    "LOGIC HACKER",
  ],

  "Full Stack": [
    "PRODUCT HACKER",
    "STACK SURFER",
    "SHIP MACHINE",
  ],

  Blockchain: [
    "CHAIN BUILDER",
    "LEDGER HACKER",
    "BLOCK EXPLORER",
  ],

  Cybersecurity: [
    "DIGITAL GUARDIAN",
    "THREAT HUNTER",
    "SECURITY BUILDER",
  ],

  "Hardware / Robotics": [
    "HARDWARE HACKER",
    "CIRCUIT TINKERER",
    "ROBOT WRANGLER",
  ],
};

function App() {
  const canvasRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [stack, setStack] = useState("AI / ML");
  const [title, setTitle] = useState("MODEL WHISPERER");
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    updateCard();
  }, [photo, name, stack, title]);

  async function convertFile(file) {
    const isHEIC =
      file.type === "image/heic" ||
      file.type === "image/heif" ||
      file.name.toLowerCase().endsWith(".heic") ||
      file.name.toLowerCase().endsWith(".heif");

    if (!isHEIC) {
      return file;
    }

    const converted = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.9,
    });

    return Array.isArray(converted)
      ? converted[0]
      : converted;
  }

  async function handleImage(file) {
    if (!file) {
      return;
    }

    try {
      const converted = await convertFile(file);
      const url = URL.createObjectURL(converted);

      setPhoto({
        url,
        file: converted,
      });
    } catch (error) {
      console.error("Image loading failed:", error);
      alert("Could not load this image.");
    }
  }

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (file) {
      handleImage(file);
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files[0];

    if (file) {
      handleImage(file);
    }
  }

  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = () => resolve(image);
      image.onerror = reject;

      image.src = url;
    });
  }

  async function updateCard() {
    if (!photo || !canvasRef.current) {
      return;
    }

    try {
      const image = await loadImage(photo.url);

      generateCard(canvasRef.current, {
        image,
        name: name || "YOUR NAME",
        stack,
        title,
      });
    } catch (error) {
      console.error("Card generation failed:", error);
    }
  }

  function regenerateTitle() {
    const list = titles[stack];

    const random =
      list[Math.floor(Math.random() * list.length)];

    setTitle(random);
  }

  function downloadCard() {
    if (!canvasRef.current || !photo) {
      return;
    }

    canvasRef.current.toBlob((blob) => {
      if (!blob) {
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "FrameInGoa-2026.png";

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    }, "image/png");
  }

  async function shareToX() {
  if (!canvasRef.current || !photo) {
    return;
  }

  try {
    const blob = await new Promise((resolve) => {
      canvasRef.current.toBlob(resolve, "image/png");
    });

    if (!blob) {
      throw new Error("Canvas image could not be created.");
    }

    const cloudName =
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const uploadPreset =
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    console.log("Cloud name:", cloudName);
    console.log("Upload preset:", uploadPreset);
    console.log("Blob:", blob);

    if (!cloudName) {
      throw new Error(
        "VITE_CLOUDINARY_CLOUD_NAME is missing."
      );
    }

    if (!uploadPreset) {
      throw new Error(
        "VITE_CLOUDINARY_UPLOAD_PRESET is missing."
      );
    }

    const formData = new FormData();

    formData.append(
      "file",
      blob,
      "FrameInGoa-2026.png"
    );

    formData.append(
      "upload_preset",
      uploadPreset
    );

    const uploadUrl =
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    console.log("Cloudinary response:", data);

    if (!response.ok) {
      throw new Error(
        data.error?.message ||
        "Cloudinary upload failed."
      );
    }

    const imageUrl = data.secure_url;

    const postText =
      `Building my identity at Hacker House Goa 2026 🌴 #FrameInGoa ${imageUrl}`;

    const xUrl =
      "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent(postText);

    window.open(
      xUrl,
      "_blank",
      "noopener,noreferrer"
    );

  } catch (error) {
    console.error("X sharing failed:", error);

    alert(
      "Could not prepare the card for X.\n\n" +
      error.message
    );
  }
}

  return (
    <div className="app">
      <header className="header">
        <div className="studio">
          <span>2:47 PM</span>
          <strong>STUDIO</strong>
        </div>

        <div className="date">
          GOA · 2026
        </div>
      </header>

      <section className="hero">
        <p className="event-info">
          HACKER HOUSE · GOA · 28—31 OCT 2026
        </p>

        <h1>
          HACKER
          <br />
          HOUSE
        </h1>

        <div className="goa">
          गोवा
        </div>

        <p className="description">
          Create your builder identity
          for Hacker House Goa 2026.
        </p>
      </section>

      <main className="workspace">
        <section className="editor">
          <div className="section-title">
            <span>01</span>
            <h2>BUILD YOUR CARD</h2>
          </div>

          <label className="field-label">
            PROFILE PHOTO
          </label>

          <label
            className={`upload-box ${
              dragging ? "dragging" : ""
            }`}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => {
              setDragging(false);
            }}
            onDrop={handleDrop}
          >
            {photo ? (
              <img
                src={photo.url}
                alt="Uploaded profile"
                className="uploaded-image"
              />
            ) : (
              <div className="upload-content">
                <ImagePlus size={40} />

                <strong>
                  DROP YOUR PHOTO
                </strong>

                <span>
                  JPG · PNG · HEIC
                </span>
              </div>
            )}

            <input
              type="file"
              accept="image/jpeg,image/png,image/heic,image/heif,.heic,.heif"
              onChange={handleFileChange}
            />

            <div className="upload-button">
              <Upload size={15} />
              {photo ? "CHANGE" : "UPLOAD"}
            </div>
          </label>

          <div className="form-group">
            <label className="field-label">
              NAME
            </label>

            <input
              value={name}
              maxLength={28}
              placeholder="Your name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label className="field-label">
              WHAT DO YOU BUILD?
            </label>

            <select
              value={stack}
              onChange={(event) => {
                const selectedStack = event.target.value;

                setStack(selectedStack);
                setTitle(titles[selectedStack][0]);
              }}
            >
              {Object.keys(titles).map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="builder-title">
            <div>
              <label className="field-label">
                BUILDER TITLE
              </label>

              <strong>
                {title}
              </strong>
            </div>

            <button
              type="button"
              onClick={regenerateTitle}
              aria-label="Generate another title"
            >
              <RotateCcw size={18} />
            </button>
          </div>

          <div className="actions">
            <button
              type="button"
              className="download-button"
              disabled={!photo}
              onClick={downloadCard}
            >
              <Download size={18} />
              DOWNLOAD CARD
            </button>

            <button
              type="button"
              className="share-button"
              disabled={!photo}
              onClick={shareToX}
            >
              <Share2 size={18} />
              SHARE TO X
            </button>
          </div>

          <p className="privacy">
            No account required. Your photo stays
            in your browser.
          </p>
        </section>

        <section className="preview">
          <div className="section-title">
            <span>02</span>
            <h2>LIVE PREVIEW</h2>
          </div>

          <div className="canvas-container">
            <canvas
              ref={canvasRef}
              width="1080"
              height="1080"
            />

            {!photo && (
              <div className="empty-preview">
                <strong>YOUR CARD</strong>

                <span>
                  Upload a photo to begin
                </span>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer>
        <span>HACKER HOUSE GOA 2026</span>
        <span>#FrameInGoa</span>
      </footer>
    </div>
  );
}

export default App;
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

        <div className="scenery">
          <svg viewBox="0 0 1200 560" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice">
            {/* sun rays */}
            <g stroke="#ffd600" strokeWidth="5" strokeLinecap="round">
              <line x1="600" y1="70" x2="600" y2="115" />
              <line x1="600" y1="70" x2="600" y2="115" transform="rotate(30 600 260)" />
              <line x1="600" y1="70" x2="600" y2="115" transform="rotate(60 600 260)" />
              <line x1="600" y1="70" x2="600" y2="115" transform="rotate(-30 600 260)" />
              <line x1="600" y1="70" x2="600" y2="115" transform="rotate(-60 600 260)" />
              <line x1="600" y1="55" x2="600" y2="105" transform="rotate(15 600 260)" />
              <line x1="600" y1="55" x2="600" y2="105" transform="rotate(-15 600 260)" />
              <line x1="600" y1="55" x2="600" y2="105" transform="rotate(45 600 260)" />
              <line x1="600" y1="55" x2="600" y2="105" transform="rotate(-45 600 260)" />
              <line x1="600" y1="55" x2="600" y2="105" transform="rotate(75 600 260)" />
              <line x1="600" y1="55" x2="600" y2="105" transform="rotate(-75 600 260)" />
            </g>

            {/* sun */}
            <circle cx="600" cy="260" r="95" fill="#ffd600" />

            {/* hills */}
            <ellipse cx="150" cy="320" rx="220" ry="60" fill="#1a8a5c" opacity="0.45" />
            <ellipse cx="1060" cy="320" rx="220" ry="60" fill="#1a8a5c" opacity="0.45" />

            {/* boat */}
            <g transform="translate(210,305)">
              <path d="M-25,10 L25,10 L15,20 L-15,20 Z" fill="#f7f1d4" />
              <line x1="0" y1="10" x2="0" y2="-14" stroke="#f7f1d4" strokeWidth="2" />
            </g>

            {/* water */}
            <path d="M0,300 L1200,300 L1200,400 L0,400 Z" fill="#004d2c" />
            <g stroke="#ffd600" strokeWidth="3" opacity="0.55" strokeLinecap="round">
              <line x1="520" y1="315" x2="680" y2="315" />
              <line x1="540" y1="332" x2="660" y2="332" />
              <line x1="500" y1="349" x2="700" y2="349" />
              <line x1="530" y1="366" x2="670" y2="366" />
              <line x1="470" y1="383" x2="730" y2="383" />
            </g>
            <g stroke="#f7f1d4" strokeWidth="2" opacity="0.35" fill="none">
              <path d="M0,330 Q50,320 100,330 T200,330 T300,330 T400,330 T500,330" />
              <path d="M700,330 Q750,320 800,330 T900,330 T1000,330 T1100,330 T1200,330" />
              <path d="M0,360 Q50,350 100,360 T200,360 T300,360 T400,360 T500,360" />
              <path d="M700,360 Q750,350 800,360 T900,360 T1000,360 T1100,360 T1200,360" />
            </g>

            {/* sand */}
            <path d="M0,395 Q150,380 300,400 T600,395 T900,400 T1200,392 L1200,560 L0,560 Z" fill="#f7f1d4" />

            {/* houses row */}
            <g>
              {/* house 1 */}
              <rect x="70" y="460" width="150" height="100" fill="#ffffff" stroke="#006b3f" strokeWidth="3" />
              <polygon points="55,460 145,405 235,460" fill="#006b3f" />
              <rect x="95" y="500" width="30" height="30" fill="#004d2c" />
              <rect x="160" y="500" width="30" height="30" fill="#ffd600" />

              {/* house 2 */}
              <rect x="250" y="475" width="130" height="85" fill="#ffffff" stroke="#006b3f" strokeWidth="3" />
              <polygon points="238,475 315,430 392,475" fill="#ff1493" />
              <circle cx="285" cy="510" r="14" fill="#006b3f" />
              <rect x="330" y="505" width="25" height="30" fill="#004d2c" />

              {/* beach bar */}
              <g transform="translate(560,420)">
                <rect x="0" y="40" width="160" height="90" fill="#ffffff" stroke="#006b3f" strokeWidth="3" />
                <polygon points="-15,40 80,0 175,40" fill="#006b3f" />
                <rect x="20" y="-8" width="120" height="26" rx="4" fill="#ff1493" />
                <rect x="30" y="-4" width="100" height="16" fill="none" stroke="#ffd600" strokeWidth="2" />
                <rect x="15" y="70" width="130" height="10" fill="#004d2c" />
                <circle cx="30" cy="95" r="6" fill="#006b3f" />
                <line x1="30" y1="95" x2="30" y2="115" stroke="#006b3f" strokeWidth="3" />
                <circle cx="60" cy="95" r="6" fill="#006b3f" />
                <line x1="60" y1="95" x2="60" y2="115" stroke="#006b3f" strokeWidth="3" />
                {/* surfboards */}
                <ellipse cx="180" cy="90" rx="8" ry="45" fill="#ffd600" transform="rotate(-8 180 90)" />
                <ellipse cx="195" cy="92" rx="7" ry="42" fill="#ff1493" transform="rotate(6 195 92)" />
              </g>

              {/* house 4 */}
              <rect x="800" y="470" width="140" height="90" fill="#ffffff" stroke="#006b3f" strokeWidth="3" />
              <polygon points="788,470 870,420 952,470" fill="#ffd600" />
              <rect x="825" y="505" width="28" height="28" fill="#ff1493" />
              <rect x="885" y="505" width="28" height="28" fill="#004d2c" />

              {/* house 5 */}
              <rect x="960" y="480" width="150" height="80" fill="#ffffff" stroke="#006b3f" strokeWidth="3" />
              <polygon points="948,480 1035,435 1122,480" fill="#006b3f" />
              <circle cx="1000" cy="515" r="13" fill="#ff1493" />
              <rect x="1045" y="512" width="26" height="28" fill="#004d2c" />
            </g>

            {/* umbrellas + loungers */}
            <g transform="translate(180,430)">
              <path d="M-45,0 A45,30 0 0 1 45,0 Z" fill="#ffd600" />
              <path d="M-45,0 A45,30 0 0 1 -15,-6 L-15,0 Z" fill="#f7f1d4" />
              <path d="M15,-6 A45,30 0 0 1 45,0 L15,0 Z" fill="#f7f1d4" />
              <line x1="0" y1="0" x2="0" y2="60" stroke="#006b3f" strokeWidth="4" />
              <rect x="-40" y="55" width="80" height="6" fill="#006b3f" />
              <line x1="-30" y1="61" x2="-30" y2="75" stroke="#006b3f" strokeWidth="4" />
              <line x1="30" y1="61" x2="30" y2="75" stroke="#006b3f" strokeWidth="4" />
            </g>
            <g transform="translate(340,440)">
              <path d="M-42,0 A42,28 0 0 1 42,0 Z" fill="#ff1493" />
              <path d="M-42,0 A42,28 0 0 1 -14,-6 L-14,0 Z" fill="#f7f1d4" />
              <path d="M14,-6 A42,28 0 0 1 42,0 L14,0 Z" fill="#f7f1d4" />
              <line x1="0" y1="0" x2="0" y2="55" stroke="#006b3f" strokeWidth="4" />
              <rect x="-36" y="50" width="72" height="6" fill="#006b3f" />
            </g>

            {/* palm trees */}
            {[
              { x: 90, scale: 1, flip: 1 },
              { x: 1110, scale: 1.1, flip: -1 },
            ].map((p, i) => (
              <g key={i} transform={`translate(${p.x},560) scale(${p.scale * p.flip},${p.scale})`}>
                <path
                  d="M0,0 C10,-120 -20,-220 5,-320"
                  fill="none"
                  stroke="#004d2c"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <g transform="translate(5,-320)">
                  {[-70, -35, 0, 35, 70, -50, 50].map((ang, j) => (
                    <path
                      key={j}
                      d="M0,0 C30,-15 70,-5 95,15 C60,10 25,15 0,0 Z"
                      fill="#006b3f"
                      transform={`rotate(${ang})`}
                    />
                  ))}
                </g>
              </g>
            ))}

            {/* people */}
            <g fill="#ffffff">
              <circle cx="130" cy="480" r="7" />
              <rect x="126" y="487" width="8" height="28" rx="3" />
              <circle cx="1080" cy="490" r="7" />
              <rect x="1076" y="497" width="8" height="28" rx="3" />
            </g>
          </svg>
        </div>
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
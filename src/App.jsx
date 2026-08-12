import React from "react";

function App() {
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

          <div className="placeholder">
            PHOTO UPLOAD
          </div>

          <div className="placeholder">
            YOUR NAME
          </div>

          <div className="placeholder">
            WHAT DO YOU BUILD?
          </div>

          <button className="primary-button">
            CREATE CARD
          </button>

        </section>


        <section className="preview">

          <div className="section-title">
            <span>02</span>
            <h2>LIVE PREVIEW</h2>
          </div>

          <div className="preview-card">

            <span>
              YOUR CARD
            </span>

            <small>
              Upload a photo to begin
            </small>

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
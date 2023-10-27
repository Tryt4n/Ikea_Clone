import React from "react";
import "./index.scss";

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <div className="not-found__ufo-container">
        <video
          src="/client/public/video/ufo.2d5c35ab6c116cc323bb.mp4"
          autoPlay
          muted
          playsInline
        />
      </div>
      <div>
        <h2>Ups... Coś poszło nie tak!</h2>
        <p>Strona której szukasz niestety nie istnieje.</p>
        <p>Spróbuj po linkiem poniżej.</p>
        <a href="/">Wróć do strony głównej IKEA</a>
      </div>
    </div>
  );
}

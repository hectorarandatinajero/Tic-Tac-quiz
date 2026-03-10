import { useEffect, useRef } from "react";
import type { TiktakType } from "../types";

/* NUEVO: importar logos */
import appleMusic from "../assets/Applemusic.png";
import spotify from "../assets/Spotify.png";


import ROP_ORANGE from "../assets/ROP/ROP naranja.gif";
import ROP_STRAWBERRY from "../assets/ROP/ROP fresa.gif"
import ROP_FRUIT from "../assets/ROP/ROP frutas.gif"
import ROP_MINT from "../assets/ROP/ROP menta.gif"

/* NUEVO: imágenes para compartir */

import SHARE_ORANGE from "../assets/share/ShareOrange.jpeg";
import SHARE_FRESA from "../assets/share/ShareFresa.jpeg";
import SHARE_FRUTAS from "../assets/share/ShareFrutas.jpeg";
import SHARE_MENTA from "../assets/share/ShareMenta.jpeg";

interface Props {
  result: TiktakType;
}

const Result = ({ result }: Props) => {

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const messages1: Record<TiktakType, string> = {
    naranja: "Tic Tac Naranja!!",
    fresa: "Tic Tac Fresa!!",
    frutas: "Tic Tac Frutas!!",
    menta: "Tic Tac Menta!!",
  };

  const messages2: Record<TiktakType, string> = {
    naranja: "Alegre, sociable y espontáneo!! 🍊",
    fresa: "Dulce, seguro y trendy!! 🍓",
    frutas: "Extrovertido, aventurero y energético!! 🍈🍓🍊🥭",
    menta: "Fresco, confiado y moderno!! 🍃",
  };


  const playlists: Record<TiktakType, [string, string]> = {
  naranja: [
    "https://music.apple.com/mx/playlist/tic-tac-naranja/pl.u-zPyLYAguk7VqR8", // Apple Music
    "https://open.spotify.com/playlist/7HahiYE9y9rScjwHineRJa?si=c24b6b8e130247fb"      // Spotify
  ],
  fresa: [
    "https://music.apple.com/mx/playlist/tic-tac-fresa/pl.u-XkD0Z3BiR9Myeg",
    "https://open.spotify.com/playlist/4AnYPgInzDYoord5cdpHXB?si=de766f4d4c034dbe"
  ],
  frutas: [
    "https://music.apple.com/mx/playlist/tic-tac-frutas/pl.u-4JomGkNsGDqP9X",
    "https://open.spotify.com/playlist/6BLvWb2TR0uJOTFrdAEcYM?si=2a2323ff5c7747e2"
  ],
  menta: [
    "https://music.apple.com/mx/playlist/tic-tac-menta/pl.u-yZyVlDLC9GL1NZ",
    "https://open.spotify.com/playlist/0eYrdWuD6MLzuGUv5bxvuL?si=1110c48e57144aec"
  ],
};

// Define one image per result
const backgroundImages: Record<TiktakType, string> = {
  naranja: ROP_ORANGE,
  fresa: ROP_STRAWBERRY,
  frutas: ROP_FRUIT,
  menta: ROP_MINT,
};

const shareImages: Record<TiktakType, string> = {
    naranja: SHARE_ORANGE,
    fresa: SHARE_FRESA,
    frutas: SHARE_FRUTAS,
    menta: SHARE_MENTA,
  };

  const colors: Record<TiktakType, string> = {
  naranja: "#fb923c",  // Tailwind bg-orange-400 hex
  fresa: "#f472b6",    // Tailwind bg-pink-400 hex
  frutas: "#a78bfa",   // Tailwind bg-purple-400 hex
  menta: "#4ade80",    // Tailwind bg-green-400 hex
};

  const sounds: Record<TiktakType, string> = {
    naranja: "/audio/TTNaranja.wav",
    fresa: "/audio/TTFresa.wav",
    frutas: "/audio/TTFrutas.wav",
    menta: "/audio/TTMenta.wav",
  };

  function lightenColor(hex: string, percent: number) {
  // Convert #RRGGBB to RGB
  const num = parseInt(hex.replace("#", ""), 16);
  const r = (num >> 16) + percent;
  const g = ((num >> 8) & 0x00ff) + percent;
  const b = (num & 0x0000ff) + percent;

  // Clamp values between 0-255
  const newR = Math.min(255, r);
  const newG = Math.min(255, g);
  const newB = Math.min(255, b);

  return `rgb(${newR}, ${newG}, ${newB})`;
}



  useEffect(() => {

    audioRef.current = new Audio(sounds[result]);

    const audio = audioRef.current;

    audio.loop = true;
    audio.volume = 0;

    audio.play().catch(() => {});

    let volume = 0;

    const fadeIn = setInterval(() => {
      volume += 0.05;

      if (volume >= 0.7) {
        volume = 0.7;
        clearInterval(fadeIn);
      }

      audio.volume = volume;
    }, 100);

    return () => {
      clearInterval(fadeIn);

      const fadeOut = setInterval(() => {
        audio.volume -= 0.05;

        if (audio.volume <= 0) {
          audio.pause();
          clearInterval(fadeOut);
        }
      }, 100);
    };

  }, [result]);

  useEffect(() => {
  const original = document.body.style.backgroundImage;

  // quitar el gif del quiz
  document.body.style.backgroundImage = "none";

  return () => {
    // restaurar si vuelves al quiz
    document.body.style.backgroundImage = original;
  };
}, []);

  const shareResult = async () => {

    const imageUrl = shareImages[result];

    try {

      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const file = new File([blob], "tictac-result.jpg", {
        type: blob.type
      });

      if (navigator.share && navigator.canShare({ files: [file] })) {

        await navigator.share({
          title: "Mi personalidad Tic Tac",
          text: "Descubre qué Tic Tac eres!",
          files: [file]
        });

      } else {

        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "tictac-result.jpg";
        link.click();

      }

    } catch (error) {

      console.error("Error compartiendo:", error);

    }

  };

  return (
    <>
   {/* Full-page background */}
  <img
    src={backgroundImages[result]}
    alt="Background"
    style={{
      position: "fixed",    // stays in place behind everything
      top: 0,
      left: 0,
      width: "100vw",       // full viewport width
      height: "100vh",      // full viewport height
      objectFit: "cover",   // cover entire viewport
      zIndex: -1,           // behind all other content
      pointerEvents: "none" // don't block clicks
    }}
  />


    <div
  className="result-reveal"
  style={{
    position: "relative", // so the background can be absolute
    maxWidth: "512px",
    margin: "0 auto",
    padding: "40px",
    borderRadius: "24px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    color: "white",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    backgroundColor: colors[result],
    overflow: "hidden", // clip background image if needed
  }}
>

  


  {/* Content wrapper to keep content above background */}
  <div style={{ position: "relative", zIndex: 1 }}>
    <h1 style={{ fontSize: "2.25rem", fontWeight: "800" }}>
      Tu personalidad Tic Tac!
    </h1>

    <h2>Eres</h2>

    <h3
      style={{
        fontSize: "40px",
        marginTop: "4px",
        marginBottom: "20px",
      }}
    >
      {messages1[result]}
    </h3>

    <h2>{messages2[result]}</h2>

    <button
      onClick={() => window.location.reload()}
      style={{
        padding: "12px 24px",
        borderRadius: "9999px",
        fontWeight: "bold",
        fontSize: "16px",
        color: "white",
        backgroundColor: lightenColor(colors[result], 30),
        border: "2px solid white",
        cursor: "pointer",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      Intenta otra vez!
    </button>

    <p style={{ marginBottom: "4px" }}>Escucha tu vibe en:</p>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "32px",
      }}
    >
      <a
        href={playlists[result][0]}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s",
        }}
      >
        <img src={appleMusic} alt="Apple Music" style={{ width: "40px", height: "40px" }} />
      </a>

      <a
        href={playlists[result][1]}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s",
        }}
      >
        <img 
        src={spotify} 
        alt="Spotify" 
        style={{ width: "40px", height: "40px" }} 
        />
      </a>
    </div>
    <button
            onClick={shareResult}
            style={{
              marginTop: "20px",
              padding: "12px 24px",
              borderRadius: "9999px",
              fontWeight: "bold",
              fontSize: "16px",
              color: "white",
              backgroundColor: lightenColor(colors[result], 30),
              border: "2px solid white",
              cursor: "pointer",
            }}
          >
            ¡¡Comparte tu resultado!!
          </button>
  </div>
</div>
</>
  );
};

export default Result;
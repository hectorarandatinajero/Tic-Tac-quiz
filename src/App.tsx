import { useState, useEffect, useRef } from "react"; // ← agrega useRef
import "./App.css";
import type { Answers, TiktakType } from "./types";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";
import Page4 from "./components/Page4";
import Page5 from "./components/Page5";
import Page6 from "./components/Page6";
import Page7 from "./components/Page7";
import Page8 from "./components/Page8";
import Page9 from "./components/Page9";
import Page10 from "./components/Page10";
import Result from "./components/Result";
import logo from "./assets/logo.avif";
import Confetti from "react-confetti"; // ⭐ NUEVO

import pastillasSound from "./assets/pastillas.wav";

const pillColors = [
  "#ffffff",
  "#ff6b81",
  "#2ecc71",
  "#ff9f43",
  "#feca57"
];



function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

function App() {
  const [page, setPage] = useState(1);

  const { width, height } = useWindowSize();

  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastMouse = useRef({ x: 0, y: 0 });
  const lastPlay = useRef(0);

  const [answers, setAnswers] = useState<Answers>({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
    q6: null,
    q7: null,
    q8: null,
    q9: null,
    q10: null,
  });

  const updateAnswer = (question: keyof Answers, value: TiktakType) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: value,
    }));
  };

  const currentQuestionKey = `q${page}` as keyof Answers;

  const isAnswered =
    page === 11 || answers[currentQuestionKey] !== null;

  const calculateResult = (): TiktakType => {
    const scores: Record<TiktakType, number> = {
      naranja: 0,
      fresa: 0,
      frutas: 0,
      menta: 0,
    };

    Object.values(answers).forEach((answer) => {
  if (answer) scores[answer as TiktakType]++;
});

    return Object.keys(scores).reduce((a, b) =>
      scores[a as TiktakType] > scores[b as TiktakType] ? a : b
    ) as TiktakType;
  };

  const progress = ((page - 1) / 10) * 100;
  
  const renderPage = () => {
    switch (page) {
      case 1:
        return <Page1 answers={answers} updateAnswer={updateAnswer} />;
      case 2:
        return <Page2 answers={answers} updateAnswer={updateAnswer} />;
      case 3:
        return <Page3 answers={answers} updateAnswer={updateAnswer} />;
      case 4:
        return <Page4 answers={answers} updateAnswer={updateAnswer} />;
      case 5:
        return <Page5 answers={answers} updateAnswer={updateAnswer} />;
      case 6:
        return <Page6 answers={answers} updateAnswer={updateAnswer} />;
      case 7:
        return <Page7 answers={answers} updateAnswer={updateAnswer} />;
      case 8:
        return <Page8 answers={answers} updateAnswer={updateAnswer} />;
      case 9:
        return <Page9 answers={answers} updateAnswer={updateAnswer} />;
      case 10:
        return <Page10 answers={answers} updateAnswer={updateAnswer} />;
      case 11:
        return <Result result={calculateResult()} />;
      default:
        return null;
    }
  };

  useEffect(() => {

  audioRef.current = new Audio(pastillasSound);
  audioRef.current.volume = 0.35;

  const handleMouseMove = (e: MouseEvent) => {

    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;

    const speed = Math.sqrt(dx * dx + dy * dy);

    lastMouse.current = { x: e.clientX, y: e.clientY };

    const now = Date.now();

    if (speed > 25 && now - lastPlay.current > 100) {

      lastPlay.current = now;

      if (audioRef.current) {

  const sound = audioRef.current.cloneNode() as HTMLAudioElement;

  sound.playbackRate = 0.8 + Math.random() * 0.5;
  sound.volume = 0.35;

  sound.play().catch(() => {});

}

    }

  };

  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };

}, []);

useEffect(() => {

  let lastSpawn = 0;

  const spawnPill = (x:number, y:number) => {

  const pillEl = document.createElement("div");

  pillEl.className = "tictac-pill";

  pillEl.style.left = x + "px";
  pillEl.style.top = y + "px";

  const size = 20 + Math.random() * 25;

pillEl.style.width = size + "px";
pillEl.style.height = size * 0.6 + "px";

  // color aleatorio
  const color = pillColors[Math.floor(Math.random() * pillColors.length)];
  pillEl.style.backgroundColor = color;
  pillEl.style.backgroundImage = "none";
  pillEl.style.background = color;

  // dirección
  const angle = Math.random() * Math.PI * 2;
  const distance = 80 + Math.random() * 120;

  const moveX = Math.cos(angle) * distance;
  const moveY = 100 + Math.random() * 150;

  pillEl.style.setProperty("--x", `${moveX}px`);
  pillEl.style.setProperty("--y", `${moveY}px`);

  // velocidad
  const duration = 900 + Math.random() * 600;
  pillEl.style.animationDuration = duration + "ms";

  document.body.appendChild(pillEl);

  setTimeout(() => {
    pillEl.remove();
  }, duration);

};

  const handleMouseMove = (e: MouseEvent) => {

    const now = Date.now();

    if (now - lastSpawn > 40) {

      spawnPill(e.clientX, e.clientY);
      lastSpawn = now;

    }

  };

  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };

}, []);

  return (
    
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      {page === 11 && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={350}
          recycle={false}
        />
      )}

      <img src={logo} alt="Tic Tac Logo" className="app-logo" />
      {page !== 11 && <h1>¡Descubre que Tic Tac eres!</h1>}

      {!isLoading && page < 11 && (
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {isLoading ? (
        <div className="loading-screen">
          <h2>Calculando tu Tic Tac...</h2>

          <div className="loading-bar">
            <div className="loading-fill"></div>
          </div>
        </div>
      ) : (
        <div key={page} className="page-transition">
          {renderPage()}
        </div>
      )}

      {!isLoading && <div style={{ marginTop: 20 }}>
        {page > 1 && page < 11 && (
          <button onClick={() => setPage(page - 1)}>
            Atrás
          </button>
        )}

        {page < 11 && isAnswered && (
          <button
            className="next-button"

            onClick={() => {
              if (page === 10) {
                setIsLoading(true);

                setTimeout(() => {
                  setIsLoading(false);
                  setPage(11);
                }, 2000); // duración loading
              } else {
                setPage(page + 1);
              }
            }}
          >
            Siguente
          </button>
        )}
      </div>}
    </div>
  );
}

export default App;
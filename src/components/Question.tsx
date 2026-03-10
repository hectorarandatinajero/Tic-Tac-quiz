import type { TiktakType } from "../types";

import clickFresa from "../assets/clicks/Click Fresa.wav";
import clickFruta from "../assets/clicks/Click Fruta.wav";
import clickNaranja from "../assets/clicks/Click Naranja.wav";
import clickMenta from "../assets/clicks/Click Menta.wav";

export interface Option {
  label: string;
  value: TiktakType;
}

interface QuestionProps {
  question: string;
  questionKey: string;
  selected: TiktakType | null;
  options: Option[];
  onSelect: (value: TiktakType) => void;
}

const colors: Record<TiktakType, string> = {
  naranja: "bg-orange-400 hover:bg-orange-500",
  fresa: "bg-pink-400 hover:bg-pink-500",
  frutas: "bg-purple-400 hover:bg-purple-500",
  menta: "bg-gray-400 hover:bg-gray-500",
};

const clickSounds: Record<TiktakType, string> = {
  naranja: clickNaranja,
  fresa: clickFresa,
  frutas: clickFruta,
  menta: clickMenta,
};

const playClick = (type: TiktakType) => {
  const audio = new Audio(clickSounds[type]);
  audio.volume = 0.8;
  audio.play().catch(() => {});
};

const Question = ({
  question,
  questionKey,
  selected,
  options,
  onSelect,
}: QuestionProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-black mb-4">{question}</h3>
      <div className="flex flex-col gap-4">
        {options.map((option) => (
          <button
            key={`${questionKey}-${option.label}`}
            onClick={() => {
              playClick(option.value);
              onSelect(option.value);
            }}
            className={`text-white px-4 py-3 rounded-lg font-semibold transition transform hover:scale-105
              ${colors[option.value]}
                ${selected === option.value ? "selected" : ""}
              `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
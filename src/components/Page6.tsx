import type { Answers, TiktakType } from "../types";
import Question from "./Question";

interface Props {
  answers: Answers;
  updateAnswer: (question: keyof Answers, value: TiktakType) => void;
}

const Page6 = ({ answers, updateAnswer }: Props) => {
  return (
    <>
      <h2>Pregunta 6</h2>

      <Question
        question="6. Si fueras un clima serías…"
        questionKey="q6"
        selected={answers.q6}
        onSelect={(value) => updateAnswer("q6", value)}
        options={[
          { label: "Sol brillante de verano.", value: "naranja" },
          { label: "Atardecer rosado.", value: "fresa" },
          { label: "Día colorido después de lluvia.", value: "frutas" },
          { label: "Brisa fresca de mañana.", value: "menta" },
        ]}
      />
    </>
  );
};

export default Page6;
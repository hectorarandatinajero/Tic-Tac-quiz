import type { Answers, TiktakType } from "../types";
import Question from "./Question";

interface Props {
  answers: Answers;
  updateAnswer: (question: keyof Answers, value: TiktakType) => void;
}

const Page4 = ({ answers, updateAnswer }: Props) => {
  return (
    <>
      <h2>Pregunta 4</h2>

      <Question
        question="4. Cuando tomas decisiones eres más…"
        questionKey="q4"
        selected={answers.q4}
        onSelect={(value) => updateAnswer("q4", value)}
        options={[
          { label: "Impulsivo y rápido.", value: "naranja" },
          { label: "Emocional e intuitivo.", value: "fresa" },
          { label: "Flexible y adaptable.", value: "frutas" },
          { label: "Analítico y estratégico.", value: "menta" },
        ]}
      />
    </>
  );
};

export default Page4;
import type { Answers, TiktakType } from "../types";
import Question from "./Question";

interface Props {
  answers: Answers;
  updateAnswer: (question: keyof Answers, value: TiktakType) => void;
}

const Page9 = ({ answers, updateAnswer }: Props) => {
  return (
    <>
      <h2>Pregunta 9</h2>

      <Question
        question="9. Lo que más valoras en un momento es…"
        questionKey="q9"
        selected={answers.q9}
        onSelect={(value) => updateAnswer("q9", value)}
        options={[
          { label: "Diversión y adrenalina.", value: "naranja" },
          { label: "Conexión y dulzura.", value: "fresa" },
          { label: "Variedad y sorpresa.", value: "frutas" },
          { label: "Claridad y frescura mental.", value: "menta" },
        ]}
      />
    </>
  );
};

export default Page9;
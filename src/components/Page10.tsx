import type { Answers, TiktakType } from "../types";
import Question from "./Question";

interface Props {
  answers: Answers;
  updateAnswer: (question: keyof Answers, value: TiktakType) => void;
}

const Page10 = ({ answers, updateAnswer }: Props) => {
  return (
    <>
      <h2>Pregunta 10</h2>

      <Question
        question="10. Si tu personalidad fuera una palabra sería…"
        questionKey="q10"
        selected={answers.q10}
        onSelect={(value) => updateAnswer("q10", value)}
        options={[
          { label: "Energía.", value: "naranja" },
          { label: "Encanto.", value: "fresa" },
          { label: "Versatilidad.", value: "frutas" },
          { label: "Equilibrio.", value: "menta" },
        ]}
      />
    </>
  );
};

export default Page10;
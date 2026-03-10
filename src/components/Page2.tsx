import type { Answers, TiktakType } from "../types";
import Question from "./Question";

interface Props {
  answers: Answers;
  updateAnswer: (question: keyof Answers, value: TiktakType) => void;
}

const Page2 = ({ answers, updateAnswer }: Props) => {
  return (
    <>
      <h2>Pregunta 2</h2>

      <Question
        question="2. Cuando entras a una fiesta tú…"
        questionKey="q2"
        selected={answers.q2}
        onSelect={(value) => updateAnswer("q2", value)}
        options={[
          { label: "Llegas con energía y saludas a todos.", value: "naranja" },
          { label: "Te ves increíble y conectas uno a uno.", value: "fresa" },
          { label: "Te mueves entre grupos, conoces gente nueva.", value: "frutas" },
          { label: "Observas primero y luego participas.", value: "menta" },
        ]}
      />
    </>
  );
};

export default Page2;
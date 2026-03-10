import type { Answers, TiktakType } from "../types";
import Question from "./Question";

interface Props {
  answers: Answers;
  updateAnswer: (question: keyof Answers, value: TiktakType) => void;
}

const Page5 = ({ answers, updateAnswer }: Props) => {
  return (
    <>
      <h2>Pregunta 5</h2>

      <Question
        question="5. Tu energía en grupo suele ser…"
        questionKey="q5"
        selected={answers.q5}
        onSelect={(value) => updateAnswer("q5", value)}
        options={[
          { label: "El que prende el ambiente.", value: "naranja" },
          { label: "El que conecta emocionalmente.", value: "fresa" },
          { label: "El que propone ideas locas.", value: "frutas" },
          { label: "El que equilibra todo.", value: "menta" },
        ]}
      />
    </>
  );
};

export default Page5;
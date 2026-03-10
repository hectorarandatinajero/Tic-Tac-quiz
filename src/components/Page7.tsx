import type { Answers, TiktakType } from "../types";
import Question from "./Question";

interface Props {
  answers: Answers;
  updateAnswer: (question: keyof Answers, value: TiktakType) => void;
}

const Page7 = ({ answers, updateAnswer }: Props) => {
  return (
    <>
      <h2>Pregunta 7</h2>

      <Question
        question="7. Cuando estás bajo presión tú…"
        questionKey="q7"
        selected={answers.q7}
        onSelect={(value) => updateAnswer("q7", value)}
        options={[
          { label: "Actúas de inmediato.", value: "naranja" },
          { label: "Buscas apoyo en alguien cercano.", value: "fresa" },
          { label: "Improvisas soluciones creativas.", value: "frutas" },
          { label: "Respiras y mantienes la calma.", value: "menta" },
        ]}
      />
    </>
  );
};

export default Page7;
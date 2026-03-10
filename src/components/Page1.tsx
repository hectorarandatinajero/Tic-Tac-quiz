import type { Answers, TiktakType } from "../types";
import Question from "./Question";

interface Props {
  answers: Answers;
  updateAnswer: (question: keyof Answers, value: TiktakType) => void;
}

const Page1 = ({ answers, updateAnswer }: Props) => {
  return (
    <>
      <h2>Pregunta 1</h2>

      <Question
        question="1. Si tu día fuera un plan improvisado sería…"
        questionKey="q1"
        selected={answers.q1}
        onSelect={(value) => updateAnswer("q1", value)}
        options={[
          { label: "Salir sin rumbo y ver qué pasa.", value: "naranja" },
          { label: "Ir por algo cute como café y fotos bonitas.", value: "fresa" },
          { label: "Reunir amigos y hacer algo diferente.", value: "frutas" },
          { label: "Tomar un momento tranquilo para organizar todo.", value: "menta" },
        ]}
      />
    </>
  );
};

export default Page1;
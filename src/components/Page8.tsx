import type { Answers, TiktakType } from "../types";
import Question from "./Question";

interface Props {
  answers: Answers;
  updateAnswer: (question: keyof Answers, value: TiktakType) => void;
}

const Page8 = ({ answers, updateAnswer }: Props) => {
  return (
    <>
      <h2>Pregunta 8</h2>

      <Question
        question="8. Tu color favorito se acerca más a…"
        questionKey="q8"
        selected={answers.q8}
        onSelect={(value) => updateAnswer("q8", value)}
        options={[
          { label: "Naranja vibrante.", value: "naranja" },
          { label: "Rosa intenso.", value: "fresa" },
          { label: "Morado o mezcla de colores.", value: "frutas" },
          { label: "Verde o tonos frescos.", value: "menta" },
        ]}
      />
    </>
  );
};

export default Page8;
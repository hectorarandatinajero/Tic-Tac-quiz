import type { Answers, TiktakType } from "../types";
import Question from "./Question";

interface Props {
  answers: Answers;
  updateAnswer: (question: keyof Answers, value: TiktakType) => void;
}

const Page3 = ({ answers, updateAnswer }: Props) => {
  return (
    <>
      <h2>Pregunta 3</h2>

      <Question
        question="3. Tu vibe musical normalmente es…"
        questionKey="q3"
        selected={answers.q3}
        onSelect={(value) => updateAnswer("q3", value)}
        options={[
          { label: "Algo movido que active el cuerpo.", value: "naranja" },
          { label: "Pop dulce y pegajoso.", value: "fresa" },
          { label: "Playlist variada, un poco de todo.", value: "frutas" },
          { label: "Chill, clean y relajante.", value: "menta" },
        ]}
      />
    </>
  );
};

export default Page3;
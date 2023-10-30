import { useEffect, useState } from "react";
import { CanceledError } from "../services/api-client";
import { Question, questionByQuiz } from "../services/question-service";

const useQuestions = (quizId: string) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);

    const { response, cancel } = await questionByQuiz.getById<Question>(quizId);

    response
      .then((res) => {
        if (!res.data) {
          setError("Not found data.");
          setLoading(false);
        } else {
          if (res.data.EC === 0) {
            setQuestions(res.data.DT);
            setError("");
            setLoading(false);
          } else {
            setError(res.data.EM);
            setLoading(false);
          }
        }
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  };

  return { questions, error, isLoading, setQuestions, setError, getData };
};

export { useQuestions };

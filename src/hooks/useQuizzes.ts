import { useEffect, useState } from "react";
import { CanceledError } from "../services/api-client";
import { Quiz, quizByPartService } from "../services/quiz-service";

const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);

    const { response, cancel } = await quizByPartService.getAll<Quiz>();

    response
      .then((res) => {
        if (!res.data) {
          setError("Not found data.");
          setLoading(false);
        } else {
          if (res.data.EC === 0) {
            setQuizzes(res.data.DT);
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

  return { quizzes, error, isLoading, setQuizzes, setError, getData };
};

export { useQuizzes };

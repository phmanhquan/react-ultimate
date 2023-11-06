import { useEffect, useState } from "react";
import { CanceledError } from "../services/api-client";
import {
  AddQuizDetail,
  Quiz,
  QuizAll,
  QuizDetail,
  quizAllService,
  quizByPartService,
  quizDetailService,
} from "../services/quiz-service";

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

const useAllQuizzes = () => {
  const [quizzes, setQuizzes] = useState<QuizAll[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);

    const { response, cancel } = await quizAllService.getAll<QuizAll>();

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

const useQuizDetail = (quizId: string) => {
  const [quizDetail, setQuizDetail] = useState<AddQuizDetail>(
    {} as AddQuizDetail
  );
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (quizId) getData(quizId);
  }, [quizId]);

  const getData = async (id: string) => {
    setLoading(true);

    const { response, cancel } = await quizDetailService.getDetail<QuizDetail>(
      id
    );

    response
      .then(async (res) => {
        if (!res.data) {
          setError("Not found data.");
          setLoading(false);
        } else {
          if (res.data.EC === 0) {
            if (res.data.DT && res.data.DT.qa && res.data.DT.qa.length > 0) {
              for (const question of res.data.DT.qa) {
                if (question.imageFile) {
                  const base64Response = await fetch(
                    `data:image/png;base64,${question.imageFile}`
                  );
                  question.imageFile = await base64Response.blob();
                  question.imageName = `image-${question.id}`;
                }
                setQuizDetail({
                  quizId: +res.data.DT.quizId,
                  questions: res.data.DT.qa,
                });
              }
            }
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

  return { quizDetail, error, isLoading, setQuizDetail, setError, getData };
};

export { useQuizzes, useAllQuizzes, useQuizDetail };

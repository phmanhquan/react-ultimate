import { useEffect, useState } from "react";
import { CanceledError } from "../services/api-client";
import { overviewService } from "../services/dashboard-service";

interface UserInfo {
  total: number;
  countUsers: number;
  countAdmin: number;
}

interface OtherInfo {
  countQuiz: number;
  countQuestions: number;
  countAnswers: number;
}

export interface Overview {
  users: UserInfo;
  others: OtherInfo;
}

const useOverview = () => {
  const [overview, setOverview] = useState<Overview>({} as Overview);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);

    const { response, cancel } =
      await overviewService.getDetailObject<Overview>();

    response
      .then((res) => {
        if (!res.data) {
          setError("Not found data.");
          setLoading(false);
        } else {
          if (res.data.EC === 0) {
            setOverview(res.data.DT);
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

  return { overview, error, isLoading, setOverview, setError, getData };
};

export { useOverview };

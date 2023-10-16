import { useEffect, useState } from "react";
import {
  Participant,
  participantSubService,
} from "../services/participant-service";
import { CanceledError } from "../services/api-client";

const useParticipants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // get -> promise -> res / err
    const { response, cancel } = participantSubService.getAll<Participant>();
    console.log(
      "🚀 ~ file: useParticipant.ts:18 ~ useEffect ~ response:",
      response
    );

    response
      .then((res) => {
        if (!res.data) {
          setError("Not found data.");
          setLoading(false);
          return;
        } else {
          if (res.data.EC === 0) {
            setParticipants(res.data.DT);
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
  }, []);

  return { participants, error, isLoading, setParticipants, setError };
};

export default useParticipants;

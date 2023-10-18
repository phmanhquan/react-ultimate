import { useEffect, useState } from "react";
import {
  Participant,
  participantService,
  participantSubService,
} from "../services/participant-service";
import { CanceledError } from "../services/api-client";

const useParticipants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);

    // get -> promise -> res / err
    const { response, cancel } =
      await participantSubService.getAll<Participant>();
    // console.log(
    //   "🚀 ~ file: useParticipant.ts:18 ~ useEffect ~ response:",
    //   response
    // );

    response
      .then((res) => {
        if (!res.data) {
          setError("Not found data.");
          setLoading(false);
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
  };

  return { participants, error, isLoading, setParticipants, setError, getData };
};

interface Props {
  page: number;
  limit: number;
}

const useParticipantsPaginate = ({ page, limit }: Props) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [page]);

  const getData = async () => {
    setLoading(true);
    const { response, cancel } =
      await participantService.getAllPaginate<Participant>(page, limit);
    response
      .then((res) => {
        if (!res.data) {
          setError("Not found data.");
          setLoading(false);
        } else {
          if (res.data.EC === 0) {
            setParticipants(res.data.DT.users);
            setTotalPage(res.data.DT.totalPages);
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

  return {
    participants,
    error,
    isLoading,
    setParticipants,
    setError,
    getData,
    totalPage,
  };
};

export { useParticipants, useParticipantsPaginate };

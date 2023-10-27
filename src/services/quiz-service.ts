import create from "./http-service";

export interface ParticipantQuiz {
  quiz_id: number;
  participant_id: number;
  is_finish: boolean;
  time_start: Date;
  time_end: Date;
}

export interface Quiz {
  id: number;
  description: string;
  image: string;
  ParticipantQuiz: ParticipantQuiz;
}

const quizByPartService = create("/api/v1/quiz-by-participant");
// const participantSubService = create("/api/v1/participant/all");

// const updateParticipant = async (data: Participant) => {
//   const request = new FormData();

//   request.append("id", data.id.toString());
//   request.append("username", data.username);
//   request.append("role", data.role);
//   request.append("userImage", data.image);

//   const res = await participantService.update(request);

//   return res.data;
// };

// const deleteParticipant = async (id: number) => {
//   const res = await participantService.delete(id);

//   return res.data;
// };

export { quizByPartService };

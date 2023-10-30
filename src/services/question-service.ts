import create from "./http-service";

export interface Answers {
  id: number;
  description: string;
}

export interface Question {
  id: number;
  description: string;
  image: string;
  answers: Answers;
}

const questionByQuiz = create("/api/v1/questions-by-quiz");
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

export { questionByQuiz };

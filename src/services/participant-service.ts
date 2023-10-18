import create from "./http-service";

export interface Participant {
  id: number;
  username: string;
  password: string;
  email: string;
  role: "USER" | "ADMIN";
  image: string | File;
}

const participantService = create("/api/v1/participant");
const participantSubService = create("/api/v1/participant/all");

const addParticipant = async (data: Participant) => {
  const request = new FormData();

  request.append("username", data.username);
  request.append("password", data.password);
  request.append("email", data.email);
  request.append("role", data.role);
  request.append("userImage", data.image);

  const res = await participantService.create(request);

  return res.data;
};

const updateParticipant = async (data: Participant) => {
  const request = new FormData();

  request.append("id", data.id.toString());
  request.append("username", data.username);
  request.append("role", data.role);
  request.append("userImage", data.image);

  const res = await participantService.update(request);

  return res.data;
};

const deleteParticipant = async (id: number) => {
  const res = await participantService.delete(id);

  return res.data;
};

export {
  addParticipant,
  updateParticipant,
  deleteParticipant,
  participantService,
  participantSubService,
};

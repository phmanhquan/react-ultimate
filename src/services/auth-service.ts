import create from "./http-service";

export interface Account {
  email: string;
  password: string;
}

const loginService = create("/api/v1/login");
// const participantSubService = create("/api/v1/participant/all");

const login = async (data: Account) => {
  const request = new FormData();

  request.append("email", data.email);
  request.append("password", data.password);

  const res = await loginService.create(request);

  return res.data;
};

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

export {
  login,
  //   updateParticipant,
  //   deleteParticipant,
  //   participantService,
  //   participantSubService,
};

import create from "./http-service";

export interface Account {
  username: string;
  email: string;
  password: string;
}

const loginService = create("/api/v1/login");
const registerService = create("/api/v1/register");

const login = async (data: Account) => {
  const request = new FormData();

  request.append("email", data.email);
  request.append("password", data.password);

  const res = await loginService.create(request);

  return res.data;
};

const register = async (data: Account) => {
  const request = new FormData();

  request.append("username", data.username);
  request.append("email", data.email);
  request.append("password", data.password);

  const res = await registerService.create(request);

  return res.data;
};

// const deleteParticipant = async (id: number) => {
//   const res = await participantService.delete(id);

//   return res.data;
// };

export {
  login,
  register,
  //   deleteParticipant,
  //   participantService,
  //   participantSubService,
};

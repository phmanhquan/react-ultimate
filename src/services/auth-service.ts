import { LoginInfo } from "../redux/action/userAction";
import create from "./http-service";

export interface Account {
  username: string;
  email: string;
  password: string;
  delay: number;
}

const loginService = create("/api/v1/login");
const registerService = create("/api/v1/register");
const logoutService = create("/api/v1/logout");

const login = async (data: Account) => {
  const request = new FormData();

  request.append("email", data.email);
  request.append("password", data.password);
  if (data.delay) request.append("delay", data.delay.toString());

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

const logout = async (data: LoginInfo) => {
  const request = new FormData();

  request.append("email", data.email);
  request.append("refresh_token", data.refresh_token);

  const res = await logoutService.create(request);

  return res.data;
};

export { login, register, logout };

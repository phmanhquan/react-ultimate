export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export interface LoginInfo {
  access_token: string;
  refresh_token: string;
  username: string;
  image: string;
  role: string;
  email: string;
}

export interface UserAction {
  type: "LOGIN_SUCCESS" | "LOGOUT_SUCCESS";
  payload: {
    DT: LoginInfo;
    EC: number;
    EM: string;
  };
}

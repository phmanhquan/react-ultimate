import {
  UserAction,
  LoginInfo,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../action/userAction";

const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    image: "",
    role: "",
    email: "",
  } as LoginInfo,
  isAuthenticated: false,
};

export interface UserState {
  account: LoginInfo;
  isAuthenticated: boolean;
}

const userReducer = (state = INITIAL_STATE, action: UserAction) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        account: action?.payload?.DT,
        isAuthenticated: true,
      };

    case LOGOUT_SUCCESS:
      return INITIAL_STATE;
    //   return {
    //     ...state,
    //     account: INITIAL_STATE.account,
    //     isAuthenticated: INITIAL_STATE.isAuthenticated,
    //   };
    default:
      return state;
  }
};

export default userReducer;

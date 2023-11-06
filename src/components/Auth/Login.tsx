import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { Account, login } from "../../services/auth-service";
import { toast } from "react-toastify";
import { ImSpinner9 } from "react-icons/im";
import { useDispatch } from "react-redux";
import Language from "../Header/Language";

const Login = () => {
  const [account, setAccount] = useState<Account>({
    username: "",
    email: "",
    password: "",
    delay: 2000,
  } as Account);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleLogin = async () => {
    //validate
    if (!expression.test(account.email)) {
      toast.error("Email is not valid");
      return;
    }

    if (!account.password) {
      toast.error("Invalid password");
      return;
    }

    setIsLoading(true);
    //submit apis
    const res = await login(account);
    if (res && res.EC === 0) {
      dispatch({ type: "LOGIN_SUCCESS", payload: res });
      toast.success(res.EM, { autoClose: 500 });
      setIsLoading(false);
      navigate("/");
    }

    if (res && res.EC !== 0) {
      setIsLoading(false);
      toast.error(res.EM);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleLogin();
  };

  return (
    <div className="login-container">
      <div className="header">
        <span> Don't have an account yet?</span>
        <button
          onClick={() => {
            navigate("/register");
          }}
        >
          Sign Up
        </button>
        <Language />
      </div>
      <div className="title col-4 mx-auto">React Ultimate</div>
      <div className="welcome col-4 mx-auto">Hello, who's this?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={account.email}
            onChange={(event) =>
              setAccount({ ...account, email: event.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={account.password}
            onChange={(event) =>
              setAccount({ ...account, password: event.target.value })
            }
            onKeyDown={(event) => {
              handleKeyDown(event);
            }}
          />
        </div>
        <span className="forgot-password">Forgot password ?</span>
        <div>
          <button
            className="btn-submit"
            onClick={() => handleLogin()}
            disabled={isLoading}
          >
            {isLoading && <ImSpinner9 className="loaderIcon" />}
            <span>Login to React Ultimate</span>
          </button>
        </div>
        <div className="text-center">
          <span
            className="back"
            onClick={() => {
              navigate("/");
            }}
          >
            &#60;&#60; Go to Homepage
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;

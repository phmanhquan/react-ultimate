import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { Account, login } from "../../services/auth-service";
import { toast } from "react-toastify";

const Login = () => {
  const [account, setAccount] = useState<Account>({} as Account);
  const navigate = useNavigate();

  const handleLogin = async () => {
    //validate
    //submit apis
    const res = await login(account);
    if (res && res.EC === 0) {
      navigate("/");
    }

    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span> Don't have an account yet?</span>
        <button>Sign Up</button>
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
          />
        </div>
        <span className="forgot-password">Forgot password ?</span>
        <div>
          <button className="btn-submit" onClick={() => handleLogin()}>
            Login to React Ultimate
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

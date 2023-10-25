import { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { Account, register } from "../../services/auth-service";
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Register = () => {
  const [account, setAccount] = useState<Account>({
    username: "",
    email: "",
    password: "",
  } as Account);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleRegister = async () => {
    //validate
    if (!expression.test(account.email)) {
      toast.error("Email is not valid");
      return;
    }

    if (!account.password) {
      toast.error("Invalid password");
      return;
    }

    //submit apis
    const res = await register(account);
    if (res && res.EC === 0) {
      navigate("/login");
    }

    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <div className="register-container">
      <div className="header">
        <span> Already have an account?</span>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Log in
        </button>
      </div>
      <div className="title col-4 mx-auto">React Ultimate</div>
      <div className="welcome col-4 mx-auto">Start your journey?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email (*)</label>
          <input
            type="email"
            className="form-control"
            value={account.email}
            onChange={(event) =>
              setAccount({ ...account, email: event.target.value })
            }
          />
        </div>
        <div className="pass-group">
          <label>Password (*)</label>
          <input
            type={isShowPassword ? "text" : "password"}
            className="form-control"
            value={account.password}
            onChange={(event) =>
              setAccount({ ...account, password: event.target.value })
            }
          />
          <span
            className="show-password"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            {!isShowPassword ? <VscEyeClosed /> : <VscEye />}
          </span>
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={account.username}
            onChange={(event) =>
              setAccount({ ...account, username: event.target.value })
            }
          />
        </div>
        <div>
          <button className="btn-submit" onClick={() => handleRegister()}>
            Create my free account
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

export default Register;

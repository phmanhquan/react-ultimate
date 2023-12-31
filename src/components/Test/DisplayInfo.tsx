import { useEffect, useState } from "react";
import { User } from "./UserInput";
import "./DisplayInfo.scss";
import logo from "./../logo.svg";

interface Props {
  users: User[];
  onDelete: (id: number) => void;
}

const DisplayInfo = ({ users, onDelete }: Props) => {
  // const setTexTColor = (age: number) => (age > 9 ? "red" : "green");

  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    if (users.length === 0) setIsShow(false);

    console.log("DisplayInfo useEffect");
  }, [users]); // just run one times when use []

  return (
    // <ul>
    //   {users.map((user) => {
    //     return (
    //       <li key={user.id}>
    //         My name's {user.name}
    //         <br />
    //         My age's {user.age}
    //       </li>
    //     );
    //   })}
    // </ul>

    <div className="display-info-container">
      <img src={logo} alt="logo" />
      <div>
        <button onClick={() => setIsShow(!isShow)}>
          {isShow ? "Hide" : "Show"}
        </button>
      </div>
      {isShow && (
        <div>
          {users.map((user) => {
            return (
              <div
                key={user.id}
                className={user.age > 9 ? "red" : "green"}
                // style={{ color: user.age > 9 ? "red" : "green" }}
              >
                <div> My name's {user.name}</div>
                <div> My age's {user.age}</div>
                <button onClick={() => onDelete(user.id)}>Delete</button>
                <br />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DisplayInfo;

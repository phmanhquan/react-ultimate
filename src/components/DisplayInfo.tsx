import { useState } from "react";
import { User } from "./UserInput";

interface Props {
  users: User[];
}

const DisplayInfo = ({ users }: Props) => {
  // const setTexTColor = (age: number) => (age > 9 ? "red" : "green");

  const [isShow, setIsShow] = useState(false);

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

    <div>
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
                style={{ color: user.age > 9 ? "red" : "green" }}
              >
                <div> My name's {user.name}</div>
                <div> My age's {user.age}</div>
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

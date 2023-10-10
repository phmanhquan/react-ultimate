import { useState } from "react";
import DisplayInfo from "./DisplayInfo";
import UserInput from "./UserInput";

const MyComponent = () => {
  const [users, addUsers] = useState([
    { id: 1, name: "Tí Đù", age: 10 },
    { id: 2, name: "Báo Thủ", age: 9 },
    { id: 3, name: "Miu Tạ", age: 9 },
  ]);

  return (
    <div>
      <UserInput
        onSubmit={(user) =>
          addUsers([{ ...user, id: users.length + 1 }, ...users])
        }
      ></UserInput>
      <br />
      <br />
      <DisplayInfo users={users} />
    </div>
  );
};

export default MyComponent;

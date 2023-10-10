import { useState } from "react";
import DisplayInfo from "./DisplayInfo";
import UserInput from "./UserInput";

const MyComponent = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Tí Đù", age: 10 },
    { id: 2, name: "Báo Thủ", age: 9 },
    { id: 3, name: "Miu Tạ", age: 9 },
  ]);

  const [newId, setNewId] = useState(4);

  return (
    <>
      <UserInput
        onSubmit={(user) => {
          setUsers([{ ...user, id: newId }, ...users]);
          setNewId(newId + 1);
        }}
      ></UserInput>
      <br />
      <br />
      <DisplayInfo
        onDelete={(id) => setUsers(users.filter((u) => u.id !== id))}
        users={users}
      />
    </>
  );
};

export default MyComponent;

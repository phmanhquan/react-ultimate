import DisplayInfo from "./DisplayInfo";
import UserInput from "./UserInput";

const MyComponent = () => {
  const users = [
    { id: 1, name: "Tí Đù", age: 10 },
    { id: 2, name: "Báo Thủ", age: 9 },
    { id: 3, name: "Miu Tạ", age: 9 },
  ];

  return (
    <div>
      <UserInput></UserInput>
      <br />
      <br />
      <DisplayInfo users={users} />
    </div>
  );
};

export default MyComponent;

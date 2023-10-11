import React, { useState } from "react";

export interface User {
  id: number;
  name: string;
  address?: string;
  age: number;
}

interface Props {
  onSubmit: (user: User) => void;
}

const UserInput = ({ onSubmit }: Props) => {
  const [user, setUser] = useState({
    id: 1,
    name: "tí đù",
    address: "gầm cầu house",
    age: 11,
  });

  const handleClick = () => {
    // console.log("random", Math.floor(Math.random() * 100 + 1));

    setUser({
      ...user,
      name: "tèo em",
      age: Math.floor(Math.random() * 100 + 1),
    });
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // console.log(user);
  };

  const handleOnChangeInput = (value: string) => {
    setUser({ ...user, name: value });
    console.log(value);
  };

  const handleOnChangeAge = (value: string) => {
    setUser({ ...user, age: parseInt(value) });
    console.log(parseInt(value));
  };
  return (
    <>
      My name is {user.name} and I'm {user.age}
      <button onClick={() => handleClick()}>click me</button>
      <form onSubmit={(event) => handleOnSubmit(event)}>
        <label>Your name</label>
        <input
          type="text"
          value={user.name}
          onChange={(event) => handleOnChangeInput(event.target.value)}
        />
        <label>Your age</label>
        <input
          type="text"
          value={user.age}
          onChange={(event) => handleOnChangeAge(event.target.value)}
        />
        <button onClick={() => onSubmit(user)}>Submit</button>
      </form>
    </>
  );
};

export default UserInput;

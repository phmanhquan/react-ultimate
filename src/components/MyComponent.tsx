import React, { useState } from "react";

const MyComponent = () => {
  const [user, setUser] = useState({
    name: "tí đù",
    address: "gầm cầu house",
    age: 11,
  });

  const handleClick = () => {
    console.log("random", Math.floor(Math.random() * 100 + 1));

    setUser({
      ...user,
      name: "tèo em",
      age: Math.floor(Math.random() * 100 + 1),
    });
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(user);
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
    <div>
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
        <button>Submit</button>
      </form>
    </div>
  );
};

export default MyComponent;

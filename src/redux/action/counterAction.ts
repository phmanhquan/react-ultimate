export const INCREMENT = "INCREMENT";

export const DECREMENT = "DECREMENT";

// import { useState } from "react";

export interface Action {
  type: "INCREMENT" | "DECREMENT";
}

// const [action, setAction] = useState({} as Action);

export const increaseCounter = () => {
  // setAction({ type: "INCREMENT" });

  return { type: "INCREMENT" };
};

export const decreaseCounter = () => {
  return {
    type: "DECREMENT",
  };
};

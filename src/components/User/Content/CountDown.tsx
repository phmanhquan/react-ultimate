import { useEffect, useState } from "react";

interface Props {
  onTimeUp: () => void;
}

const CountDown = ({ onTimeUp }: Props) => {
  const [count, setCount] = useState(100000);

  useEffect(() => {
    if (count === 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [count]);

  const toHHMMSS = (secs: string) => {
    const sec_num = parseInt(secs, 10);
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  return (
    <div className="countdown-container">{toHHMMSS(count.toString())}</div>
  );
};

export default CountDown;
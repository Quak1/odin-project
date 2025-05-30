import { useEffect, useState, useRef } from "react";

const useTimer = (startTime) => {
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (startTime == null) return;

    timerRef.current = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 1000);

    return stop;
  }, [startTime]);

  const stop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  return { elapsed, stop };
};

export default useTimer;

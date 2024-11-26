import React, { useState, useEffect } from 'react';

function PomodoroTimer() {
  const [workTimeMinutes, setWorkTimeMinutes] = useState(""); // Default work time
  const [breakTimeMinutes, setBreakTimeMinutes] = useState(""); // Default break time
  const [secondsLeft, setSecondsLeft] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false); // Timer state
  const [isWorkPhase, setIsWorkPhase] = useState(true); // Track work/break phase

  // Start the timer
  const handleStart = () => {
    if (!isRunning) {
      setSecondsLeft(isWorkPhase ? workTimeMinutes * 60 : breakTimeMinutes * 60);
      setIsRunning(true);
    }
  };

  // Stop the timer
  const handleStop = () => {
    setIsRunning(false);
  };

  // Reset the timer
  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(0);
    setIsWorkPhase(true);
  };

  // Countdown logic
  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      const timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      setIsWorkPhase((prev) => !prev); 
    }
  }, [isRunning, secondsLeft]);

  // Convert seconds to MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="w-[100%] justify-center gap-2 items-center flex flex-col">
      <p className="text-[20px] font-bold text-black">POMODORO TIMER</p>
      <div className="flex gap-2">
        <p>Work Time in Minutes</p>
        <input
          type="number"
          className='px-[5px]'
          value={workTimeMinutes}
          onChange={(e) => setWorkTimeMinutes(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <p>Break Time in Minutes</p>
        <input
          type="number"
          className='px-[5px]'
          value={breakTimeMinutes}
          onChange={(e) => setBreakTimeMinutes(e.target.value)}
        />
      </div>
      <div className="gap-3 flex">
        <button onClick={handleStart} className="text-white bg-indigo-800 p-[10px]">
          {isWorkPhase ? "START" : "START BREAK TIME"}
        </button>
        <button onClick={handleStop} className="text-white bg-indigo-800 p-[10px]">
          PAUSE
        </button>
        <button onClick={handleReset} className="text-white bg-indigo-800 p-[10px]">
          RESET
        </button>
      </div>
      <div>
        <p className="text-[40px]">
          {isWorkPhase ? 'Work' : 'Break'} Time: {formatTime(secondsLeft)}
        </p>
      </div>
    </div>
  );
}

export default PomodoroTimer;

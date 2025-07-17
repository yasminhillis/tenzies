export default function Die({ value, isHeld, hold, id }) {
  return (
    <button 
        aria-pressed={isHeld}
        aria-label={`die with value of ${value}, ${isHeld ? 'Held' : 'not held'}`}
        onClick={() => hold(id)} 
        className={isHeld ? "held-dice" : ""}
    >
      {value}
    </button>
  );
}

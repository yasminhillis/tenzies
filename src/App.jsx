import Die from './Die'
import { useState, useRef, useEffect } from 'react';
import { nanoid} from 'nanoid';
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(() => generateRandomNumber())

  const gameWon = dice.every(die => die.isHeld) &&  dice.every(die => dice[0].value === die.value);

  const buttonRef = useRef(null)

  useEffect(() => {
    buttonRef.current.focus()
  }, [gameWon])

  function generateRandomNumber(){
    return new Array(10).fill({}).map(() => {
      return {
        value: Math.floor(Math.random() * 6) + 1, 
        isHeld: false, 
        id: nanoid()
      }
    })
  }

  const diceElements = dice.map(dieObj => 
            <Die key={dieObj.id}
                value={dieObj.value} 
                isHeld={dieObj.isHeld} 
                hold={hold} 
                id={dieObj.id}
                />)

  function rollDice(){
    setDice(prevDice => prevDice.map(die => die.isHeld === false ? {...die, value: Math.floor(Math.random() * 6) + 1 } : die))
  }

  function hold(id){
    setDice(prevDice => prevDice.map(die => id === die.id ? {...die, isHeld: !die.isHeld}: die))
  }

  function handleClick(){
    if (gameWon) {
      setDice(generateRandomNumber())
    } else {
      rollDice()
    }
  }

  return (
     <main>
      {gameWon && <Confetti />}

      <div aria-live='polite' className='sr-only'>
        {gameWon && <p>Congratulations! You won the game. Press the new game button</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
        <button ref={buttonRef} className='roll-dice' onClick={handleClick}>{ gameWon ? 'New Game' : 'Roll'}</button>
     </main>
  )
}
 
export default App

import { Button } from '@mui/material';
import React, { useState } from 'react';

const words = ["apple", "banana", "book", "lemon", "brother", "car", "grapes",  "chair", "dog", "cat", "tree", "sun", "moon",  "door", "glass", "pencil",  "mango",  "orange", "pen", "river", "bike" ];



const SpellCheck = () => {
  const [randomWord, setRandomWord] = useState('');
  const [input, setInput] = useState('');
  const [flag, setFlag]= useState(false);
  const [flag2, setFlag2]= useState(false);

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    setRandomWord(word);
    const msg = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(msg);
  };

  const handleSubmit = () => {
    const result = input.toLowerCase() === randomWord;
    const msg = new SpeechSynthesisUtterance(result ? 'correct' : 'incorrect');
    window.speechSynthesis.speak(msg);
    if(result){
      setFlag(true)
      setFlag2(false)
    }
    else{
      setFlag2(true)
      setFlag(false)

    }
    
   
  };

  const handleTryAnother = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    setRandomWord(word);
    const msg = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(msg);
    setInput('');
    setFlag(false)
    setFlag2(false)

  };

  return (
    <div className='spell'>
      
      
    <div className='read'>
      {randomWord ? (
        <>
          <input type="text" value={input} onChange={e => setInput(e.target.value)} />
          <br></br>
          <div className='buttons'>
          <button className="myButton" onClick={handleSubmit}>Submit</button>
          <br></br>
          <button className="myButton" onClick={handleTryAnother}>Next Word</button>
          </div>
          <div>
            <br></br>
        {flag ? (<div><img src="https://media.giphy.com/media/xDXO8CsRByzSa1GZiF/giphy.gif"/>
                  
                  </div>): <></> }
        {flag2 ? (<div><img src="https://media.giphy.com/media/39Zs6k1mvNkZ2/giphy.gif"/>
                  
                  </div> ) : <></> }
      </div>
        </>
      ) : (
         <button className="myButton" style={{width:"100%"}} onClick={handleClick}>Read Aloud and Guess</button>
      )}
    </div>
    </div>
  );
};

export default SpellCheck;
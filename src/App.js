import React, { useEffect, useState } from 'react';

import wordsList from './services/words.json';
import Timer from './components/Timer';
import Results from './components/Results';

export default function App () {
  
  const [word, setWord] = useState("");
  const [matched, setMatched] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [totalWords, setTotalWords] = useState([]);
  const [keyStrokes, setKeyStrokes] = useState(0);
  const [rightKeyStrokes, setRightKeyStrokes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  const getNewWord = () => {
    const index = Math.floor(Math.random() * (wordsList.length-1));

    return wordsList[index].toLowerCase();
    
  }

  const handleSpellcheck = (inputKeys) => {
    const key = inputKeys[inputKeys.length-1];
    setKeyStrokes(prev => prev + 1);
    
    if( key !== word[0] ) return null
    
    if( key === word[0] ) {
      const newWord = getNewWord();
      setRightKeyStrokes(prev => prev + 1)

      setMatched(prev => [...prev, key]);

      setWord(prev => {
        if(prev.length > 1) {
          return prev.slice(1)
        } else {
          setMatched([]);
          setTotalWords( prev => {
            if(newWord !== prev[0]) {              
              return [newWord, ...prev]
            } else return [...prev];
          });   
          return newWord         
        }
      });   

    }

  }

  useEffect(() => {
    const firstWord = getNewWord();
    setWord(firstWord);
    setTotalWords( [firstWord] );
    setInputValue("");
  },[])

  if(seconds === 60){
    return <Results cpm={keyStrokes} maxWords={totalWords.length-1} acc={`${(rightKeyStrokes/keyStrokes*100).toFixed()}`} />
  }

  return (
    <div className="container">

      <div>
        {keyStrokes === 0 ? "Start Typing" : <Timer updateSeconds={arg => setSeconds(arg)} />}
      </div>
    
      <div className="validKeys">
        <span className="matched">
          {matched}
        </span>

        <span className="remainder">
          {word}
        </span>
      </div>

      <input className="typedKeys"
        autoComplete="off" name="hidden" type="text" autoFocus={true}
        onChange={ e => {setInputValue(e.target.value); handleSpellcheck(e.target.value);} }
        value={inputValue}>
      </input>

      <div className="completedWords">        
        
          {totalWords.map((word, idx) =>
            <p key={idx}>
              {`${totalWords.length-idx}. ${word}`}
            </p>        
          )}
              
      </div>
    

    </div>
  )

}

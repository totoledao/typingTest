import { useState, useEffect } from "react";

export default function Results ({cpm, maxWords, acc }) {

  const [animatedCpm, setAnimatedCpm] = useState(0);
  const [animatedMaxWords, setAnimatedMaxWords] = useState(0);
  const [animatedAcc, setAnimatedAcc] = useState(0);


  const ProgressCircle = ({number, text, maxNumber = 100}) => { 

    // Normalize number in a 0 to 1 scale and convert it to the respective *strokeDashoffset*
    // 472 is a magic number achieved by testing
    function toPathOffset (number, maxNumber) {
      let result;
      let proporcional = number/maxNumber;

      if(number > maxNumber) {
        return 472;
      }
      
      if(number < 0 || null) {
        return 0;
      }
      
      result = proporcional*472;

      return result
    }

    // Normalize number in a 0 to 1 scale and convert it to its respective RGB color
    // being 0% red, 50% yellow and 100% green
    function toProgressionColor (number, maxNumber) {
      let result;
      let proporcional = number/maxNumber;
      
      if(proporcional <= 0.5){
        result = `rgb(
          ${255},
          ${2*proporcional*255},
          0)`;
      }
      
      if(proporcional > 0.5){
        result = `rgb(
          ${((1-proporcional)*2*255)},
          ${255},
          0)`;
      }

      return result
    }

    return (
      <svg width="200" height="200">      
        <g transform-origin="center" transform=" rotate(-90)" >
          <path fill="none" stroke={toProgressionColor (number, maxNumber)} strokeWidth="1rem"
          d="M 175, 100 a75,75 0 1,1 0,-.00001"
          />
          <path fill="none" stroke="#e1e1e1" strokeWidth="1rem"
          strokeDasharray="472" strokeDashoffset={`${toPathOffset(number, maxNumber)}`}
          d="M 175, 100 a75,75 0 1,1 0,-.00001"
          />
        </g>
        <text x="50%" y="50%" fill="#e1e1e1" dominantBaseline="central" textAnchor="middle"> {number} <br/> {text}</text>        
      </svg>
    )
  }

  const ResultText = () => {
    let text;

    if(maxWords <= 35) {
      text = "There's definitely room for improvement. Your typing speed is below average."
    }
    if(maxWords > 35 && maxWords <= 45 ) {
      text = "Not bad, your typing speed is average."
    }
    if(maxWords > 45 && maxWords <= 59 ) {
      text = "Congratulations! Your typing speed is above average."
    }
    if(maxWords > 59 && maxWords <= 79 ) {
      text = "You sure can type! At this speed you could be a professional typist."
    }
    if(maxWords > 79 ) {
      text = "You're really good at typing! Keyboard go VROOOM"
    }

    return <p> <br/> {text} </p>
    
  }


  useEffect(() => {
    animate((arg) => setAnimatedCpm(arg), cpm);
    animate((arg) => setAnimatedMaxWords(arg), maxWords);
    animate((arg) => setAnimatedAcc(arg), acc);
  },[acc, cpm, maxWords])

  const animate = (func, max) => {    
      setInterval(() => {               
        func(prev => { 
          if(prev >= max) {
            clearInterval();
            return max
          }else return prev + 1
        });          
      }, 20);   
  }

  return (
    <div className="container">

      <div className="results">        
        <ProgressCircle number={animatedCpm} text="CPM" maxNumber={475} />
        <ProgressCircle number={animatedMaxWords} text="WPM"/>
        <ProgressCircle number={animatedAcc} text="% ACC"/>
      </div>

      <div>
        <p style={{fontSize:"2rem"}}>
          <br/> You typed {maxWords} {maxWords === 1 ? "word" : "words"} in a minute!
        </p>
        
        <ResultText />     
      </div>

      <div style={{paddingTop:"6em", opacity:"0.5"}}>        
        <p> The average typing speed is around 40 words per minute or 175 characters per minute. </p>
        <br />
        <p> Around 65 words per minute or 325 characters per minute is the desired typing speed for high productivity. </p>
      </div>

    </div>
  )
}
import React, { useEffect, useState } from 'react';

export default function Timer (props) {

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    if (seconds === 60){
      setSeconds(0);
      setMinutes(prev => prev + 1)
    } else {      
        setTimeout(() => {
          setSeconds(prev => prev + 1)
        }, 1000);
    }
    props.updateSeconds(seconds);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds])

  return (
    <p> {
    minutes.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
    + ":" +
    seconds.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })} </p>
  )
}
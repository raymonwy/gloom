import './App.css';
import DisplayComponents from './ClockComponents/DisplayComponents.js';
import ButtonComponents from './ClockComponents/ButtonComponents.js';
import fiveAudio from './sounds/fiveSeconds.mp4';
import fifteenAudio from './sounds/15Seconds.mp4';
import React, {useState} from 'react';

var fiveSeconds = new Audio(fiveAudio);
var fifteenSeconds = new Audio(fifteenAudio);

function App() {
  const [time, setTime] = useState({m:30,s:0});
  const [interv,setInterv] = useState();
  const [status, setStatus] = useState(0);
  var updatedM = time.m, updatedS = time.s;
  var bucket = 0;

  
  
  function start(){
    run();
    setStatus(1);
    setInterv(setInterval(run,999));
  }

  function blink(){
    var border = document.getElementById("border");
    (border.classList.contains("blink") ? border.classList.remove("blink") : border.classList.add("blink"));
  }

  function testDuration(){
    var border = document.getElementById("border");
    ( (border.style.color === "red" ) ? border.style.color = "white" : border.style.color = "red");
  }

  function displayReset(){
    var border = document.getElementById("border");
     border.classList.remove("blink");
     border.style.color = "white";
  }

  
  function run() {
    if( updatedM === 0 && updatedS === 0){
      return;
    }

    if (updatedS === 0){
      updatedM--;
      updatedS = 60;
    }
    
    if (bucket === 57){
      bucket = 0;
      blink();
      testDuration();
    }

    if (bucket === 52){
      fiveSeconds.play();
    }

    if(bucket === 36){
      displayReset();
    }
    if (bucket === 42){
      fifteenSeconds.play();
      blink();
    }
    updatedS--;
    bucket++;
    return setTime({m:updatedM,s:updatedS});
  }

  function stop(){
    clearInterval(interv);
    setStatus(2);
  }
  
  function reset(){
    clearInterval(interv);
    setStatus(0);
    displayReset();
    return setTime({m:30,s:0});
  }

  
  return (
    <section className="timer-container">
      <section className="timer">
       
        <div id = "border" className="digits">
          <DisplayComponents time = {time}/>
          
        </div>
        
        <ButtonComponents status = {status} stop = {stop} reset = {reset} start = {start} />
        
        </section>
    </section>
  );
}

export default App;

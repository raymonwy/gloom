import './App.css';
import DisplayComponents from './ClockComponents/DisplayComponents.js';
import ButtonComponents from './ClockComponents/ButtonComponents.js';
import fiveAudio from './sounds/fiveGround.mp4';
import fifteenAudio from './sounds/15seconds.mp4';
import React, {useState} from 'react';
import { prettyDOM } from '@testing-library/dom';

var fiveSeconds = new Audio(fiveAudio);
var fifteenSeconds = new Audio(fifteenAudio);
var bucket = 0;

var testStart = 57;
var testDuration = 33;
var blinkDuration = 15;
var preTestDuration = 5;
var blinkStart = testStart - blinkDuration;
var nextTime = {m:0,s:0};
var currTime = {m:30,s:0};
var prevTime = {m:0,s:0};
var blinkDur = {m:0,s:0};
var testDur = {m:0,s:0};
var pretestDur = {m:0,s:0};

function App() {
  const [time, setTime] = useState({m:30,s:0});
  const [interv,setInterv] = useState();
  const [status, setStatus] = useState(0);
  var updatedM = time.m, updatedS = time.s;
  
  timeCalculate(currTime,nextTime,testStart);
  timeCalculate(nextTime,blinkDur,-blinkDuration);
  timeCalculate(nextTime,testDur,testDuration);
  timeCalculate(nextTime,pretestDur,-preTestDuration);

  function start(){
    
    
    run();
    setStatus(1);
    setInterv(setInterval(run,999));
  }

  function setNewTime(timePeriod,m,s){
    timePeriod.m = m;
    timePeriod.s = s;
  }

  function timeCalculate(from,to,change){
    
    if(change > from.s){
      var remainder = change - from.s;
      to.s = 60 - remainder;
      to.m = from.m- 1;
    }
    else{
      to.s = from.s - change;
      to.m = from.m;
      if(to.s > 60){
        to.s = from.s - 60;
        to.m = from.m + 1;
      }
    }
  }

  function goBackTime(){
      setNewTime(nextTime,currTime.m,currTime.s);
      setNewTime(currTime,prevTime.m,prevTime.s);
      timeCalculate(currTime,prevTime,-testStart);
      timeCalculate(prevTime,testDur,testDuration);
      timeCalculate(currTime,blinkDur,-blinkDuration);
  }

  function skipAheadTime(){
      setNewTime(prevTime,currTime.m,currTime.s);
      setNewTime(currTime,nextTime.m,nextTime.s);
      timeCalculate(currTime,nextTime,testStart);
      timeCalculate(currTime,testDur,testDuration);
      timeCalculate(nextTime,blinkDur,-blinkDuration);
  }

  function blink(){
    var border = document.getElementById("border");
    (border.classList.contains("blink") ? border.classList.remove("blink") : border.classList.add("blink"));
  }

  function test(){
    var border = document.getElementById("border");
    ( (border.style.color === "red" ) ? border.style.color = "white" : border.style.color = "red");
  }

  function displayReset(){
    var border = document.getElementById("border");
     border.classList.remove("blink");
     border.style.color = "white";
  }

  
  function run() {
    console.log("prev time:" + prevTime.m +":"+prevTime.s + "\n curr time: " + currTime.m +":"+currTime.s + "\n next time: " + nextTime.m +":"+ nextTime.s + "\n blink test: " + blinkDur.m + ":"+blinkDur.s + "\n test dur: " + testDur.m + ":" + testDur.s + "\n pre test:" + pretestDur.m + ":" + pretestDur.s );
    if( updatedM === 0 && updatedS === 0){
      return;
    }
    if (updatedS === 0){
      updatedM--;
      updatedS = 60;
    }
    if(updatedM === blinkDur.m && updatedS === blinkDur.s){
      fifteenSeconds.play();
      blink();
    }
    if(updatedM === pretestDur.m && updatedS === pretestDur.s){
      fiveSeconds.play();
    }
    if(updatedM === nextTime.m && updatedS === nextTime.s){
      test();
      blink();
      skipAheadTime();
    }
    if(updatedM === testDur.m && updatedS === testDur.s){
      test();
    }
    updatedS--;
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

  function addSecond(){
    stop();
    if(updatedM === prevTime.m && updatedS === prevTime.s){
      goBackTime();
    }
    if(updatedM !== 30){
      updatedS++;
      
      if(updatedS === 60){
         updatedM++;
         updatedS = 0;
      }
    }
    
    return setTime({m:updatedM,s:updatedS});
  }
  
  function subtractSecond(){
    stop();
    if(updatedM === nextTime.m && updatedS === nextTime.s){
      skipAheadTime();
    }
    if(updatedM !== 0 && updatedS !== 0){
      updatedS--;
      if(updatedS === 0){
        updatedM--;
      }
    }
    
    return setTime({m:updatedM,s:updatedS});
  }

  return (
    <section className="timer-container">
      <section className="timer">
       
        <div id = "border" className="digits">
          <DisplayComponents time = {time}/>
          
        </div>
        
        <ButtonComponents status = {status} stop = {stop} reset = {reset} start = {start} addSecond={addSecond} subtractSecond ={subtractSecond} />
        
        </section>
    </section>
  );
}

export default App;

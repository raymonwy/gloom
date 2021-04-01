import './App.css';
import DisplayComponents from './ClockComponents/DisplayComponents.js';
import ButtonComponents from './ClockComponents/ButtonComponents.js';
import fiveAudio from './sounds/fiveGround.mp4';
import fifteenAudio from './sounds/15seconds.mp4';
import React, {useState} from 'react';


var fiveSeconds = new Audio(fiveAudio);
fiveSeconds.volume = 1;
var fifteenSeconds = new Audio(fifteenAudio);
fifteenSeconds.volume = 1;

var testStart = 57;
var testDuration = 33;
var blinkDuration = 15;
var preTestDuration = 5;
var blinkStart = testStart - blinkDuration;
var blankStart = testStart -(testDuration +blinkDuration);
var nextTime = {m:0,s:0};
var currTime = {m:0,s:0};
var prevTime = {m:30,s:0};
var blinkDur = {m:0,s:0};
var testDur = {m:0,s:0};
var pretestDur = {m:0,s:0};


function App() {
  const [time, setTime] = useState({m:30,s:0});
  const [interv,setInterv] = useState();
  const [status, setStatus] = useState(0);
  var updatedM = time.m, updatedS = time.s;
  
  if(status === 0){
    
    timeCalculate(currTime,prevTime,testStart);
    timeCalculate(nextTime,currTime,testStart);
    timeCalculate(blinkDur,currTime,-blinkDuration);
    timeCalculate(testDur,currTime,testDuration);
    timeCalculate(pretestDur,currTime,-preTestDuration);
  }

  function start(){
    run();
    setStatus(1);
    setInterv(setInterval(run,999));
  }

  function setNewTime(to, from){
    to.m = from.m;
    to.s = from.s;
  }

  function timeCalculate(to,from,change){
    if(change > from.s){
      var remainder = change - from.s;
      to.s = 60 - remainder;
      to.m = from.m- 1;
    }
    else{
      to.s = from.s - change;
      to.m = from.m;
      if(to.s > 60){
        to.s = to.s - 60;
        to.m = from.m + 1;
      }
      if(to.s === 60){
        to.s = 0;
        to.m++;
      }
    }
    console.log("\nto :" + to.m + ":" + to.s)
  }

  function goBackTime(){
      setNewTime(nextTime,currTime);
      setNewTime(currTime,prevTime);
      timeCalculate(prevTime,currTime,-testStart);
      timeCalculate(testDur, currTime, testDuration);
      timeCalculate(blinkDur,currTime,-blinkDuration);
      timeCalculate(pretestDur,currTime,-preTestDuration);
  }
  
  function skipAheadTime(){
      setNewTime(prevTime,currTime);
      setNewTime(currTime,nextTime);
      timeCalculate(nextTime,currTime,testStart);
      timeCalculate(testDur,currTime,testDuration);
      timeCalculate(blinkDur,currTime,-blinkDuration);
      timeCalculate(pretestDur,currTime ,-preTestDuration);
  }

  function blinkStart(){
    var border = document.getElementById("border");
    if (!(border.classList.contains("blink"))){
      border.classList.add("blink");
    } 
  }

  function blinkEnd(){
    var border = document.getElementById("border");
    if (border.classList.contains("blink")) {
      border.classList.remove("blink");
    } 
  }

  function testBegin(){
    var border = document.getElementById("border");
    border.style.color = "red"; 
  }
  function testEnd(){
    var border = document.getElementById("border");
    border.style.color = "white" ;
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
    if((updatedM <= blinkDur.m && updatedS <= blinkDur.s) && (updatedM >= currTime.m || updatedS > currTime.s)){
      
      if(updatedM === blinkDur.m && updatedS === blinkDur.s){
        fifteenSeconds.play();
      }
      blinkStart();
    }
    if((updatedM <= currTime.m || updatedS <= currTime.s) && (updatedM >= testDur.m || updatedS > testDur.s)){
      if(updatedM === pretestDur.m && updatedS === pretestDur.s){
        fiveSeconds.play();
      }
      blinkEnd();
      testBegin();
    }

    if(updatedM === testDur.m && updatedS === testDur.s){
      skipAheadTime();
    }
    
    if(!((updatedM < currTime.m || updatedS <= currTime.s) && (updatedM > testDur.m || updatedS > testDur.s))){
        testEnd();
    }

    if(!((updatedM <= blinkDur.m && updatedS <= blinkDur.s) && (updatedM > currTime.m || updatedS > currTime.s))){
      blinkEnd();
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
    prevTime.m = 30;
    prevTime.s = 0;
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
    if(updatedM === testDur.m && updatedS === testDur.s){
      skipAheadTime();
    }
    if(!(updatedM === 0 && updatedS === 0)){
      if(updatedS === 0){
        updatedS = 60;
        updatedM--;
      }
      updatedS--;
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

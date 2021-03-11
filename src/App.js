
import './App.css';
import DisplayComponents from './ClockComponents/DisplayComponents.js';
import ButtonComponents from './ClockComponents/ButtonComponents.js';
import React, {useState} from 'react';

function App() {
  const [time, setTime] = useState({m:30,s:0});
  const [interv,setInterv] = useState();
  const [status, setStatus] = useState(0);
  var updatedM = time.m, updatedS = time.s;
  
  function start(){
    run();
    setStatus(1);
    setInterv(setInterval(run,1000));
  }
  function run() {
    if (updatedS === 0){
      updatedM--;
      updatedS = 60;
    }
    updatedS--;
    return setTime({m:updatedM,s:updatedS});
  }

  function stop(){
    clearInterval(interv)
    setStatus(2);
  }
  
  function reset(){
    clearInterval(interv)
    setStatus(0);
    return setTime({m:30,s:0});
  }

  return (
    <section className="timer-container">
      <section className="timer">
       
        <div className="digits">
          <DisplayComponents time = {time}/>
          
        </div>
        
        <ButtonComponents status = {status} stop = {stop} reset = {reset} start = {start} />
        
        </section>
    </section>
  );
}

export default App;

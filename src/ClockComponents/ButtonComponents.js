
import React from 'react';

function ButtonComponents(props) {
    return (
       <div>
           {(props.status === 0)?
                <div >   
                <button className="startButton" onClick ={props.start}  > start </button>
                </div> : ""

         }
            {(props.status === 1)?
                <div>
                    <button className="stopButton" onClick ={props.stop} > stop </button>
                    
                </div> : ""
            }

            {(props.status === 2)?
                <div>
                    <button className="resumeButton" onClick ={props.start} > resume </button>
                    
                </div> : ""
            }
            
            {(props.status !== 0)?
                <div >
                    
                    <button className="resetButton" onClick ={props.reset} > reset </button>
                </div> : ""
            }       

       </div>
      );
}

export default ButtonComponents;

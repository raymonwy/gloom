
import React from 'react';

function ButtonComponents(props) {
    return (
       <div>
           {(props.status === 0)?
                <div >   
                <button className="playButton" onClick ={props.start}  > start </button>
                </div> : ""

         }
            {(props.status === 1)?
                <div>
                    <button className="playButton" onClick ={props.stop} > stop </button>
                </div> : ""
            }

            {(props.status === 2)?
                <div>
                    <button className="playButton" onClick ={props.start} > resume </button>
                </div> : ""
            }
            
            {(props.status !== 0)?
                <div >
                    <button type="submit" className="resetButton" onClick ={props.reset} > reset </button>
                </div> : ""
            }       
            
       </div>
      );
}

export default ButtonComponents;

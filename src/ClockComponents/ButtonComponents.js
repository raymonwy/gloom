
import React from 'react';
import refresh from '../pics/reset.svg'

function ButtonComponents(props) {
    return (
       <div>
           {(props.status === 0)?
                <div >   
                <button className="playButton" title="play" onClick ={props.start}  >  </button>
                </div> : ""

         }
            {(props.status === 1)?
                <div>
                    <button className="playButton" title="stop" onClick ={props.stop} >  </button>
                </div> : ""
            }

            {(props.status === 2)?
                <div>
                    <button className="playButton" title="resume" onClick ={props.start} >  </button>
                </div> : ""
            }
            
            {(props.status !== 0)?
                <div >
                    <img src={refresh}  className="resetButton" title="reset" alt="reset" onClick ={props.reset}></img>
                </div> : ""
            }       
            
       </div>
      );
}

export default ButtonComponents;

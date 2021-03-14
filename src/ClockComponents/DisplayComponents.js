import '../App.css';
import React from 'react';

function DisplayComponents(props) {
    return (  
        <div >
            
                <section >
                     <span>{(props.time.m >= 10 ? props.time.m :"0" + props.time.m)} </span>
                    <span>: </span>
                    <span>{(props.time.s >= 10 ? props.time.s :"0" + props.time.s)} </span>
                </section>
               
            
        </div>
        
        );
}

export default DisplayComponents;
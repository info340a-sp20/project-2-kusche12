import React from 'react'
import './index.css';

// Groups similar Answer Fields together
// Either a correct answer choice or an incorrect answer choice
function AnswerChoice(props) {
    let inputName = 'ans' + props.index;
    if (props.answer[1]) {
      return (
        <label>
        Answer {props.index + 1}
            <input className='check-box'
                  checked
                  name={inputName} 
                  type="checkbox" 
                  value="true" 
                  onClick={props.handleCorrect} />
            <input className='text-input'
                  name={inputName} 
                  type='text' 
                  value={props.answer[0]} 
                  onChange={props.handleInput} />
      </label>
      );
    }
    return (
      <label>
        Answer {props.index + 1}
            <input className='check-box'
                  name={inputName} 
                  type="checkbox" 
                  value="true" 
                  onClick={props.handleCorrect} />
            <input className='text-input'
                  name={inputName} 
                  type='text' 
                  value={props.answer[0]} 
                  onChange={props.handleInput} />
      </label>
    );
}

export default AnswerChoice;
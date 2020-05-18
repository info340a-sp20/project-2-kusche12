import React from 'react';
import './index.css';

// User can delete current card
// Render correct card and MakerSpace based on position <-- Work on this one next
// User can finish and save their quiz to the homescreen

class MakerSpace extends React.Component {  
    render() {
      let answerChoices = [];
      for (let i = 0; i < 4; i++) {
        answerChoices.push(<AnswerChoice answer={this.props.answers[i][0]} handleInput={this.props.handleInput} handleCorrect={this.props.handleCorrect} key={i} index={i}  />);
      }
  
      return (
        <div className='maker-space'>
          <div>
            <h3>Maker Space</h3>
            <form>
              <label>
                Question
                  <input
                    className="text-input"
                    name='question'
                    type='text'
                    value={this.props.question}
                    onChange={this.props.handleInput} 
                  />
              </label>
              {answerChoices}
              <button onClick={this.props.addCard}>Add Question</button>
            </form>
            <p>Number of Questions: {this.props.numCards + 1}</p>
          </div>
      </div>
      )
    }
}

// Groups similar Answer Fields together
function AnswerChoice(props) {
    let inputName = 'ans' + props.index;
    return (
      <label className="answer-choice">
        Answer #{props.index + 1}
          <input name={inputName} type="checkbox" value="true" onClick={props.handleCorrect} />
          <input className="text-input" name={inputName} type='text' value={props.answer} onChange={props.handleInput} />
      </label>
    );
}

export default MakerSpace;
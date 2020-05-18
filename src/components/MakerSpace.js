import React from 'react';
import './index.css';

// User MUST have a question
// User MUST have at least one correct answer
// User MUST have at least 2 answers filled out
// Move the console logs from the error handler into the virtual DOM app.
// User can finish and save their quiz to the homescreen

class MakerSpace extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      missingQuestion: false,
      missingAnswer: false
    }
  } 

  // Error handlers for maker form
  addCardHandler = (event) => {
    event.preventDefault();
    this.setState({
      missingQuestion: false,
      missingAnswer: false
    })

    // No question given
    if (this.props.question === '') {
      this.setState({
        missingQuestion: true
      });
    }

    // Check for correct number of answers and correct choice
    let numCorrect = 0;
    let numGiven = 0;
    let answers = this.props.answers
    for (let i = 0; i < answers.length; i++) {
      if (answers[i][0]) {
        numGiven++;
      } else if (answers[i][1]) {
        numCorrect++;
      }
    }
    if (numGiven < 4) {
      this.setState({
        missingAnswer: true,
      });
      console.log('Must give at least 2 answer choices');
    }
  }

  render() {

    let answerChoices = [];
    for (let i = 0; i < 4; i++) {
      answerChoices.push(<AnswerChoice 
                          answer={this.props.answers[i][0]} 
                          handleInput={this.props.handleInput} 
                          handleCorrect={this.props.handleCorrect} 
                          missingAnswer={this.state.missingAnswer} 
                          key={i} index={i}  />);
    }

    return (
      <div className='maker-space'>
        <div>
          <h3>Maker Space</h3>
          <form>
            <label>
              Question
                <input
                  className={`text-input${this.state.missingQuestion ? ' error-notif': ''}`}
                  name='question'
                  type='text'
                  value={this.props.question}
                  onChange={this.props.handleInput} 
                />
            </label>
            {answerChoices}
            <button onClick={this.addCardHandler}>Add Question</button>
          </form>
          <p>Question #{this.props.numCards + 1}</p>
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
          <input className={`text-input${props.missingAnswer ? ' error-notif': ''}`}
          name={inputName} type='text' value={props.answer} onChange={props.handleInput} />
      </label>
    );
}

export default MakerSpace;
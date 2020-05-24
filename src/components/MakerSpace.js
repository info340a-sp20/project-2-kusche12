import React from 'react';
import './index.css';
import Card from './Card';
import ErrorAlert from './ErrorAlert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

/* FEATURES 
-- Redo all of the error handling only upon user submit
-- Remember to update the final card's state to master upon submission!
-- Submit to firebase
-- Consider making a Buttons.js class to clean up the render code

   STYLE
-- Set up everything for ReactStrap
-- Demonstrate which answers are the correct ones visually (on the card)
*/

class MakerSpace extends React.Component { 
  constructor(props) {
    super(props);
    let originalQuestion = this.props.question;
    let originalAnswers = this.props.answers;
    let originalErrors = this.props.errorcode;

    this.state = {
      question: originalQuestion,
      answers: originalAnswers,
      errorcode: originalErrors
    }
  } 

  handleInput = (event) => {
    if (event.target.name === 'question') {
      this.setState({question: event.target.value});
    } else {
      let answersCopy = arrayClone(this.state.answers);
      let pos = parseInt(event.target.name.substring(3, 4));
      answersCopy[pos][0] = event.target.value;
      this.setState({ answers: answersCopy });
    }
  }

  // Labels answer choices as correct/incorrect due to user input
  handleCorrect = (event) => {
    let answersCopy = arrayClone(this.state.answers);
    let pos = parseInt(event.target.name.substring(3, 4));
    answersCopy[pos][1] = !answersCopy[pos][1];
    console.log(answersCopy[pos]);
    this.setState({answers: answersCopy});
  }

  moveCardHandler = (event) => {
    event.preventDefault();
    this.checkForErrors();
    this.props.moveCard(event, this.state.question, this.state.answers);
  }

  // Update the state of the current Maker Space and Card position
  componentDidUpdate(prevProps) {
    if (this.props.question !== prevProps.question) {
      this.setState({
        question: this.props.question,
        answers: this.props.answers
      });
    }
  }

  checkForErrors = (event) => {
    // check for no question
    let errorsCopy = arrayClone(this.state.errorcode);
    if (this.state.question === "") {
      errorsCopy[0] = 1;
      this.setState({errorcode: errorsCopy});
    }

    // check for less than 2 answers and no correct answers
    let answerCount = 0;
    let correctCount = 0;
    let answers = this.state.answers
    for (let i = 0; i < answers.length; i++) {
      if (answers[i][0]) answerCount++;
      if (answers[i][1]) correctCount++;
    }
    if (answerCount < 2) {
      errorsCopy[1] = 1;
      this.setState({errorcode: errorsCopy});
    }
    if (correctCount < 1) {
      errorsCopy[2] = 1;
      this.setState({errorcode: errorsCopy});
    }
  }

  render() {
    let answerChoices = [];
    for (let i = 0; i < 4; i++) {
      answerChoices.push(<AnswerChoice 
                          answer={this.state.answers[i]} 
                          handleInput={this.handleInput} 
                          handleCorrect={this.handleCorrect} 
                          missingAnswer={this.state.missingAnswer}
                          key={i} index={i}  />);
    }

    return (
      <div className="maker-space-cover">
        <form className="maker">
            <label>
              Question
                <input className='text-input question-input' name='question' type='text' value={this.state.question}onChange={this.handleInput} />
            </label>
            {answerChoices}
            <button value='add' onClick={this.props.addCard}>Add Question&emsp;<FontAwesomeIcon icon={faPlusCircle} /></button>
            <button alue='delete' onClick={this.props.deleteCard}>Delete Question</button>
            <div className="btn-directions">
              <button value='prev' onClick={this.moveCardHandler}>Backward</button>
              <button value='next' onClick={this.moveCardHandler}>Forward</button>
            </div>
            <button value='submit' onClick={this.props.submitQuiz}>Done</button>
        </form>
        <div className="card-error-cover">
          <ErrorAlert errorcode={this.state.errorcode} />
          <Card question={this.state.question} answers={this.state.answers} questionNumber={this.props.questionNumber} />
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
        Answer {props.index + 1}
            <input className={`checkbox${props.answer[1] ? ' checked': ''}`}
                  name={inputName} 
                  type="checkbox" 
                  value="true" 
                  onClick={props.handleCorrect} />
            <input className={`text-input${props.missingAnswer ? ' error-notif': ''}`}
                  name={inputName} 
                  type='text' 
                  value={props.answer[0]} 
                  onChange={props.handleInput} />
      </label>
    );
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default MakerSpace;
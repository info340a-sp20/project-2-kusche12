import React from 'react';
import './index.css';
import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

/* FEATURES 
-- Redo all of the error handling only upon user submit
-- Remember to update the final card's state to master upon submission!

   STYLE
-- Set up everything for ReactStrap
-- Demonstrate which answers are the correct ones visually (on the card)
*/

class MakerSpace extends React.Component { 
  constructor(props) {
    super(props);
    let originalQuestion = this.props.question;
    let originalAnswers = this.props.answers;

    this.state = {
      question: originalQuestion,
      answers: originalAnswers,
      missingAnswer: false,   // check for missing answers
      missingQuestion: false, // check for missing question
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


    this.props.submitQuiz(event, this.state.question, this.state.answers);
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
      <div className="maker-cover">
        <form>
            <h3>Maker Space</h3>
            <label>
              Question
                <input
                  className={`text-input question-input ${this.state.missingQuestion ? ' error-notif': ''}`}
                  name='question'
                  type='text'
                  value={this.state.question}
                  onChange={this.handleInput} 
                />
            </label>
            {answerChoices}
            <p className='error-message'>{this.state.errorMessage}</p>
            <button className='btn btn-add' value='add' onClick={this.props.addCard}>Add Question&emsp;<FontAwesomeIcon icon={faPlusCircle} /></button>
            <button className='btn btn-del' value='delete' onClick={this.props.deleteCard}>Delete Question&emsp;<FontAwesomeIcon icon={faMinusCircle} /></button>
            <div className="btn-directions">
              <button className='btn' value='prev' onClick={this.moveCardHandler}>Backward</button>
              <p>Question {this.props.questionNumber + 1} / {this.props.totalCards}</p>
              <button className='btn' value='next' onClick={this.moveCardHandler}>Forward</button>
            </div>
            <button className='btn btn-sub' value='submit' onClick={this.checkForErrors}>Done</button>
        </form>
        <Card question={this.state.question} answers={this.state.answers} questionNumber={this.props.questionNumber}/>
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
import React from 'react';
import './index.css';
import Card from './Card';
import ErrorAlert from './ErrorAlert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

/* FEATURES 
-- Make sure the errorcode state is updating for every change of card
-- Remember to update the final card's state to master upon submission!
-- ERR: ErrorAlert fails to load in when you add a new card because it tries to generate before MakerSpace has its own state

   STYLE
-- Set up Bootstrap layout
-- Demonstrate which answers are the correct ones visually (on the card) (i'm thinking a little orange dot to the left of the answer choice)
-- Stylize the error messages
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
    this.props.moveCard(event, this.state.question, this.state.answers, this.state.errorcode);
  }

  // Update the state of the current Maker Space and Card position
  componentDidUpdate(prevProps) {
    if (this.props.question !== prevProps.question) {
      console.log(this.props.errorcode);
      this.setState({
        question: this.props.question,
        answers: this.props.answers,
        errorcode: this.props.errorcode
      });
    }
  }

  checkForErrors = (event) => {
    // check for no question
    let errorsCopy = arrayClone(this.state.errorcode);
    if (this.state.question === "") {
      errorsCopy[0] = 1;
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
    }
    if (correctCount < 1) {
      errorsCopy[2] = 1;
    }
    this.setState({errorcode: errorsCopy});
  }

  render() {
    let answerChoices = [];
    for (let i = 0; i < 4; i++) {
      answerChoices.push(<AnswerChoice answer={this.state.answers[i]} handleInput={this.handleInput} handleCorrect={this.handleCorrect} missingAnswer={this.state.missingAnswer} key={i} index={i}  />);
    }

    return (
      <div className="maker-space-cover container-fluid">
        <div className="row">
          <form className="maker col-xs-6 col-sm-3 col-lg-3">
              <label>
                Question
                  <input className='text-input question-input' name='question' type='text' value={this.state.question}onChange={this.handleInput} />
              </label>
              {answerChoices}
              <button value='add' onClick={this.props.addCard}>Add Question&emsp;<FontAwesomeIcon className='font-plus' icon={faPlusCircle} /></button>
              <button value='delete' onClick={this.props.deleteCard}>Delete Question</button>
          </form>
          <div className="card-error-cover col-xs-6 col-sm-9 col-lg-9">
          {/*
            <ErrorAlert errorcode={this.state.errorcode} /> */}
            <Card question={this.state.question} answers={this.state.answers} questionNumber={this.props.questionNumber} moveCardHandler={this.moveCardHandler} submitQuiz={this.props.submitQuiz}/>
          </div>
        </div>
      </div>
    )
  }
}

// Groups similar Answer Fields together
function AnswerChoice(props) {
    let inputName = 'ans' + props.index;
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

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default MakerSpace;
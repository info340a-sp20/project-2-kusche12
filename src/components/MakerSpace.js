import React from 'react';
import './index.css';
import Card from './Card';
import ErrorAlert from './ErrorAlert';
import AnswerChoice from './AnswerChoice';
import AnswerChoiceCorrect from './AnswerChoiceCorrect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

/* FEATURES 
-- Fix the add card bug when trying to add on an unfinished card

   STYLE
-- Style the Submit Quiz Notification
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

  // Handle Question and Answer choice input text
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
    this.setState({answers: answersCopy});
  }

  // Check and update the card's error status each time the user changes cards
  moveCardHandler = (event) => {
    let errors = this.checkForErrors();
    this.props.moveCard(event, this.state.question, this.state.answers, errors);
  }

  submitQuizHandler = () => {
    let errors = this.checkForErrors();
    this.props.submitQuiz(this.state.question, this.state.answers, errors);
  }

  addCardHandler = (event) => {
    let errors = this.checkForErrors();
    this.props.addCard(event, this.state.question, this.state.answers, errors);
  }

  // Update the state of the current Maker Space and Card position
  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate prevProps:');
    console.log(prevProps.question);
    console.log(this.props.question);
    if (this.props.question !== prevProps.question) {
      this.setState({
        question: this.props.question,
        answers: this.props.answers,
        errorcode: this.props.errorcode
      });
    }
  }

  // Check for all 3 errors for each card
  checkForErrors = () => {
    // no question
    let errorsCopy = [0, 0, 0];
    if (this.state.question === "") {
      errorsCopy[0] = 1;
    }

    let answerCount = 0;
    let correctCount = 0;
    let answers = this.state.answers
    for (let i = 0; i < answers.length; i++) {
      if (answers[i][0]) answerCount++;
      if (answers[i][0] && answers[i][1]) correctCount++;
    }
    // less than 2 answer choices
    if (answerCount < 2) {
      errorsCopy[1] = 1;
    }
    // 0 correct answer choices
    if (correctCount < 1) {
      errorsCopy[2] = 1;
    }
    this.setState({errorcode: errorsCopy});
    return errorsCopy;
  }

  render() {
    let answerChoices = [];
    for (let i = 0; i < 4; i++) {
      if (this.state.answers[i][1]) { // if it is a correct answer, return a checked checkbox
        answerChoices.push(<AnswerChoiceCorrect answer={this.state.answers[i]} handleInput={this.handleInput} handleCorrect={this.handleCorrect} key={i} index={i} />)
      } else { // if it is incorrect, return an unchecked box
        answerChoices.push(<AnswerChoice answer={this.state.answers[i]} handleInput={this.handleInput} handleCorrect={this.handleCorrect} key={i} index={i}  />);
      }
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
              <button value='add' onClick={this.addCardHandler}>Add Question&emsp;<FontAwesomeIcon className='font-plus' icon={faPlusCircle} /></button>
              <button value='delete' onClick={this.props.deleteCard}>Delete Question</button>
          </form>
          <div className="card-error-cover col-xs-6 col-sm-9 col-lg-9">
            <ErrorAlert errorcode={this.state.errorcode || [0, 0, 0]} /> 
            <Card question={this.state.question} answers={this.state.answers} questionNumber={this.props.questionNumber} moveCardHandler={this.moveCardHandler} submitQuizHandler={this.submitQuizHandler}/>
          </div>
        </div>
      </div>
    )
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default MakerSpace;
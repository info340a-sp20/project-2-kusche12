import React from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz: this.props.quiz || [],
      quizArrayPosition: 0,
      displayResultMode: false,
      answer: ""
    };
  }
  // back and forward buttons have their own function because there was an error when you would click on the fontawesome
  // if you can think of a better solution, please implement it haha
  backArrow = (event) => {
    event.target.value = 'prev';
    this.props.moveCardHandler(event);
  }

  forwardArrow = (event) => {
    event.target.value = 'next';
    this.props.moveCardHandler(event);
  }

  viewModeBackArrow = (e) => {
    let pos = this.state.quizArrayPosition;

    if (pos > 0) {
      pos--;
      this.setState({
        quizArrayPosition: pos,
        displayResultMode: false
      })
    }
  }

  viewModeNextArrow = (e) => {
    let pos = this.state.quizArrayPosition;
    let quizArray = this.state.quiz;

    if (pos < quizArray.length - 1) {
      pos++;
      this.setState({
        quizArrayPosition: pos,
        displayResultMode: false
      })
    }
  }

  checkAnswer = (e) => {
    this.setAnswer();
    this.setState({ displayResultMode: true });
  }

  setAnswer() {
    let currentPos = this.state.quiz[this.state.quizArrayPosition].answers;
    currentPos.forEach(answer => {
      if (answer.includes(true)) {
        this.setState({
          answer: answer[0]
        });
      }
    })

  }

  renderQuizBodyViewMode() {
    let quiz = this.state.quiz;
    let pos = this.state.quizArrayPosition;
    let currentPos = quiz[pos];
    let answerTextRender = [];

    currentPos.answers.forEach((answer, i) => {
      if (this.state.displayResultMode === true) {
        if (answer.includes(this.state.answer)) {
          answerTextRender.push(<h5 key={i} className="correct-ans">{answer}</h5>)
        } else {
          answerTextRender.push(<h5 key={i} className="wrong-ans">{answer}</h5>);
        }

      } else {
        if (answer.includes(true)) {
          answerTextRender.push(<h5 key={i} onClick={this.checkAnswer}>{answer}</h5>)
        } else {
          answerTextRender.push(<h5 key={i} onClick={this.checkAnswer}>{answer}</h5>);
        }
      }
    });

    return (
      <div>
        <div className="view card-question-cover">
          <h4>{currentPos.question}</h4>
        </div>
        <div className="view card-answer-group m-auto">
          {answerTextRender}
        </div>
      </div>
    )
  }


  render() {
    let answerTextRender = [];
    let updatedAnswers = this.props.answers;

    if (!this.props.renderMode) {
      updatedAnswers.forEach((answer, i) => {
        if (answer[1]) {
          answerTextRender.push(<h5 className="card-answer-correct" key={i}>{answer}</h5>); // Correct Answer
        } else {
          answerTextRender.push(<h5 key={i}>{answer}</h5>);
        }
      })
    }

    return (
      this.props.renderMode ?
        (
          <div className='card-total-cover'>
            <h3>Question {this.state.quizArrayPosition + 1}</h3>
            <div className="card-buttons-cover">
              <button value='prev'><FontAwesomeIcon onClick={this.viewModeBackArrow} icon={faChevronLeft} size="3x"></FontAwesomeIcon></button>
              <div className="view card">
                {this.renderQuizBodyViewMode()}
              </div>
              <button value='next'>
                <FontAwesomeIcon onClick={this.viewModeNextArrow} icon={faChevronRight} size="3x"></FontAwesomeIcon>
              </button>
            </div>
            <button className="card-submit" value='next' onClick={this.viewModeNextArrow}>Next</button>
          </div>
        )
        :
        (<div className='card-total-cover'>
          <h3>Question {this.props.questionNumber + 1}</h3>
          <div className="card-buttons-cover">
            <button value='prev'><FontAwesomeIcon onClick={this.backArrow} icon={faChevronLeft} size="3x"></FontAwesomeIcon></button>
            <div className="card">
              <div className="card-question-cover">
                <h4>{this.props.question}</h4>
              </div>
              <div className="card-answer-group">
                {answerTextRender}
              </div>
            </div>
            <button value='next'>
              <FontAwesomeIcon onClick={this.forwardArrow} icon={faChevronRight} size="3x"></FontAwesomeIcon>
            </button>
          </div>
          <button className="card-submit" value='submit' onClick={this.props.submitQuizHandler}>Submit</button>
        </div>
        )
    )
  }
}

export default Card;
import React from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Alert, Progress } from 'reactstrap';
import QuizViewModeButton from './QuizViewMode/QuizViewModeButton';
import QuizViewContent from './QuizViewMode/QuizViewContent';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz: this.props.quiz || [],
      quizArrayPosition: 0,
      displayResultMode: false,
      answer: "",
      chosenAnswer: ""
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
    this.setState({
      displayResultMode: true,
      chosenAnswer: e.target.textContent
    });

  }

  renderResultMessage = () => {
    if (this.state.displayResultMode) {
      if (this.state.chosenAnswer === this.state.answer) {
        return (
          <div>
            <Alert color="success">
              Correct!
            </Alert>
          </div>
        )
      } else {
        return (
          <div>
            <Alert color="danger">
              Maybe next time...
            </Alert>
          </div>
        )
      }
    }
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

  render() {
    let answerTextRender = [];
    let updatedAnswers = this.props.answers;
    let currentProgress = '';

    if (!this.props.renderMode) {
      updatedAnswers.forEach((answer, i) => {
        if (answer[1]) {
          answerTextRender.push(<h5 className="card-answer-correct" key={i}>{answer}</h5>); // Correct Answer
        } else {
          answerTextRender.push(<h5 key={i}>{answer}</h5>);
        }
      })
    } else {
      currentProgress = ((this.state.quizArrayPosition + 1) / this.state.quiz.length);
      console.log(currentProgress);
    }

    return (
      this.props.renderMode ?
        (
          <div className='card-total-cover'>
            <div className="text-center">{`${this.state.quizArrayPosition + 1} out of ${this.state.quiz.length}`}</div>
            <Progress max="1" value={currentProgress}></Progress>
            <h3>Question {this.state.quizArrayPosition + 1}</h3>
            {this.renderResultMessage()}
            <div className="card-buttons-cover">
              <QuizViewContent
                quizArrayPosition={this.state.quizArrayPosition}
                quiz={this.state.quiz}
                answer={this.state.answer}
                chosenAnswer={this.state.chosenAnswer}
                checkAnswer={this.checkAnswer}
                displayResultMode={this.state.displayResultMode} />
            </div>
            <QuizViewModeButton
              quizArrayPosition={this.state.quizArrayPosition}
              quiz={this.state.quiz}
              viewModeNextArrow={this.viewModeNextArrow}
            />
          </div>
        )
        :
        (<div className='card-total-cover'>
          <h3>Question {this.props.questionNumber + 1}</h3>
          <div className="card-buttons-cover">
            <button value='prev' onClick={this.backArrow}><FontAwesomeIcon onClick={this.backArrow} icon={faChevronLeft} size="3x"></FontAwesomeIcon></button>
            <div className="card">
              <div className="card-question-cover">
                <p className={'card-question ' + (this.props.question.length > 80 ? 'card-question-short ' : '') + (this.props.question.length > 110 ? 'card-question-shortest ' : '')}>{this.props.question}</p>
              </div>
              <div className="card-answer-group">
                {answerTextRender}
              </div>
            </div>
            <button value='next' onClick={this.forwardArrow}><FontAwesomeIcon onClick={this.forwardArrow} icon={faChevronRight} size="3x"></FontAwesomeIcon></button>
          </div>
          <button className="card-submit" value='submit' onClick={this.props.submitQuizHandler}>Submit</button>
        </div>
        )
    )
  }
}

export default Card;
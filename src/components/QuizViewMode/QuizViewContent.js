import React from 'react';
import '../index.css';
import { Container, Row, Col } from 'reactstrap';

export default class QuizViewModeButton extends React.Component {

  render() {
    let quiz = this.props.quiz;
    let pos = this.props.quizArrayPosition;
    let currentPos = quiz[pos];
    let answerTextRender = [];

    currentPos.answers.forEach((answer, i) => {
      if (this.props.displayResultMode === true) {
        if (answer.includes(this.props.answer)) {
          answerTextRender.push(<h5 key={i} className="correct-ans m-auto">{answer}</h5>)
        } else if (answer.includes(this.props.chosenAnswer)) {
          answerTextRender.push(<h5 key={i} className="your-ans m-auto">{answer}</h5>)
        } else {
          answerTextRender.push(<h5 key={i} className="wrong-ans m-auto">{answer}</h5>);
        }

        // if the resultDisplaymode is false
      } else {
        if (answer.includes(true)) {
          answerTextRender.push(<h5 key={i} className="m-auto" onClick={this.props.checkAnswer}>{answer}</h5>)
        } else {
          answerTextRender.push(<h5 key={i} className="m-auto" onClick={this.props.checkAnswer}>{answer}</h5>);
        }
      }
    });

    return (
      <div className="view card">
        <div className="view card-question-cover">
          <h4 className="view card-question">{currentPos.question}</h4>
          <div className="view card-answer-group m-auto">
            {answerTextRender}
          </div>
        </div>
      </div>
    )
  }
} 

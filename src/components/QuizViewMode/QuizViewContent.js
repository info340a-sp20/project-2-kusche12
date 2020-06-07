import React from 'react';
import '../index.css';
import { Row, Col } from 'reactstrap';

/**
 * To be used in Card.js 
 * 
 */
export default class QuizViewContent extends React.Component {

  render() {
    let quiz = this.props.quiz;
    let pos = this.props.quizArrayPosition;
    let currentPos = quiz[pos];
    let answerTextRender = [];

    currentPos.answers.forEach((answer, i) => {
      // for displaying the results 
      if (this.props.displayResultMode === true) {
        if (answer.includes(this.props.answer)) {
          answerTextRender.push(<p key={i} className="correct-ans m-2" role="button" >{answer}</p>)
        } else if (answer.includes(this.props.chosenAnswer)) {
          answerTextRender.push(<p key={i} className="your-ans m-2" role="button" >{answer}</p>)
        } else {
          answerTextRender.push(<p key={i} className="wrong-ans m-2" role="button" >{answer}</p>);
        }

        // if the resultDisplaymode is false
      } else {
        if (answer.includes(true)) {
          answerTextRender.push(
            <p tabIndex="0" key={i}
              className="m-auto" role="button"
              onClick={this.props.checkAnswer}
              onKeyDown={this.props.keydownCheck}>{answer}</p>
          )
        } else {
          answerTextRender.push(
            <p tabIndex="0" key={i}
              className="m-auto" role="button"
              onClick={this.props.checkAnswer}
              onKeyDown={this.props.keydownCheck}>{answer}</p>
          );
        }
      }
    });

    return (
      <div className="view card">
        <Row className="view card-question-cover">
          <Col className="my-auto">
            <h2 className="view card-question">{currentPos.question}</h2>
          </Col>
        </Row>
        <div className="view card-answer-group mx-auto my-2">
          {answerTextRender}
        </div>
      </div>
    )
  }
} 

import React from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

// back and forward buttons have their own function because there was an error when you would click on the fontawesome
// if you can think of a better solution, please implement it haha

class Card extends React.Component {
    backArrow = (event) => {
      event.target.value = 'prev';
      this.props.moveCardHandler(event);
    }
    forwardArrow = (event) => {
      event.target.value = 'next';
      this.props.moveCardHandler(event);
    }

    render() {
      let answerTextRender = [];
      let updatedAnswers = this.props.answers;
      
      // THIS DOES NOT WORK. IT SHOULD SHOW A DEFAULT ____ WHEN THERE IS NO ANSWER PROVIDED
      for (let i = 0; i < updatedAnswers.length; i++) {
        answerTextRender.push(<h5 key={i}>{updatedAnswers[i]}</h5>);    // User made Answer
      }
    
      return (
        <div className='card-total-cover'>
          <h3>Question {this.props.questionNumber + 1}</h3>
          <div className="card-buttons-cover">
            <button value='prev' onClick={this.props.moveCardHandler}><FontAwesomeIcon onClick={this.backArrow} icon={faChevronLeft} size="3x"></FontAwesomeIcon></button>
            <div className="card">
              <div className="card-question-cover">
                <h4>{this.props.question}</h4>
              </div>
              <div className="card-answer-group">
                {answerTextRender}
              </div>
            </div>
            <button value='next' onClick={this.props.moveCardHandler}>
              <FontAwesomeIcon onClick={this.forwardArrow} icon={faChevronRight} size="3x"></FontAwesomeIcon>
            </button>
          </div>
          <button className="card-submit" value='submit' onClick={this.props.submitQuiz}>Submit</button>
        </div>
      )
    }
}

export default Card;
import React from 'react';
import './index.css';


class Card extends React.Component {
    render() {
      let answerTextRender = [];
      let updatedAnswers = this.props.answers;
      
      // THIS DOES NOT WORK. IT SHOULD SHOW A DEFAULT ____ WHEN THERE IS NO ANSWER PROVIDED
      for (let i = 0; i < updatedAnswers.length; i++) {
        answerTextRender.push(<h4 key={i}>{updatedAnswers[i]}</h4>);    // User made Answer
      }
    
      return (
        <div className='card-title-cover'>
          <h3>Question {this.props.numCards}</h3>
          <div className="card">
            <div className="card-question-cover">
              <h2 className="card-question">{this.props.question}</h2>
            </div>
            <div className="card-answer-group">
              {answerTextRender}
            </div>
          </div>
        </div>
      )
    }
}

export default Card;
import React from 'react';
import './index.css';


class Card extends React.Component {
    render() {
      let answerTextRender = [];
      let updatedAnswers = this.props.answers;
      
      // THIS DOES NOT WORK. IT SHOULD SHOW A DEFAULT ____ WHEN THERE IS NO ANSWER PROVIDED
      for (let i = 0; i < updatedAnswers.length; i++) {
        if (updatedAnswers[i].text === "") {
          answerTextRender.push(<h3 className="card-answer" key={i}>{i}. __________________</h3>); // Default Answer placeholder
        } else {
          answerTextRender.push(<h3 className="card-answer" key={i}>{updatedAnswers[i]}</h3>);    // User made Answer
        }
      }
    
      return (
        <div className="card">
          <h2 className="card-question">{this.props.question}</h2>
          <div className="card-answer-group">
            {answerTextRender}
          </div>
        </div>
      )
    }
}

export default Card;
import React from 'react';
import Card from './Card';
import './index.css';

// User can delete current card
// Render correct card based on position <-- Work on this one next

class MakerSpace extends React.Component {
    constructor(props) {
      super(props);
      let cards = this.props.cards;
      let pos = this.props.cardPosition;
      console.log(cards);
      console.log(pos);
      this.state = {
        question: cards[pos].question,
        answers: cards[pos].answers
      }
    }
  
    // Updates question and specific answers due to user input
    handleInput = (event) => {
      let target = event.target
      if (target.name === 'question') {
        this.setState({question: target.value});
      } else {
        let answersCopy = arrayClone(this.state.answers);
        let pos = parseInt(target.name.substring(3,4));
        answersCopy[pos].text = target.value;
        this.setState({answers: answersCopy});
      }  
    }
  
    // Labels answer choices as correct/incorrect due to user input
    handleCorrect = (event) => {
      let answersCopy = arrayClone(this.state.answers);
      let pos = parseInt(event.target.name.substring(3,4));
      answersCopy[pos].isCorrect = !answersCopy[pos].isCorrect;
      this.setState({answers: answersCopy});
    }
  
    render() {
      let answerChoices = [];
      let answerText = [];
      for (let i = 0; i < 4; i++) {
        answerChoices.push(<AnswerChoice answer={this.state.answers[i].text} handleInput={this.handleInput} handleCorrect = {this.handleCorrect} key={i} index={i}  />);
        answerText.push(this.state.answers[i].text);
      }
  
      return (
        <div className='maker-space'>
          <div>
            <h3>Maker Space</h3>
            <form>
              <label>
                Question
                  <input
                    className="text-input"
                    name='question'
                    type='text'
                    value={this.state.question}
                    onChange={this.handleInput} 
                  />
              </label>
              {answerChoices}
              <button onClick={this.props.addCard}>Add Question</button>
              <button onClick={this.props.deleteCard}>Delete Question</button>
  
              <div className="back-forth-button">
                <button value='back' onClick={this.props.moveCard}>Back One</button>
                <button value='forward' onClick={this.props.moveCard}>Forward One</button>
              </div>
              <p>Question {this.props.cardPosition + 1} / {this.props.cards.length}</p>
            </form>
          </div>
          <Card 
            question={this.state.question}
            answers={answerText}
          />
      </div>
      )
    }
}

// Groups similar Answer Fields together
function AnswerChoice(props) {
    let inputName = 'ans' + props.index;
    return (
      <label className="answer-choice">
        Answer #{props.index}
          <input name={inputName} type="checkbox" value="true" onClick={props.handleCorrect} />
          <input className="text-input" name={inputName} type='text' value={props.answer} onChange={props.handleInput} />
      </label>
    );
}

// Allows for refreshing the Answer choices in the state
function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr));
}

export default MakerSpace;
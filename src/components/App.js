import React from 'react';
import MakerSpace from './MakerSpace';
import Card from './Card';
import './index.css';

/* Card example
{question: "Is the sky blue?", 
               answers: [{text: 'Yes', isCorrect: true}, {text: 'No', isCorrect: false}, {text: 'Sometimes', isCorrect: false}, {text: 'Maybe', isCorrect: false}]}
*/


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // All cards, initialized with one blank
      cards: [],
      question: "",
      answers: [['', false], ['', false], ['', false], ['', false]]
    };
  }

  // add a blank card below current card
  addCard = (event) => {
    event.preventDefault();
    let updateCards = arrayClone(this.state.cards);
    updateCards.push(this.state.currentCard);
    this.setState({
      cards: updateCards,
      currentCard: {question: "", answers: [{text: '', isCorrect: false}, {text: '', isCorrect: false}, {text: '', isCorrect: false}, {text: '', isCorrect: false}]}
    });
  }

  // Updates question and specific answers due to user input
  handleInput = (event) => {
    let target = event.target
    if (target.name === 'question') {
      this.setState({question: target.value});
    } else {
      let answersCopy = arrayClone(this.state.answers);
      let pos = parseInt(target.name.substring(3,4));
      answersCopy[pos][0] = target.value;
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
    return (
      <div className='app-main'>
        <MakerSpace 
          addCard={this.addCard} 
          handleInput={this.handleInput}
          handleCorrect={this.handleCorrect}
          question={this.state.question}
          answers={this.state.answers}
          numCards={this.state.cards.length}
        />
        <Card 
          question={this.state.question}
          answers={this.state.answers}
        />
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;
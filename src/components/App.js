import React from 'react';
import MakerSpace from './MakerSpace'
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // All cards, initialized with one blank
      cards: [{question: "Is the sky blue?", 
               answers: [{text: 'Yes', isCorrect: true}, {text: 'No', isCorrect: false}, {text: 'Sometimes', isCorrect: false}, {text: 'Maybe', isCorrect: false}]}],
      cardPosition: 0,
    };
  }

  // add a blank card below current card
  addCard = (event) => {
    event.preventDefault();

    let oldCards = arrayClone(this.state.cards);
    // return all cards from beginning to current
    let newCards = oldCards.slice(0, this.state.cardPosition + 1);
    // append a new blank card
    newCards.push({question: "", answers: [{text: '', isCorrect: false}, {text: '', isCorrect: false}, {text: '', isCorrect: false}, {text: '', isCorrect: false}]});
    // append the remaining cards
    newCards.push(...oldCards.slice(this.state.cardPosition + 1, oldCards.length));

    this.setState({cards: newCards}); 
  }

  moveCard = (event) => {
    event.preventDefault();
    if (event.target.value === 'forward' && this.state.cardPosition + 1 < this.state.cards.length) {
      this.setState({cardPosition: this.state.cardPosition + 1})
    } else if (event.target.value === 'back' && this.state.cardPosition > 0) {
      this.setState({cardPosition: this.state.cardPosition - 1})
    }
    // UPDATE THE MAKER SPACE HERE
  }

  deleteCard = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <MakerSpace 
          addCard={this.addCard} 
          moveCard={this.moveCard} 
          deleteCard={this.deleteCard} 
          cardPosition={this.state.cardPosition} 
          cards={this.state.cards}/>
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;
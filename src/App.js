import React, { Component } from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // All cards, initialized with one blank
      cards: [{
        question: "",
        answers: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }]
      }],
      cardPosition: 0
    };
  }

  addCard = () => {
    let oldCards = arrayClone(this.state.cards);
    let newCards = oldCards.slice(0, this.cardPosition);
    newCards.push({ question: "", answers: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }] }); // add a blank card below
    newCards.push(...oldCards.slice(this.cardPosition, oldCards.length));
  }

  render() {
    return (
      <div>
        <MakerSpace addCard={this.addCard} cardPosition={this.cardPosition} />
      </div>
    );
  }
}

export default App;
import React from 'react';
import ReactDOM from 'react-dom';
import MakerSpace from './MakerSpace'
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // All cards, initialized with one blank
      cards: [{question: "", 
               answers: [{text: '', isCorrect: false}, {text: '', isCorrect: false}, {text: '', isCorrect: false}, {text: '', isCorrect: false}]}],
      cardPosition: 0
    };
  }

  // add a blank card below current card
  addCard = () => {
    let oldCards = arrayClone(this.state.cards);
    let newCards = oldCards.slice(0, this.cardPosition);
    newCards.push({question: "", answers: [{text: '', isCorrect: false}, {text: '', isCorrect: false}, {text: '', isCorrect: false}, {text: '', isCorrect: false}]}); 
    newCards.push(...oldCards.slice(this.cardPosition, oldCards.length));
  }

  render() {
    return (
      <div>
        <MakerSpace addCard={this.addCard} cardPosition={this.cardPosition}/>
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}


// ==================================
ReactDOM.render(<App />,  
  document.getElementById('root')
);


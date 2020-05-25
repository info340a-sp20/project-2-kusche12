import React from 'react';
import MakerSpace from './MakerSpace';
// Submit handler
import { confirmAlert } from 'react-confirm-alert';
import '../../node_modules/react-confirm-alert/src/react-confirm-alert.css';
import './index.css';
// Firebase
import firebase from 'firebase/app';
import 'firebase/database';

/* errorcode represents if there is anything missing from the question. It is returned to the user upond submission.
errorcode = [0, 0, 0] --> no errors
errorcode = 0 --> missing question
errorcode = 1 --> less than 2 answers
errorcode = 2 --> no correct answer chosen
*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TESTING ENVIRONMENT SET UP
      // Imagine that there is already one card submitted and the user is currently writing card two
      cards: [{ question: 'what day is it?', answers: [['Tuesday', false], ['Wednesday', false], ['Thursday', false], ['Friday', false]], errorcode: [0, 0, 1] }, { question: 'What is your favorite color?', answers: [['Green', false], ['Blue', false], ['Purple', false], ['Pink', false]], errorcode: [0, 0, 1] }],
      cardPosition: 1 // 0-based indexing
    };
  }


  // add a blank card below current card
  addCard = (event) => {
    event.preventDefault();

    let oldCards = arrayClone(this.state.cards);
    // return all cards from beginning to current
    let newCards = oldCards.slice(0, this.state.cardPosition + 1);
    // append a new blank card
    newCards.push({question: "", answers: [["", false], ["", false], ["", false], ["", false]]});
    // append the remaining cards
    newCards.push(...oldCards.slice(this.state.cardPosition + 1, oldCards.length));

    this.setState({
      cards: newCards,
      cardPosition: this.state.cardPosition + 1,
    }); 
  }

  // delete the currently selected card
  deleteCard = (event) => {
    event.preventDefault();
    if (this.state.cards.length > 1) {
      let oldCards = arrayClone(this.state.cards);
      let prevCards = oldCards.slice(0, this.state.cardPosition);
      let nextCards = oldCards.slice(this.state.cardPosition + 1, oldCards.length);
      if (this.state.cardPosition + 1 === this.state.cards.length) {
        this.setState({
          cards: prevCards.concat(nextCards),
          cardPosition: this.state.cardPosition - 1
        });
      } else {
        this.setState({ cards: prevCards.concat(nextCards) });
      }
    }
  }

  // Moves the card forwards or backwards and saves the current card to the master set
  moveCard = (event, newQuestion, newAnswers, newErrors) => {
    event.preventDefault();
    let cardsCopy = arrayClone(this.state.cards);
    cardsCopy[this.state.cardPosition].question = newQuestion;
    cardsCopy[this.state.cardPosition].answers = newAnswers;
    cardsCopy[this.state.cardPosition].errorcode = newErrors;
    if (event.target.value === 'next' && this.state.cardPosition < this.state.cards.length - 1) { // move forward if possible
      this.setState({
        cards: cardsCopy,
        cardPosition: this.state.cardPosition + 1,
      });
    } else if (event.target.value === 'prev' && this.state.cardPosition > 0) { // move backward if possible
      this.setState({
        cards: cardsCopy,
        cardPosition: this.state.cardPosition - 1,
      });
    }
  }

  // Allows the user to submit their quiz
  submitQuiz = (event) => {
    event.preventDefault();
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you ready to submit?',
      buttons: [
        {
          label: 'Submit',
          onClick: () => this.submitHandler(event)
        },
        {
          label: 'No',
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  }

  submitHandler = () => {
    // Submit the final card
    // TEMPORARILY SKIP THIS STEP IN DEVELOPMENT MODE
    //let cardsCopy = arrayClone(this.state.cards);
    //cardsCopy[this.state.cardPosition].question = newQuestion;
    //cardsCopy[this.state.cardPosition].answers = newAnswers;
    //this.setState({ cards: cardsCopy });

    // JSONify all of the cards and push to firebase
    let cardsCopy = arrayClone(this.state.cards)
    let cardObj = { cardsCopy };
    let quizzes = firebase.database().ref('quizzes');
    quizzes.push(cardObj.cardsCopy);
  }

  render() {
    return (
      <div className='app-main'>
        <MakerSpace
          question={this.state.cards[this.state.cardPosition].question}
          answers={this.state.cards[this.state.cardPosition].answers}
          errorcode={this.state.cards[this.state.cardPosition].errorcode}
          questionNumber={this.state.cardPosition}
          addCard={this.addCard}
          deleteCard={this.deleteCard}
          moveCard={this.moveCard}
          submitQuiz={this.submitQuiz}
        />
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;
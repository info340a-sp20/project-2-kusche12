import React from 'react';
import MakerSpace from './MakerSpace';
// Submit handler
import { confirmAlert } from 'react-confirm-alert';
import './index.css';
import '../../node_modules/react-confirm-alert/src/react-confirm-alert.css';
import question_img from '../img/question-color.png';

// Firebase
import firebase from 'firebase/app';
import 'firebase/database';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TESTING ENVIRONMENT SET UP
      // Imagine that there is already one card submitted and the user is currently writing card two
      cards: [{ question: 'what day is it?', answers: [['Tuesday', true], ['Wednesday', false], ['Thursday', false], ['Friday', false]], errorcode: [0, 0, 1] }, { question: 'What is your favorite color?', answers: [['Green', true], ['Blue', false], ['Purple', false], ['Pink', false]], errorcode: [0, 0, 0] }],
      cardPosition: 1 // 0-based indexing
    };
  }

  // add a blank card below current card
  addCard = (event, newQuestion, newAnswers, newErrors) => {
    event.preventDefault();
    this.saveToCard(newQuestion, newAnswers, newErrors);

    let oldCards = arrayClone(this.state.cards);
    let newCards;
    if (this.state.cardPosition === this.state.cards.length - 1) { // last card in deck
      oldCards.push({question: "", answers: [["", false], ["", false], ["", false], ["", false]], errorcode: [0, 0, 0]});
      newCards = oldCards;
    } else { // any other card position
      newCards = oldCards.slice(0, this.state.cardPosition + 1);
      newCards.push({question: "", answers: [["", false], ["", false], ["", false], ["", false]], errorcode: [0, 0, 0]});
      newCards.push(...oldCards.slice(this.state.cardPosition + 1, oldCards.length));
    }
    this.setState({
      cards: newCards,
      cardPosition: this.state.cardPosition + 1
    }); 
  }

  // delete the currently selected card
  deleteCard = (event) => {
    event.preventDefault();
    if (this.state.cards.length > 1) {
      let oldCards = arrayClone(this.state.cards);
      let prevCards = oldCards.slice(0, this.state.cardPosition);
      let nextCards = oldCards.slice(this.state.cardPosition + 1, oldCards.length);
      if (this.state.cardPosition + 1 === this.state.cards.length) { // card is at the end of the list, display the previous card
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
    this.saveToCard(newQuestion, newAnswers, newErrors);
    
    if (event.target.value === 'next' && this.state.cardPosition < this.state.cards.length - 1) { // move forward if possible
      this.setState({ cardPosition: this.state.cardPosition + 1 });
    } else if (event.target.value === 'prev' && this.state.cardPosition > 0) { // move backward if possible
      this.setState({ cardPosition: this.state.cardPosition - 1 });
    } else if (event.target.value === 'next' && this.state.cardPosition === this.state.cards.length - 1) { // loop back to front of list
      this.setState({ cardPosition: 0 });
    } else if (event.target.value === 'prev' && this.state.cardPosition === 0) { // loop from front to back of list
      this.setState({ cardPosition: this.state.cards.length - 1 });
    }
  }

  // Allows the user to submit their quiz
  submitQuiz = (newQuestion, newAnswers, newErrors) => {
    this.saveToCard(newQuestion, newAnswers, newErrors);

    // Check for errors in any of the cards
    let includesError = false;
    this.state.cards.forEach(card => {
      if (card.errorcode.includes(1)) {
        includesError = true;
      }
    });

    // Ask the user to confirm their request
    if (!includesError) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='react-confirm-alert-custom'>
              <img src={question_img} alt='question mark'/>
              <p>Submit the Quiz?</p>
              <p>Once submitted, you will not be able to make any changes to your quiz.</p>
              <div className='react-confirm-button-container'>
                <button onClick={() => {this.submitHandler()}}>Submit</button>
                <button onClick={onClose}>Cancel</button>
              </div>
            </div>
          );
        }
      });
    } else {
      alert("Make sure that none of your questions have errors before submitting...");
    }
  }

  // Save the quiz to firebase and exit Maker Space
  submitHandler = () => {
    let cardsCopy = arrayClone(this.state.cards)
    let cardObj = { cardsCopy };
    let quizzes = firebase.database().ref('quizzes');
    quizzes.push(cardObj.cardsCopy);
  }

  // Helper function to save the state of the newly updated card
  saveToCard = (question, answers, errors) => {
    let cardsCopy = arrayClone(this.state.cards);
    cardsCopy[this.state.cardPosition].question = question;
    cardsCopy[this.state.cardPosition].answers = answers;
    cardsCopy[this.state.cardPosition].errorcode = errors;
    this.setState({ cards: cardsCopy });
    console.log('caerd state has been saved to master');
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
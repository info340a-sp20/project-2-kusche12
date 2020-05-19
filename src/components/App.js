import React from 'react';
import MakerSpace from './MakerSpace';
import Card from './Card';
// Submit handler
import { confirmAlert } from 'react-confirm-alert';
import '../../node_modules/react-confirm-alert/src/react-confirm-alert.css';
import './index.css';
// Firebase
import firebase from 'firebase/app';
import 'firebase/database';

//FUNCTION
// Do some Quality Assurance on the 'add' and 'delete' logic
// Reset the correct answers back to all false after card added

//STYLE
// On answer checkbox press, make the color of the answer on the card change
// Position the fa-icons on the add and delete buttons better

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TESTING ENVIRONMENT
      // Imagine that there is already one card submitted and the user is currently writing card two
      cards: [{question: 'what day is it?', answers: [['Tuesday', true], ['Wednesday', false], ['Thursday', false], ['Friday', false]]}, {question: 'What is your favorite color?', answers: [['Green', true], ['Blue', false], ['Purple', false], ['Pink', false]]}],
      question: "",
      answers: [['', false], ['', false], ['', false], ['', false]],
      cardPosition: 2
    };
  }

  // add a blank card below current card
  addCard = (event) => {
    event.preventDefault();
    let updateCards = arrayClone(this.state.cards);
    let newCard = {
      question: this.state.question,
      answers: this.state.answers
    }

    updateCards.push(newCard);
    this.setState({
      cards: updateCards,
      question: "",
      answers: [['', false], ['', false], ['', false], ['', false]],
      cardPosition: this.state.cardPosition + 1
    });
  }

  deleteCard = (event) => {
    event.preventDefault();
    if (this.state.cards.length < 1) {
      return;
    }

    let updateCards = arrayClone(this.state.cards);
    let oldCard = updateCards.pop();
    this.setState({
      cards: updateCards,
      question: oldCard.question,
      answers: oldCard.answers,
      cardPosition: this.state.cardPosition - 1
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
    answersCopy[pos][1] = !answersCopy[pos][1];
    this.setState({answers: answersCopy});
  }

  // Allows the user to submit their quiz
  submitQuiz = (event) => {
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
  };

  submitHandler = (event) => {
    // Submit the final card
    let updateCards = arrayClone(this.state.cards);
    let newCard = {
      question: this.state.question,
      answers: this.state.answers
    }
    updateCards.push(newCard);

    // JSONify all of the cards and push to firebase
    let cardObj = {updateCards}
    let quizzes = firebase.database().ref('quizzes');
    quizzes.push(cardObj.updateCards);
  }

  render() {
    return (
      <div className='app-main'>
        <MakerSpace 
          addCard={this.addCard} 
          deleteCard={this.deleteCard}
          submitQuiz={this.submitQuiz}
          handleInput={this.handleInput}
          handleCorrect={this.handleCorrect}
          question={this.state.question}
          answers={this.state.answers}
        />
        <Card 
          question={this.state.question}
          answers={this.state.answers}
          numCards={this.state.cardPosition + 1}
        />
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;
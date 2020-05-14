import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// has a CardHolder component (array / list)
  // has a Card component
// has a MakerSpace component (form)

class MakerSpace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answers: [
        {text: '', isCorrect: false}, {text: '', isCorrect: false}, {text: '', isCorrect: false}, {text: '', isCorrect: false}
      ]
    }
    this.handleInput = this.handleInput.bind(this);
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
            <button>Add Question</button>
            <button>Delete Question</button>

            <div className="back-forth-button">
              <button>Back One</button>
              <button>Forward One</button>
            </div>
            
          </form>
        </div>
        <Card 
          question = {this.state.question}
          answers = {answerText}
        />
    </div>
    )
  }
}

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

  addCard = () => {
    let oldCards = arrayClone(this.state.cards);
    let newCards = oldCards.slice(0, this.cardPosition);
    newCards.push({question: "", answers: [{text: '', isCorrect: false}, {text: '', isCorrect: false}, {text: '', isCorrect: false}, {text: '', isCorrect: false}]}); // add a blank card below
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

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}


// ==================================
ReactDOM.render(<App />,  
  document.getElementById('root')
);


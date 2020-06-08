import React, { Component } from 'react';
import { Card, CardTitle, CardDeck } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import AddQuizCard from './AddQuizCard';

export default class QuizList extends Component {
  static defaultProps = {
    quizData: [],
  }

  state = {
    quizData: this.props.savedQuiz,
    loading: this.props.loading,
    renderQuiz: false,
    quizGroup: [],
    redirect: ""
  }

  handleClick = (num, quiz) => {
    this.setState({ redirect: num, quizGroup: quiz });
  }

  render() {
    const cleanQuiz = this.state.quizData;

    if (this.state.redirect) {
      return (
        <Redirect push to={{
          pathname: ("/singlequizitem/" + this.state.redirect),
          state: this.state.quizGroup
        }} />
      )
    }

    const mappedQuiz =
      cleanQuiz.map((quiz, i) => (
        <Card key={i} className="cardlist mb-4 p-0">
          {/* last element in the array contains String: name of the quiz */}
          {typeof (quiz[quiz.length - 1] === "string") ?
            <div className="cl-cardtitle" onClick={() => { this.handleClick(i + 1, quiz) }}>
              {`${quiz[quiz.length - 1]}`}
            </div>
            :
            // if not stringValue, default value which sets the name of the quiz to "set" 
            <div>
              <CardTitle className="cl-cardtitle" onClick={() => { this.handleClick(i + 1, quiz) }}>
                {`Set ${[i + 1]}`}
              </CardTitle>
              <p>{quiz[quiz.length - 1]}</p>
            </div>
          }
          <div className="cardlist-button" onClick={() => { this.handleClick(i + 1, quiz) }}>Start Game</div>
        </Card>
      ))

    return (
      <CardDeck >
        {mappedQuiz}
        <AddQuizCard />
      </CardDeck>
    )
  }
}
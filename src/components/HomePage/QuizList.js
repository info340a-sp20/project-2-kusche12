import React, { Component } from 'react';
import {
  Card, Button, CardTitle, CardDeck, CardBody
} from 'reactstrap';
import { Redirect } from 'react-router-dom';

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

    let mappedQuiz =
      cleanQuiz.map((quiz, i) => (
        <Card key={i} className="cardlist mb-4">
          <CardBody >
            <div className="my-auto">
              {typeof (quiz[quiz.length - 1] === "string") ?
                <CardTitle>{`${quiz[quiz.length - 1]}`}</CardTitle>
                :
                // if not stringValue, default value
                <div>
                  <CardTitle>{`Set ${[i + 1]}`}</CardTitle>
                  <p>{quiz[quiz.length - 1]}</p>
                </div>
              }
              <Button className="cardlist-button" onClick={() => { this.handleClick(i + 1, quiz) }}>Start Game</Button>
            </div>
          </CardBody>
        </Card>
      ))

    return (
      <CardDeck >
        {mappedQuiz}
      </CardDeck>
    )
  }
}
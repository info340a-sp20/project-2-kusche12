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
    console.log("clicked " + num);
    this.setState({ redirect: num, quizGroup: quiz });
  }

  render() {
    const cleanQuiz = this.state.quizData;

    if (this.state.redirect)
      return (
        <Redirect push to={{
          pathname: ("/singlequizitem/" + this.state.redirect),
          state: this.state.quizGroup
        }} />
      )

    return (
      <CardDeck>
        {cleanQuiz.map((quiz, i) => (
          <Card key={i}>
            <CardBody>
              <CardTitle>{`Set ${i + 1}`}</CardTitle>
              <Button onClick={() => { this.handleClick(i + 1, quiz) }}>Go to the Quiz!</Button>
            </CardBody>
          </Card>
        ))}
      </CardDeck>
    )
  }
}
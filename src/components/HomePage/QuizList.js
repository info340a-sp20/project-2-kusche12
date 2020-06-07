import React, { Component } from 'react';
import {
  Card, Button, CardTitle, CardDeck, CardBody
} from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";


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

    let quizMakerCard =
      <Card className="d-flex cardlist justify-content-center mb-4">
        <Link className='link' to="/app">
          <div className="cl-qm-cardbody d-flex ">
            <CardBody className="my-auto">
              <div className="mb-4">
                <FontAwesomeIcon
                  className="fa-icon"
                  icon={faPlusCircle}
                  style={{ color: 'orange' }}
                  size="3x" />
              </div>
              <CardTitle>
                Make a new Quiz!
          </CardTitle>
            </CardBody>
          </div>
        </Link>
      </Card>


    return (
      <CardDeck >
        {mappedQuiz}
        {quizMakerCard}
      </CardDeck>
    )
  }
}
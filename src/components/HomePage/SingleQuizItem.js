import React, { Component } from 'react';
import Card from '../Card';
import { Redirect } from 'react-router-dom';

//TODO : error when the quizGroup is empty 

export default class SingleQuizItem extends Component {
  static defaultProps = {
    quiz: {
      question: "no questions saved yet",
      answers: "no answers saved yet"
    }
  }

  state = {
    quiz: this.props.location.state,
  }

  render = () => {
    const quiz = this.state.quiz;

    return (
      this.state.quiz ? (
        <div >
          <Card quiz={quiz} renderMode={true} />
        </div>
      ) : (
          <div>
            <p>Whoops! Invalid access. Please select a valid quiz</p>
          </div>
        )
    )
  }
}


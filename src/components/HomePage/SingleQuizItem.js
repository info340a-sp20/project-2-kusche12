import React, { Component } from 'react';

export default class SingleQuizItem extends Component {
  static defaultProps = {
    quiz: {
      question: "no questions saved yet",
      answers: "no answers saved yet"
    }
  }

  state = {
    quiz: this.props.quiz
  }

  render() {
    const quiz = this.state.quiz;

    return (
      quiz.map((quiz, i) => (
        <div key={i}>
          {quiz.question}
          {quiz.answers}

        </div>
      )

      )
    )
  }
}


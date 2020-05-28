import React, { Component } from 'react';
import SingleQuizItem from './SingleQuizItem';

export default class QuizList extends Component {
  static defaultProps = {
    quizData: []
  }

  state = {
    quizData: this.props.savedQuiz
  }


  render() {
    const cleanQuiz = this.state.quizData;
    cleanQuiz.shift();
    const quizList = cleanQuiz.map((quiz, i) => (
      <div className="mb-4" key={i + 1}>
        <SingleQuizItem quiz={quiz} />
      </div>
    ));

    return (
      <div>{quizList}</div>
    )
  }
}
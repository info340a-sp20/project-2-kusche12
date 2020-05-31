import React from 'react';
import '../index.css';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class QuizViewModeButton extends React.Component {
  render() {
    return (
      <div>
        {((this.props.quizArrayPosition + 1) === this.props.quiz.length) ?
          (<Link className='link' to='/'><Button className="card-submit view">To the Main Page!</Button></Link>)
          :
          (<Button className="card-submit view" value='next' onClick={this.props.viewModeNextArrow}>Next</Button>)
        }
      </div>
    )
  }
}
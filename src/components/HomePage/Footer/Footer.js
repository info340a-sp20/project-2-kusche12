import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import Feedback from './Feedback';
import '../homePage.css';

export default class Footer extends React.Component {
  render() {
    const quizMe = (
      <div className="quizMe">
        <div className="title">QuizMe</div>
        <p>Create, save, and share multiple choice quizzes in no time</p>
      </div>
    )

    const footer = (
      <div>
        <Link className="link">Meet the Team</Link>
      </div>
    )

    const copyright = (
      <p className="copyright">
        Created by Kyle Kusche and Jin Son <br />
        &copy; 2020
      </p>
    )

    return (
      <Container fluid="xl" className="footer">
        <Row>
          <Col>{quizMe}</Col>
        </Row>
        <Row>
          <Col className="justify-contents-end">{footer}</Col>
        </Row>
        <hr />
        <Row>
          <Col>
            {copyright}
          </Col>
        </Row>
      </Container>
    )
  }

}
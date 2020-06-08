import React, { Component } from 'react';
import { Card, CardTitle, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import './homePage.css';

export default class AddQuizCard extends Component {
  render() {
    return (
      <Card className="d-flex cardlist justify-content-center mb-4">
        <Link className='link' to="/createQuiz">
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
    )
  }
}



import React, { Component } from 'react';
import '.././index.css';
import './team.css';
import { Container, Row, Col } from 'reactstrap';

export default class MemberInfo extends Component {
  state = {
    displayInfo: false

  }
  ref = React.createRef();

  renderContent = () => {
    this.setState({ displayInfo: !this.state.displayInfo })
    const referredItem = this.ref.current;
    if (this.props.name === "Kyle") {
      referredItem.classList.toggle('item-clicked');
    } else if (this.props.name === "Jin") {
      referredItem.classList.toggle('item-clicked-right');
    }
  }

  keydownCheck = (e) => {
    if (e.keyCode === 32 || e.keyCode === 13) {
      this.renderContent();
    }
  }

  render() {
    const circle = (
      <div tabIndex="0" className="team-circle" onKeyDown={this.keydownCheck}>
        <div ref={this.ref} className="team-circle-img">
          {this.props.name === "Jin" ?
            <h2 target="name">
              {`${this.props.name} Son`}
            </h2>
            :
            <h2 target="name">
              {`${this.props.name} Kusche`}
            </h2>
          }
        </div>
      </div>
    )
    return (
      <Container className="mb-5">
        <Row className="d-flex align-items-center">
          {(this.state.displayInfo && this.props.name === "Jin") &&
            <Col className="member-content">
              {this.props.content}
            </Col>
          }

          <Col>
            <div onClick={() => this.renderContent()}>
              {circle}
            </div>
          </Col>

          {(this.state.displayInfo && this.props.name === "Kyle") &&
            <Col className="member-content">
              {this.props.content}
            </Col>
          }
        </Row>
      </Container>
    )
  }
}
import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';

export default class Navigation extends Component {
  render() {
    return (
      <Navbar color="white" expand="md" sticky={'top'} className="d-flex justify-content-between">
        <NavbarBrand className="title title-link " href="/">QuizMe</NavbarBrand>
        <Nav className="d-flex justify-content-between" navbar>
          <NavItem>
            <li className="nav-profile">
              <img alt='user profile' role="button" src={this.props.user} onClick={this.props.renderDropdown} />
              {this.props.dropdown &&
                <div className="nav-dropdown">
                  <p>User: {this.props.isAnonymous ? 'Guest' : this.props.email}</p>
                  <button onClick={this.props.handleSignOut}>Sign out</button>
                </div>
              }
            </li>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}
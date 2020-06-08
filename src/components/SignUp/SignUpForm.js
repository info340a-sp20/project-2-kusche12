import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
	Container, Row, Col, Alert
} from 'reactstrap';
import './SignUp.css';
import signuppic from '../../img/signuppic.png';

class SignUpForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
		};
	}

	//update state for specific field
	handleChange = (event) => {
		let field = event.target.name; //which input
		let value = event.target.value; //what value

		let changes = {}; //object to hold changes
		changes[field] = value; //change this field
		this.setState(changes); //update state
	}

	//handle signUp button
	handleSignUp = (event) => {
		event.preventDefault(); //don't submit
		this.props.signUpCallback(this.state.email, this.state.password);
	}

	//handle signIn button
	handleSignIn = (event) => {
		event.preventDefault(); //don't submit
		this.props.signInCallback(this.state.email, this.state.password);
	}

	handleAnonSignIn = (event) => {
		event.preventDefault();
		this.props.anonSignInCallback();
	}

	render() {
		let errormessage = this.props.errorMessage;

		const img = (
			<div>
				<img
					src={signuppic}
					id="signuppic"
					height='auto'
					alt='sign up' />
			</div>
		)

		const displayerrormessage = (
			<Alert color="danger">{errormessage}</Alert>
		)

		return (
			<div className="signup-wrapper">
				<Container className="d-flex justify-content-center">
					<Row className="signup-container d-flex justify-content-around">
						<Col className="signup-info col-sm-10 col-md-5 col-xl-4 mr-md-6 mr-lg-5 mr-xl-3">
							<Row>
								<h1>Make Quizzes <br /> at the touch of a button!</h1>
								<p>Create, save, and share multiple choice quizzes in no time</p>
							</Row>
							<Row>
								{img}
							</Row>
						</Col>

						<Col className="form-wrapper flex-grow-2 col-sm-10 col-md-6 col-lg-5 col-xl-5 pl-4 ml-lg-5 ml-md-2 ml-xl-5">
							<p>Sign up!</p>
							{/* ErrorMessage */}
							{errormessage && displayerrormessage}
							<form className="form">
								{/* email */}
								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input className="form-control"
										id="email"
										type="email"
										name="email"
										onChange={this.handleChange}
									/>
								</div>

								{/* password */}
								<div className="form-group">
									<label htmlFor="password">Password</label>
									<input className="form-control"
										id="password"
										type="password"
										name="password"
										onChange={this.handleChange}
									/>
								</div>

								{/* buttons */}
								<div className="form-group buttons">
									<div className="form-button-inline">
										<button className="button" onClick={this.handleSignUp}>Sign up</button>
										<button className="button" onClick={this.handleSignIn}>Sign in</button>
									</div>
									<button className="button-guest" onClick={this.handleAnonSignIn}>Continue as guest</button>
								</div>
							</form>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default SignUpForm
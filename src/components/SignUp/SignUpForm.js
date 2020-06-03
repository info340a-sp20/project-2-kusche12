import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './SignUp.css'

class SignUpForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      'email': undefined,
      'password': undefined,
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
    return (
			<div className="signup-wrapper">
				<div className="container">
					<div className="row">
						<div className="signup-info col-xs-12 col-sm-5 col-xl-4 px-4 mr-sm-1">
							<h1>Make Quizzes at the touch of a button!</h1>
							<p>Create, save, and share multiple choice quizzes in no time</p>
						</div>
						<div className="form-wrapper col-xs-12 col-sm-6 col-xl-6 pl-4 ml-xl-auto">
							<p>Sign up!</p>
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
						</div>
					</div>
				</div>
			</div>
    );
  }
}

export default SignUpForm
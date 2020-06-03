import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './components/index.css';
import App from './components/App';
import Home from './components/HomePage/Home';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import SingleQuizItem from './components/HomePage/SingleQuizItem';
import SignUpForm from './components/SignUp/SignUpForm';
import user from './img/user.png';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
			errorMessage: '',
			loading: true,
			dropdown: false
    };
	}

  //A callback function for registering new users
  handleSignUp = (email, password) => {
    this.setState({errorMessage:null}); //clear any old errors

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      this.setState({ errorMessage: errorMessage });
      console.log(error);
    });
  }

  //A callback function for logging in existing users
  handleSignIn = (email, password) => {
    this.setState({errorMessage:null}); //clear any old errors
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
      this.setState({ errorMessage: error.message });
    });
  }

  //A callback function for logging out the current user
  handleSignOut = () => {
    this.setState({errorMessage:null}); //clear any old errors
    firebase.auth().signOut()
    .catch((error) => {
      this.setState({ errorMessage: error.message });
    });
	}
	
	
	// if the user is already signed in, set the user state
	componentDidMount() {
		this.authUnRegFunc = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user: user, loading: false });
			} else {
				this.setState({ user: null });
			}
		});
	}
		
	componentWillUnmount() {
		this.authUnRegFunc();
	}

	renderDropdown = (event) => {
		this.setState({ dropdown: !this.state.dropdown });
	}
	
  render() {
		let content = null;
		if (this.state.loading) {
			content = (
        <div className="text-center">
          <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
        </div>
      );
		} else if (this.state.user) {
			content = (
				<Router>
						<ul>
							<li> {/* THESE LINKS ARE TEMPORARY. WE WILL BE MOVING MAKEQUIZ INTO ITS OWN CARD */}
								<Link className='link' to='/'>Home Page</Link>
							</li>
							<li>
								<Link className='link' to='/app'>Make Quiz</Link>
							</li>
							<li className="nav-profile">
								<img role="button" src={user} onClick={this.renderDropdown}/>
								<p>{this.state.user.email}</p>
								{this.state.dropdown &&
									<div className="nav-dropdown">
										<p>Sign out</p>
									</div>
								}
							</li>
						</ul>
						<Switch>
							<Route exact path='/'>
								<Home />
							</Route>
							<Route path='/app'>
								<App />
							</Route>
							<Route path="/singlequizitem/:setNum"
								component={SingleQuizItem}>
							</Route>
						</Switch>
				</Router>
			);
		} else { // no user signed in
			content = ( 
					<SignUpForm 
						signUpCallback={this.handleSignUp} 
            signInCallback={this.handleSignIn} 	
					/> 
			);
		}
		return (
			<div className="wrapper">
				<h1 className='title'>QuizMe</h1>
				{content}
			</div>
		);
	}
}

// ==================================
const firebaseConfig = {
    apiKey: "AIzaSyDGfiHoZvUjc59sAB1GHdKNKErb87Uiwlw",
    authDomain: "quiz-maker-2cd84.firebaseapp.com",
    databaseURL: "https://quiz-maker-2cd84.firebaseio.com",
    projectId: "quiz-maker-2cd84",
    storageBucket: "quiz-maker-2cd84.appspot.com",
    messagingSenderId: "44817314779",
    appId: "1:44817314779:web:94759376519156250fedfe",
    measurementId: "G-F517H7CF6F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var React1 = require('react');
var ReactDOM1 = require('react-dom');

if (process.env.NODE_ENV !== 'production') {
    var axe = require('react-axe');
    axe(React1, ReactDOM1, 1000);
}

ReactDOM.render(<Main />,
    document.getElementById('root')
);
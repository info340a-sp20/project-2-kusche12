import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './components/index.css';
import App from './components/App';
import Home from './components/HomePage/Home';
import Navigation from './components/NavBar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import SingleQuizItem from './components/HomePage/SingleQuizItem';
import SignUpForm from './components/SignUp/SignUpForm';
import Team from './components/Team/Team';
// import Footer from './components/HomePage/Footer/Footer';
import user from './img/user.png';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			errorMessage: '',
			loading: true,
			dropdown: false,
		};
	}

	//A callback function for registering new users
	handleSignUp = (email, password) => {
		this.setState({ errorMessage: null }); //clear any old errors

		firebase.auth().createUserWithEmailAndPassword(email, password)
			.catch((error) => {
				// Handle Errors here.
				// var errorCode = error.code;
				var errorMessage = error.message;
				this.setState({ errorMessage: errorMessage });
			});
	}

	//A callback function for logging in existing users
	handleSignIn = (email, password) => {
		this.setState({ errorMessage: null }); //clear any old errors
		firebase.auth().signInWithEmailAndPassword(email, password)
			.catch((error) => {
				this.setState({ errorMessage: error.message });
			});
	}

	handleAnonSignIn = () => {
		this.setState({ errorMessage: null });
		firebase.auth().signInAnonymously()
			.catch(function (error) {
				this.setState({ errorMessage: error.message });
			});
	}

	//A callback function for logging out the current user
	handleSignOut = () => {
		this.setState({
			errorMessage: null,
			user: null,
			dropdown: false
		}); //clear any old errors
		firebase.auth().signOut()
			.catch((error) => {
				this.setState({ errorMessage: error.message });
			});
	}


	// if the user is already signed in, set the user state
	componentDidMount() {
		this.authUnRegFunc = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user: user });
			} else {
				this.setState({ user: null });
			}
			this.setState({ loading: false });
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
		let userID = null;
		if (this.state.loading) {
			content = (
				<div className="text-center">
					<i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
				</div>
			);

		} else if (this.state.user) {
			if (this.state.user.isAnonymous) {
				userID = 'guestID';
			} else {
				userID = this.state.user.uid;
			}

			content = (
				<Router>
					<Navigation
						user={user}
						renderDropdown={this.renderDropdown}
						dropdown={this.state.dropdown}
						isAnonymous={this.state.user.isAnonymous}
						email={this.state.user.email}
						handleSignOut={this.handleSignOut}
					/>
					<Switch>
						<Route exact path='/'>
							<Home userID={userID} isGuest={this.state.user.isAnonymous} />
						</Route>
						<Route path='/createQuiz'>
							<App userID={userID} />
						</Route>
						<Route path="/singlequizitem/:setNum"
							component={SingleQuizItem}>
						</Route>
						<Route path="/team" component={Team}>

						</Route>
					</Switch>
				</Router>
			);
		} else { // no user signed in
			content = (
				<div>
					<h1 className="title">QuizMe</h1>
					<SignUpForm
						signUpCallback={this.handleSignUp}
						signInCallback={this.handleSignIn}
						anonSignInCallback={this.handleAnonSignIn}
						errorMessage={this.state.errorMessage}
					/>
				</div>
			);
		}
		return (
			<div className="wrapper">
				{/* <p>{this.state.errorMessage}</p> */}
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


ReactDOM.render(<Main />,
	document.getElementById('root')
);
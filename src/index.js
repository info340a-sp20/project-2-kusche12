import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './components/index.css';
import App from './components/App';
import Home from './components/HomePage/Home';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import SingleQuizItem from './components/HomePage/SingleQuizItem';

class Main extends React.Component {
    render() {
        return (
            <Router>
                <div className="wrapper">
                    <h1 className='title'><Link to='/' className="title" style={{ color: 'inherit', textDecoration: 'inherit' }} >QuizMe</Link></h1>
                    <ul>
                        <li>
                            <Link className='link' to='/'>Home Page</Link>
                        </li>
                        <li>
                            <Link className='link' to='/app'>Make Quiz</Link>
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
                </div>
            </Router>
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
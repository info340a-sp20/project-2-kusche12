import React from 'react';
import firebase from 'firebase/app';
import BounceLoader from 'react-spinners/BounceLoader';
import QuizList from './QuizList';
import Footer from './Footer/Footer';
import AddQuizCard from './AddQuizCard';
import './homePage.css';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            savedQuiz: null,
            loading: true,
            renderSingleQuiz: false,
            quizGroupContent: []
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        // referred to the book  
        let rootRef = firebase.database().ref("quizzes/" + this.props.userID);
        rootRef.on("value", (snapshot) => {
            let data = snapshot.val();

            if (data) {    // User has saved quizzes
                let quizKeys = Object.keys(data);
                let quizArray = quizKeys.map((key) => {
                    let quiz = data[key];
                    quiz.key = key;
                    return quiz;
                });
                this.setState({ savedQuiz: quizArray, loading: false });
            } else {
                this.setState({ savedQuiz: null, loading: false });
            }
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }

    render() {
        let content = null;
        if (this.state.loading) {
            content = (
                <div className="loader">
                    <BounceLoader
                        color={"orange"}
                        size={150}
                        loading={this.state.loading} />
                    <div className="loader-text">Loading
                        <div id="loader-text1">.</div>
                        <div id="loader-text2">.</div>
                        <div id="loader-text3">.</div>
                    </div>
                </div>
            );
        } else if (!this.state.savedQuiz) {
            content = (
                <div className="home-wrapper">
                    <p className="sub-title">You have no saved quizzes!</p>
                    <AddQuizCard />
                </div>
            );
        } else {
            content = (
                <div className="home-wrapper">
                    <p className="sub-title mt-3">{this.props.isGuest ? 'All Guest Quizzes :' : 'Here are Your Quizzes :'} </p>
                    <QuizList
                        savedQuiz={this.state.savedQuiz}
                        loading={this.state.loading}
                        renderSingleQuiz={this.state.renderSingleQuiz}
                    />
                </div>
            );
        }


        return (
            <div>
                {content}
                <Footer />
            </div>
        );
    }
}

export default HomePage;
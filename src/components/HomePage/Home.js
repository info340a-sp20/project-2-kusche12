import React from 'react';
import firebase from 'firebase/app';
import BounceLoader from 'react-spinners/BounceLoader';
import QuizList from './QuizList';

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
                <div>
                    <BounceLoader
                    color={"orange"}
                    loading={this.state.loading} />
                </div>
            );
        } else if (!this.state.savedQuiz) {
            content = (
                <div className="wrapper">
                    <p className="sub-title">You have no saved quizzes!</p>
                </div>
            );
        } else {
            content = (
                <div className="wrapper">
                    <p className="sub-title">{this.props.isGuest ? 'All Guest-Made Quizzes:' : 'Your quizzes:'} </p>                
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
            </div>
        );
    }
}

export default HomePage;
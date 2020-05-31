import React from 'react';
import firebase from 'firebase/app';
import BounceLoader from 'react-spinners/BounceLoader';
import QuizList from './QuizList';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            savedQuiz: '',
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
        let rootRef = firebase.database().ref("quizzes");
        rootRef.on("value", (snapshot) => {
            let data = snapshot.val();
            console.log(data);
            let quizKeys = Object.keys(data);
            let quizArray = quizKeys.map((key) => {
                let quiz = data[key];
                quiz.key = key;
                return quiz;
            });

            this.setState({ savedQuiz: quizArray, loading: false });

        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }

    render() {
        return (
            <div className="maker-cover">
                <h3>Welcome to QuizMe</h3>

                {this.state.loading ?
                    <div>
                        <BounceLoader
                            color={"orange"}
                            loading={this.state.loading} />
                    </div>
                    :
                    <QuizList
                        savedQuiz={this.state.savedQuiz}
                        loading={this.state.loading}
                        renderSingleQuiz={this.state.renderSingleQuiz} />
                }
            </div>
        )
    }

}

export default HomePage;
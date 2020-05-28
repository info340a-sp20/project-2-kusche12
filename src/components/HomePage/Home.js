import React from 'react';
import firebase from 'firebase/app';
import BounceLoader from 'react-spinners/BounceLoader';
import QuizList from './QuizList';

// import { Spinner } from 'reactstrap';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            savedQuiz: '',
            loading: true,
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        let rootRef = firebase.database().ref("quizzes");
        rootRef.on("value", (snapshot) => {
            console.log(snapshot.val());
            let data = snapshot.val();
            let quizKeys = Object.keys(data);
            let quizArray = quizKeys.map((key) => { //map array of keys into array of tasks
                let quiz = data[key]; //access element at that key
                quiz.key = key; //save the key for later referencing!
                return quiz;
            });

            this.setState({ savedQuiz: quizArray, loading: false });
            this.renderQuiz();

        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }

    renderQuiz() {
        return (
            <div>
                <QuizList savedQuiz={this.state.savedQuiz} />
            </div >
        )
    }


    render() {
        return (
            <div className="maker-cover">
                <h3>Welcome to QuizMe</h3>
                <form>
                    <label>
                        Question
                    </label>
                </form>
                {this.state.savedQuiz ?
                    this.renderQuiz()
                    :
                    <BounceLoader
                        color={"orange"}
                        loading={this.state.loading} />
                }
            </div>
        )
    }

}

export default HomePage;
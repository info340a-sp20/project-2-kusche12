import React from 'react';
import firebase from 'firebase/app';

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
            this.setState({ savedQuiz: data, loading: false })
            this.renderQuiz();


        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }

    renderQuiz() {
        return (
            <div>
                {this.state.savedQuiz}
                {JSON.stringify(this.state.savedQuiz)}
            </div>
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
                {this.state.savedQuiz ? JSON.stringify(this.state.savedQuiz) : 'loading'}
                {/* {JSON.stringify(this.state.savedQuiz)} */}
            </div>
        )
    }

}

export default HomePage;
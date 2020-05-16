import React from 'react';

class HomePage extends React.Component {

    getQuiz = async () => {
        const response = await fetch('../quizzes/hp-quiz.csv');
        const quiz = response.text();
        console.log(quiz);
    }

    render() {
        return (
            <div>
                <h1>This is the home page.</h1>
                <button onClick={this.getQuiz}>Click me!</button>
            </div>
        );
    };
}

export default HomePage;
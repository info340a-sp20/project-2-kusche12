import React from 'react';
import './index.css';

class ErrorAlert extends React.Component {
    render() {
        let display = [];
        this.props.errorcode.forEach((error, i) => {
            if (error && i === 0) {
                display.push(
                    <div className="error-block" key={i}><p>Remember to add a question</p></div>
                );
            } else if (error && i === 1) {
                display.push(
                    <div className="error-block" key={i}><p>You must have at least two (2) answer choices</p></div>
                );
            } else if (error && i === 2) {
                display.push(
                    <div className="error-block" key={i}><p>Don't forget to add in a correct answer choice</p></div>
                );
            }
        })
        return (
            <div className="error-list">
                {display}
            </div>
        );
    }
}

export default ErrorAlert;
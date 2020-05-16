import React from 'react';
import ReactDOM from 'react-dom';
import './components/index.css';
import App from './components/App';
import Home from './components/Home';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

class Main extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to='/home'>Home Page</Link>
                        </li>
                        <li>
                            <Link to='/app'>Make Quiz</Link>
                        </li>
                    </ul>
                    <Switch>
                        <Route path='/home'>
                            <Home />
                        </Route>
                        <Route path='/app'>
                            <App />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

// ==================================
ReactDOM.render(<Main />,  
    document.getElementById('root')
);
import React, {Component} from 'react';
import Header from './common/header/Header';
import HomePage from './home/HomePage';

class App extends Component {
    render () {
        return (
            <div className="container-fluid">
                <Header />
                <HomePage />
            </div>
        );
    }
}

export default App;
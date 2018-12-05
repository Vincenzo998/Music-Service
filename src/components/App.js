import React, {Component} from 'react'; 
import {Route, Switch} from 'react-router-dom';
import Spotify from 'spotify-web-api-js';

import HomePage from './home/HomePage';
import SideBar from './common/sideBar/SideBar';
import SearchBar from './common/searchBar/searchBar';
import DetailCategory from './detailCategory/detailCategory';
import DetailPlaylist from './detailPlaylist/detailPlaylist';

import './App.css';

const spotifyWebApi = new Spotify();

class App extends Component {
    constructor(props,context) {
        super(props,context);
        this.state = {
            music: ''
        };

        if(localStorage.getItem('access_token')) {
            spotifyWebApi.setAccessToken(localStorage.getItem('access_token'));
        }

        this.updateSearch = this.updateSearch.bind(this);
        this.getOnSearch = this.getOnSearch.bind(this);
    }

    updateSearch(event) {
        this.setState({
            music: event.target.value
        });
    }

    getOnSearch() {
        spotifyWebApi.search(this.state.music, ['album', 'artist', 'playlist', 'track'])
            .then(response => {
                console.log(response);
            });
    }

    render () {
        return (
            <div id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
                <SearchBar onChange={this.updateSearch} onSearch={this.getOnSearch}/>
                <div id="page-wrap">
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/category/:id" component={DetailCategory}/>
                        <Route path="/playlist/:id" component={DetailPlaylist}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
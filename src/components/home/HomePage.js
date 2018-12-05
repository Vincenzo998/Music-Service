import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import { Link } from 'react-router-dom';

import './HomePage.css';

const spotifyWebApi = new Spotify();

class HomePage extends Component {
    constructor(props, context) {
        super(props, context);
        const params = this.getHashParams();
        if(params.access_token){ 
            localStorage.setItem('access_token' , params.access_token);
            localStorage.setItem('refresh_token' , params.refresh_token);
        }

        this.state = {
            loggedIn: params.access_token ? true : false,
            categories: []
        };
        
        if (params.access_token) {
            spotifyWebApi.setAccessToken(params.access_token);
        } else if (localStorage.getItem('access_token')) {
            spotifyWebApi.setAccessToken(localStorage.getItem('access_token'));
        }
    }

    componentWillMount() {
        spotifyWebApi.getCategories()
            .then(response => {
                const categories = response.categories.items.map(category => {
                    return (
                        <Link key={category.id} 
                                to={{pathname: `/category/${category.id}`,state: {imageUrl: category.icons[0].url, name: category.name}}} 
                                className="button-category"
                        >
                            <div className="card category-custom mx-4 my-5" style={{backgroundImage: `url(${category.icons[0].url})`}}>
                                <div className="font-weight-bold pt-4">
                                    {category.name}
                                </div>
                            </div>
                        </Link>
                    );
                });
                this.setState({categories: categories});
            }).catch(e => {
                if(e.status === '401'){
                    if (localStorage.getItem('refresh_token')) {
                        spotifyWebApi.setAccessToken(localStorage.getItem('refresh_token'));
                    }
                }
            });
    }

    getHashParams() {
        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ((e = r.exec(q))) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    render() {
        return (
            <div className="container-fluid body-HomePage">
                <div className="row-12 justify-content-center custom-home-top">
                    <h2 className="pt-5"> Welcome in MusicMania! </h2>
                    <h6 className="pt-2"> Discover and maybe rediscover the music for every moment. </h6>
                </div>
                <div className="row subtitle-HomePage pt-5 mx-5">
                    <h5 className="text-category font-weight-bold"> Generi e mood </h5>
                </div>
                <div className="row justify-content-center pt-2 pb-5 px-5">
                    {this.state.categories}
                </div>
            </div>
        );
    }
}

export default HomePage;
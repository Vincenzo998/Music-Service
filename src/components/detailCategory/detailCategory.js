import React, {Component} from 'react';
import Spotify from 'spotify-web-api-js';
import {Link} from 'react-router-dom'; 

import './detailCategory.css';

const spotifyWebApi = new Spotify();

class DetailCategory extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            playlists:[],
            categoryId: this.props.match.params.id,
            imageCategory: this.props.location.state.imageUrl,
            nameCategory: this.props.location.state.name
        };

        if(localStorage.getItem('access_token')) {
            spotifyWebApi.setAccessToken(localStorage.getItem('access_token'));
        }
    }

    componentWillMount() {
        spotifyWebApi.getCategoryPlaylists(this.state.categoryId)
            .then(response => {
                const playlists = response.playlists.items.map(playlist => {
                    return (
                        <div key={playlist.id} className="card playlist-custom mx-4 my-5">
                            <Link 
                                to={{pathname:`/playlist/${playlist.id}`, state: {imageUrl: playlist.images[0].url, name: playlist.name}}}
                                className="button-playlist"
                            >
                                <img className="card-img-top" src={playlist.images[0].url}/>
                                <div className="card-body text-center font-weight-bold bodyPlaylist-custom">
                                    {playlist.name} 
                                </div>
                            </Link>
                        </div>
                    );
                });
                this.setState({playlists: playlists});
            }).catch(e => {
                if(e.status === '401'){
                    if (localStorage.getItem('refresh_token')) {
                        spotifyWebApi.setAccessToken(localStorage.getItem('refresh_token'));
                    }
                }
            });
    }

    render() {
        return (
            <div className="container-fluid pt-4 px-5 pb-5 body-detailCategory">
                <div className="row mx-5 body-imagePlaylist" style={{backgroundImage: `url(${this.state.imageCategory})`}}>
                    <h1 className="text-playlist font-weight-bold d-flex align-items-end ml-4 mb-4"> {this.state.nameCategory} </h1>
                </div>
                <div className="row mx-3 subtitle-playlist pt-5">
                    <h5 className="text-playlist font-weight-bold"> Le playlist più ascoltate </h5>
                </div>
                <div className="row justify-content-center pt-2 pb-3 px-5">
                    {this.state.playlists}
                </div>
            </div>
        );
    }
}

export default DetailCategory;

import React, {Component} from 'react';
import Spotify from 'spotify-web-api-js';
import format from 'date-fns/format';

import './detailPlaylist.css';

const spotifyWebApi = new Spotify();

class DetailPlaylist extends Component {
    constructor(props,context) {
        super(props,context);
        this.state = {
            playlistId: this.props.match.params.id,
            imagePlaylist: this.props.location.state.imageUrl,
            namePlaylist: this.props.location.state.name,
            tracks: []
        };

        if(localStorage.getItem('access_token')) {
            spotifyWebApi.setAccessToken(localStorage.getItem('access_token'));
        }
    }
    
    componentWillMount() {
        spotifyWebApi.getPlaylistTracks(this.state.playlistId)
            .then(response => {
                const tracks = response.items.map(track => {
                    const lastDuration = track.track.duration_ms;
                    const duration = format (
                        new Date(lastDuration),
                        'mm:ss'
                    );
                    return (
                        <tr key={track.track.id}>
                            <td>{track.track.name}</td>
                            <td>{track.track.artists[0].name}</td>
                            <td>{track.track.album.name}</td> 
                            <td>{track.track.album.release_date}</td>
                            <td>{duration}</td>
                        </tr>
                    );
                });
                this.setState({tracks: tracks});
            }).catch(e => {
                if(e.status === '401'){
                    if (localStorage.getItem('refresh_token')) {
                        spotifyWebApi.setAccessToken(localStorage.getItem('refresh_token'));
                    }
                }
            });
    }

    render () {
        return(
            <div className="container-fluid pt-2 px-5 pb-5 body-detailPlaylist">
                <div className="col">
                    <div className="row pb-4 pl-5">
                        <div className="col-md-2 px-0 img">
                            <img src={this.state.imagePlaylist} let="img-fluid"/>
                        </div>
                        <div className="col-md-3 pl-0 px-5 d-flex align-items-center">
                            <h2 className="text-track font-weight-bold border-bottom pb-1 px-4"> {this.state.namePlaylist} </h2>
                        </div>
                    </div>
                    <div className="row mx-3">
                        <table className="table table-striped table-dark table-track">
                            <thead>
                                <tr>
                                    <th scope="col"> Titolo </th>
                                    <th scope="col"> Artista </th>
                                    <th scope="col"> Album </th>
                                    <th scope="col"> 
                                        <i className="far fa-calendar-alt"></i> 
                                    </th>
                                    <th scope="col"> 
                                        <i className="far fa-clock"></i> 
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.tracks}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }   
}

export default DetailPlaylist;
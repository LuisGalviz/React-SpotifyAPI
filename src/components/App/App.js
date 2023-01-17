import React from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/spotify';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            playlistName: 'My PlayList',
            playlistTracks: []
        }
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlayList = this.savePlayList.bind(this);
        this.search = this.search.bind(this);
    }

    addTrack(track) {
        let tracks = this.state.playlistTracks;
        if (tracks.find(savedTrack => savedTrack.id === track.id)) {
            return;
        }

        tracks.push(track);
        this.setState({ playlistTracks: tracks });
    }

    removeTrack(track) {
        let tracks = this.state.playlistTracks;
        tracks = tracks.filter(savedTrack => savedTrack.id !== track.id);
        this.setState({ playlistTracks: tracks });
    }

    updatePlaylistName(name) {
        this.setState({
            playlistName: name
        })
    }

    savePlayList() {
        let trackURIs = this.state.playlistTracks.map(track => track.uri);
        Spotify.savePlayList(this.state.playlistName, trackURIs).then(() => {
            this.setState({
                playlistName: 'New Playlist',
                playlistTracks: []
            })
        })
    }

    search(term) {
        Spotify.search(term).then(searchResults => {
            this.setState({ searchResults: searchResults })
        })
    }

    render() {
        return (<div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                <SearchBar onSearch={this.search} />
                <div className="App-playlist">
                    <SearchResults SearchResults={this.state.searchResults} onAdd={this.addTrack} />
                    <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlayList} />
                </div>
            </div>
        </div>);
    }

}

export default App;
import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    })

    this.state = {
      album: album,
      currentSong: null,
      currentTime: 0,
      duration: album.songs[0].duration,
      currentVolume: .80,
      isPlaying: false,
      hoveredSong: null
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
    this.audioElement.volume = this.state.currentVolume
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumeupdate: e => {
        this.setState({ currentVolume: this.audioElement.volume });
      },
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumeupdate', this.eventListeners.volumeupdate);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumeupdate', this.eventListeners.volumeupdate);
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
      this.setState({ currentSong: null });
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  mouseEnter(song) {
    this.setState({ hoveredSong: song});
  }

  mouseLeave(song) {
    this.setState({hoveredSong: null});
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex -1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(4, currentIndex +1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVol = e.target.value;
    console.log(newVol);
    this.audioElement.volume = newVol;
    this.setState({ currentVolume: newVol });
  }

  formatTime(d) {
    d = Number(d);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var mDisplay = m > 0 ? m + (m === 1 ? ":" : ":") : "--:";
    var sDisplay = s > 0 ? s + (s === 1 ? " " : " ") : "--";
        sDisplay = s > 0 && s < 10 ? "0" + s : s + (s === 1 ? " " : " ");
    return mDisplay + sDisplay;
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {
              this.state.album.songs.map( (songs, index) =>
                  <tr className="songs" key={index} onClick={() => this.handleSongClick(songs)} >
                    <td onMouseEnter={() => this.mouseEnter(songs)} onMouseLeave={() => this.mouseLeave(songs)} >
                      {this.state.currentSong === songs && (
                        <span className={'ion-pause'}></span>
                      )}
                      {this.state.currentSong !== songs && this.state.hoveredSong === songs && (
                        <span className={'ion-play'}></span>
                      )}
                      {this.state.currentSong !== songs && this.state.hoveredSong !== songs && (
                        <span>{index+1}</span>
                      )}
                    </td>
                    <td>{songs.title}</td>
                    <td>{this.formatTime(songs.duration)}</td>
                  </tr>
              )
            }
          </tbody>
        </table>
        <PlayerBar
          className="player-bar"
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          currentVolume={this.state.currentVolume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          formatTime={(d) => this.formatTime(d)}
        />
      </section>
    );
  }
}

export default Album

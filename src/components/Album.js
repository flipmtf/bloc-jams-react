import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    })

    this.state = {
      album: album
    };
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
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
          </colgroup
          <tbody>
            {
              this.state.albums.map( (album, index) =>
                <Link to={`/album/${album.slug}`} key={index}>
                  <tr>
                    <td>"Number will go here"</td>
                    <td key={title}>{album.songs.title}</td>
                    <td key={duration}>{album.songs.duration} "seconds"</td>
                  </tr>
                </Link>
              );
            }
          </tbody>
        </table>
      </section>
    );
  }
}

export default Album

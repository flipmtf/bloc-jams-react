import React, { Component } from 'react';
import {Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
<<<<<<< HEAD
import Albums from './components/Albums';
=======
import Album from './components/Album';
>>>>>>> checkpoint-3-routing

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <Link to='/'>Landing</Link>
            <Link to='/library'>Library</Link>
          </nav>
          <h1>Bloc Jams</h1>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
<<<<<<< HEAD
          <Route path="/album" component={Albums} />
=======
          <Route path='/album' component={Album} />
>>>>>>> checkpoint-3-routing
        </main>
      </div>
    );
  }
}

export default App;

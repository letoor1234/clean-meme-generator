import React, {Fragment} from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom'

import Header from './components/Header.js'
import Nav from './components/Nav.js'
import Main from './components/Main.js'

import './styles.css';

function App() {
  return (
    <Fragment>
      <Router>
        <Header
          title='Clean Meme Searcher!!!'
        />
        <Nav
          buttons={['randomize', 'searching', 'all']}
          paths={['/random', '/search', '/all']}
        />
        <Main/>
      </Router>
    </Fragment>
  );
}

export default App;

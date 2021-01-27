import React, {Fragment} from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Header from './components/Header.js'
import Nav from './components/Nav.js'
import Galery from './components/Galery.js'
import Random from './components/Random.js'

import './css/styles.css';

function App() {
  return (
    <Fragment>
      <Router>
        <Header
          title='Clean Meme Searcher!!!'
        />
        <Nav
          buttons={['randomize', 'all', 'search', 'about']}
          paths={['/random', '/all', '/search', '/about']}
        />
        <Route path='/all'>
          <Galery/>
        </Route>
        <Route path='/random'>
          <Random/>
        </Route>
      </Router>
    </Fragment>
  );
}

export default App;

import React, {Fragment} from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Header from './components/Header.js'
import Nav from './components/Nav.js'
import Galery from './components/Galery.js'
import Randomizer from './components/Randomizer.js'
import Searcher from './components/Searcher.js'

import './css/styles.css';

function App() {
  return (
    <Fragment>
      <Router>
        <Header
          title='Clean Meme Searcher!!!'
        />
        <Nav
          buttons={['galery', 'randomize', 'about']}
          paths={['/', '/randomize', '/about']}
        />
        <Route path='/' exact>
          <Galery/>
        </Route>
        <Route path='/randomize'>
          <Randomizer/>
        </Route>
      </Router>
    </Fragment>
  );
}

export default App;

/* eslint-disable arrow-body-style */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Page from '../Page/Page';

import { withFavoritesStore } from '../../hocs/withFavoritesStore';
import { withBeersStore } from '../../hocs/withBeersStore';

import '../../grid.css';
import './App.css';

const App = () => {
    const favorites = withFavoritesStore(Page);
    const beers = withBeersStore(Page);

    return (
		<div className="app">
              <Header />
              <main className="container">
                  <Switch>
                    <Route exact path="/fave" component={favorites} />
                    <Route path="/" component={beers} />
                  </Switch>
              </main>
		</div>
	);
};

export default App;
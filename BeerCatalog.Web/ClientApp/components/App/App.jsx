import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Page from '../CatalogPage/CatalogPage';
import BeerPage from '../BeerPage/BeerPage';

import { withFavoritesStore } from '../hocs/withFavoritesStore';
import { withBeersStore } from '../hocs/withBeersStore';

import '../../grid.css';
import '../../main.css';

const App = () => {
    const FavoritesPage = withFavoritesStore(Page);
    const BeersPage = withBeersStore(Page);

    return (
		<div className="app">
              <Header />
              <main className="container">
                  <Switch>
                      <Route path="/fave" component={FavoritesPage} />
                      <Route exact path="/" component={BeersPage} />
                      <Route path="/beers/:id" component={BeerPage} />
                  </Switch>
              </main>
		</div>
	);
};

export default App;
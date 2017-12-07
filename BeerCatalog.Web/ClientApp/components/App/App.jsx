import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from 'Components/Header/Header';
import CatalogPage from 'Components/CatalogPage/CatalogPage';
import BeerPage from 'Components/BeerPage/BeerPage';

import { withFavoritesStore } from 'Components/hocs/withFavoritesStore';
import { withBeersStore } from 'Components/hocs/withBeersStore';

import 'AppRoot/grid.css';
import 'AppRoot/main.css';

const App = () => {
    const FavoritesPage = withFavoritesStore(CatalogPage);
    const BeersPage = withBeersStore(CatalogPage);

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
/* eslint-disable arrow-body-style */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Catalog from '../CatalogContainer/Catalog';

import '../../grid.css';
import './App.css';

const App = () => {
    return (
		<div className="app">
              <Header />
              <main className="container">
                  <Switch>
                      <Route exact path="/fave" component={Catalog} />
                      <Route path="/" component={Catalog} />
                  </Switch>
              </main>
		</div>
	);
};

export default App;
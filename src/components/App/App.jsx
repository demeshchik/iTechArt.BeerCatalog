/* eslint-disable arrow-body-style,indent */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Catalog from '../../containers/Catalog/Catalog';

import * as grid from '../../grid.css';
import * as styles from './app.css';

const App = () => {
    return (
		<div className={styles.app}>
              <Header />
              <main className={grid.container}>
                  <Switch>
                      <Route exact path="/BeerCatalog/fave" component={Catalog} />
                      <Route path="/BeerCatalog/" component={Catalog} />
                  </Switch>
              </main>
		</div>
	);
};

export default App;
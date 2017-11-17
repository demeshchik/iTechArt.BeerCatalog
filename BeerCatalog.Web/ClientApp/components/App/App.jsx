/* eslint-disable arrow-body-style */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
//import Catalog from '../CatalogContainer/Catalog';
import Base from '../../factory/Base';
import * as HOCs from "../../factory/Generators";
import Page from '../../factory/Page';
import { favoritesHOC } from '../../factory/favoritesHOC';
//import { beersHOC } from "../../factory/beersHOC";

import '../../grid.css';
import './App.css';

const App = () => {
    let hocBase = HOCs.baseHOC(Base);
    let favorites = favoritesHOC(Page);
    //let beers = beersHOC(Page);

    return (
		<div className="app">
              <Header />
              <main className="container">
                  <Switch>
                    <Route exact path="/fave" component={favorites} />
                    <Route path="/" component={hocBase} />
                  </Switch>
              </main>
		</div>
	);
};

export default App;
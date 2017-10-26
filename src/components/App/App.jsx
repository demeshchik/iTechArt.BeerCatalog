import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Header from '../Header/Header'
import Catalog from '../../containers/Catalog/Catalog'
import Fave from '../../containers/Catalog/Fave'

import * as grid from '../../grid.css'
import * as styles from './styles.css'

const App = () => {
  return <div className={styles.app}>
              <Header />
              <main className={grid.container}>
                  <Switch>
                      <Route exact path='/fave' component={Fave} />
                      <Route path='/' component={Catalog} />
                  </Switch>
              </main>
          </div>
};

export default App;
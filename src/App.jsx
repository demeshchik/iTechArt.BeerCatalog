import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Header from './Header/Header'
import Catalog from './Catalog/Catalog'
import Fave from './Catalog/Fave'

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <main>
                    <Switch>
                        <Route exact path='/' component={Catalog} />
                        <Route path='/fave' component={Fave} />
                    </Switch>
                </main>
            </div>
        )
    }
}
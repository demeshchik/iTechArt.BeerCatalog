/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/rootReducer';

import App from './components/App/App';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

function renderApp() {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
	        </Provider>
        </AppContainer>,
        document.getElementById('react-app'),
    );
}

renderApp();

if (module.hot) {
    module.hot.accept('./components/App/App', () => {
        renderApp();
    });
}
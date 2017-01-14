import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import rootReducer from '../reducers';
import Main from '../views/Main';

const reduxMiddleware = applyMiddleware(thunk, reduxPackMiddleware);

const isDevelopmentEnvironment = process.env.NODE_ENV === 'development';
const enhancer =
    isDevelopmentEnvironment ?
        compose(reduxMiddleware, ...(window.devToolsExtension ? [window.devToolsExtension()] : [])) :
        reduxMiddleware;

const store = createStore(rootReducer, enhancer);

const rootElement = document.getElementById('root');
const reactRoot = (
  <Provider store={store}>
    <AppContainer>
      <Main />
    </AppContainer>
  </Provider>
);

render(reactRoot, rootElement);

if (!isDevelopmentEnvironment) {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}

if (module.hot) {
  module.hot.accept('../views/Main', () =>
    render(Object.assign({}, reactRoot), rootElement));
}

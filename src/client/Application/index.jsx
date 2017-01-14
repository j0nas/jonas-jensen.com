import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import Main from '../views/Main';
import './style.scss';

const isDevelopmentEnvironment = process.env.NODE_ENV === 'development';
const rootElement = document.getElementById('root');
const reactRoot = (
  <AppContainer>
    <Main />
  </AppContainer>
);

render(reactRoot, rootElement);

if (isDevelopmentEnvironment) {
  if (module.hot) {
    module.hot.accept('../views/Main', () =>
      render(Object.assign({}, reactRoot), rootElement));
  }
} else {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}

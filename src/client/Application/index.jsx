import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import Main from '../views/Main';
import './style.scss';

const renderApp = () =>
    render(
      <AppContainer>
        <Main />
      </AppContainer>,
        document.getElementById('root'));

renderApp();

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('../views/Main', renderApp);
  }
} else {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}

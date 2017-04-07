import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Root from './Root';
import rootReducer from './rootReducer';
import './style.scss';

const store = createStore(rootReducer);

const renderApp = Component =>
    render(
      <AppContainer>
        <Provider store={store}>
          <Component />
        </Provider>
      </AppContainer>,
        document.getElementById('root'));

renderApp(Root);

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./', () => store.replaceReducer(require('./rootReducer').default)); // eslint-disable-line
    module.hot.accept('./Root', () => renderApp(Root));
  }
}

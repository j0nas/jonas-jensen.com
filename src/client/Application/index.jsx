import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import rootReducer from './rootReducer';
import Main from '../views/Main';
import Calc from '../views/Calc';
import './style.scss';

const store = createStore(rootReducer);

const renderApp = () =>
    render(
      <AppContainer>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <Route exact path="/" component={Main} />
              <Route path="/calc" component={Calc} />
            </div>
          </BrowserRouter>
        </Provider>
      </AppContainer>,
        document.getElementById('root'));

renderApp();

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./rootReducer', () => store.replaceReducer(require('./rootReducer').default)); // eslint-disable-line
    module.hot.accept('../views/Main', renderApp);
  }
}

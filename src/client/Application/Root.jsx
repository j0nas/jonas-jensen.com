import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from '../views/Main';
import Calc from '../views/Calc';

const Root = () =>
  <BrowserRouter>
    <div className="full">
      <Route exact path="/" component={Main} />
      <Route path="/calc" component={Calc} />
    </div>
  </BrowserRouter>;

export default Root;

import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';

const Links = () =>
  <nav className="links">
    <div><NavLink exact to="/" className="link" activeClassName="activeLink">Home</NavLink></div>
    <div><NavLink exact to="/calc" className="link" activeClassName="activeLink">Retirement calculator</NavLink>
    </div>
  </nav>;

export default Links;

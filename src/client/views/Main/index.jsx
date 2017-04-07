import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import gh from './gh.png';
import In from './in.png';
import mail from './mail.png';


const MainView = () =>
  <div className="mainContain">
    <div className="inner">
      <div className="namecontain">
        <div className="name">
          <div className="firstletter">J</div>
          <Link to="/calc">calc</Link>
          <div>o</div>
          <div>n</div>
          <div>a</div>
          <div className="firstletter">s</div>
        </div>
        <div className="name">
          <div className="firstletter">J</div>
          <div>e</div>
          <div>n</div>
          <div>s</div>
          <div>e</div>
          <div className="firstletter">n</div>
        </div>
      </div>
      <p className="subtitle">Fullstack developer, analyst</p>
      <div className="network-items">
        <a href="https://github.com/j0nas">
          <img className="network-item" src={gh} alt="GitHub" />
        </a>
        <a href="https://www.linkedin.com/in/j0nas">
          <img className="network-item" src={In} alt="LinkedIn" />
        </a>
        <a href="mailto:jonas.jensen@msn.com">
          <img className="network-item" src={mail} alt="Mail" />
        </a>
      </div>
    </div>
  </div>;

export default MainView;

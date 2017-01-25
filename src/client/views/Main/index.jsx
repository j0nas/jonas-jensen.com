import React from 'react';
import './style.scss';

const MainView = () =>
  <div className="mainContain">
    <div className="inner">
      <p>Hi.</p>
      <p>
        My name is Jonas Jensen. I am a software analyst and full-stack developer at&nbsp;
        <a href="https://www.netcompany.com/no">Netcompany Norway</a> specializing in frontend development.
      </p>

      <p>
        This is my site. As you can see, it is quite empty for now. When time permits it,
        I will update it with some interesting content. For now, I am busy delving into the rabbit hole that is
        performance optimization and perceived load time optimization. I&#39;m also working on my&nbsp;
        <a href="https://github.com/j0nas/react-fullstack-boilerplate">fullstack react&#47;redux boilerplate</a>,
        which I&#39;ve used to experiment with bleeding-edge development tools and practices to gain a deeper
        understanding in what the basics of my go-to stack consists of. At some point in the (hopefully) not-too-distant
        future, I hope to gain a much deeper understanding of the concept of abstraction layers in software development.
      </p>
      <p>
        The last reads that have made an impression on me were&nbsp;
        <a href="http://jgthms.com/web-design-in-4-minutes">Web design in 4 minutes</a> by Jeremy Thomas and&nbsp;
        <a href="https://hackernoon.com/@david.gilbertson">David Gilbertson&#39;s writing</a>.
      </p>
      <p>
        I can be reached through the following channels:
        <br />
        <a href="mailto:jonas.jensen@msn.com">jonas.jensen@msn.com</a> |&nbsp;
        <a href="https://github.com/j0nas">Github</a> |&nbsp;
        <a href="https://www.linkedin.com/in/j0nas">LinkedIn</a>
      </p>
    </div>
  </div>;

export default MainView;

import React from "react";
import AppBar from 'material-ui/AppBar';
import BlogPostCard from "./BlogPostCard";
import "./App.css";
import muiImg from "./images/mui.jpg";

const App = () =>
    <div>
        <AppBar title="Home"/>
        <BlogPostCard
            title={<a href='http://www.material-ui.com/'>Material UI is neat!</a>}
            subtitle="Exploring bleeding-edge UI design"
            img={muiImg}
        />
    </div>;

export default App;

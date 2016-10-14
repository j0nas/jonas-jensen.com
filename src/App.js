import React from "react";
import AppBar from 'material-ui/AppBar';
import BlogPostCard from "./BlogPostCard";
import "./App.css";


const App = () =>
    <div>
        <AppBar title="Home"/>
        <BlogPostCard/>
    </div>;

export default App;

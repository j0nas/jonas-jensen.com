import React from "react";
import AppBar from 'material-ui/AppBar'
import "./App.css";
import PostContainer from "./components/PostContainer";
import posts from "./posts";

const App = () =>
    <div>
        <AppBar title="Home"/>
        <PostContainer posts={posts} />
    </div>;

export default App;

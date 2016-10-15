import React from "react";
import AppBar from 'material-ui/AppBar'
import "./App.css";
import PostContainer from "./components/PostContainer";

const App = () =>
    <div>
        <AppBar title="Home"/>
        <PostContainer/>
    </div>;

export default App;

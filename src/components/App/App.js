import React from "react";
import AppBar from 'material-ui/AppBar'
import "./style.css";
import PostContainer from "../PostContainer";

const App = ({posts}) =>
    <div>
        <AppBar title="Home"/>
        <PostContainer posts={posts}/>
    </div>;

App.propTypes = {
    posts: React.PropTypes.array.isRequired
};

export default App;

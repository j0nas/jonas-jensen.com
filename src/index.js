import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import {Router, Route, browserHistory} from "react-router";
import App from "./components/App/App";
import PostContainer from "./components/PostContainer";
import Post from "./components/Post";
import "./index.css";

injectTapEventPlugin();

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="blog" component={PostContainer}/>
            <Route path="blog/:postId" component={Post}/>
            <Route path="*"/>
        </Route>
    </Router>,
    document.getElementById('root')
);

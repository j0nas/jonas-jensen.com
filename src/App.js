import React from "react";
import AppBar from 'material-ui/AppBar';
import BlogPostCard from "./BlogPostCard";
import "./App.css";

import posts from "./posts";

const App = () =>
    <div>
        <AppBar title="Home"/>
        {posts.map((post, index) =>
            <BlogPostCard title={post.title} subtitle={post.subtitle} img={post.img} key={index}/>
        )}
    </div>;

export default App;

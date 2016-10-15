import React from "react";
import BlogPostCard from "../BlogPostCard";

import post_151016 from "./151016";
const posts = [
    post_151016
];

const PostContainer = () =>
    <span>
        {posts.map((post, index) =>
            <BlogPostCard title={post.title} subtitle={post.subtitle} img={post.img} key={index}/>
        )}
    </span>;

export default PostContainer;
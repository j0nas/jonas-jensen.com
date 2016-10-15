import React from "react";
import BlogPostCard from "../BlogPostCard";

const PostContainer = ({route: {posts}}) =>
    <span>
        {posts.map(({title, subtitle, img, date}, index) =>
            <BlogPostCard title={title} subtitle={subtitle} img={img} key={index} date={date}/>
        )}
    </span>;

export default PostContainer;
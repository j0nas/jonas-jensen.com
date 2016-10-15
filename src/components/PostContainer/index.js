import React from "react";
import BlogPostCard from "../BlogPostCard";

const PostContainer = ({posts}) =>
    <span>
        {posts.map((post, index) =>
            <BlogPostCard title={post.title} subtitle={post.subtitle} img={post.img} key={index}/>
        )}
    </span>;

const postType = React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    subtitle: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    img: React.PropTypes.string.isRequired,
});

PostContainer.propTypes = {
    posts: React.PropTypes.arrayOf(postType).isRequired
};

export default PostContainer;
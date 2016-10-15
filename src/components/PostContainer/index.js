import React from "react";
import BlogPostCard from "../BlogPostCard";
import posts from "../../posts";

const PostContainer = () =>
    <span>
        {posts.map(({title, subtitle, img, date}, index) =>
            <BlogPostCard title={title} subtitle={subtitle} img={img} key={index} date={date}/>
        )}
    </span>;

const postType = React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    subtitle: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    img: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
});

PostContainer.propTypes = {
    // posts: React.PropTypes.arrayOf(postType).isRequired
};

export default PostContainer;
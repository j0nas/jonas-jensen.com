import React from "react";
import Paper from "material-ui/Paper";
import posts from "../../posts";

const postStyle = {
    padding: 10,
};

const Post = ({params: {postId}}) =>
    <div className="CardContain">
        <Paper style={postStyle}>
            {posts.find(post => post.date === postId).text}
        </Paper>
    </div>;

export default Post;
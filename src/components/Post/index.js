import React from "react";
import Paper from "material-ui/Paper";

const postStyle = {
    padding: 10,
};

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {post: {}}
    }

    componentDidMount = () =>
        this.setState({post: this.props.route.props.posts.find(post => post.date === this.props.params.postId)});

    render = () =>
        <div className="CardContain">
            <Paper style={postStyle}>
                <article>
                    <header>
                        <h1>{this.state.post.title}</h1>
                        <em>{this.state.post.subtitle}</em>
                    </header>
                    <main>
                        <p>{this.state.post.text}</p>
                    </main>
                </article>
            </Paper>
        </div>;
}

export default Post;
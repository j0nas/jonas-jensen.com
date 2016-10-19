import React from "react";
import Paper from "material-ui/Paper";
import "./style.css";

const postStyle = {
    padding: 20,
};

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {post: {}}
    }

    componentDidMount = () =>
        this.setState({post: this.props.route.posts.find(post => post.date === this.props.params.postId)});

    render = () =>
        <Paper style={postStyle}>
            <article className="PostArticle">
                <header>
                    <h1>{this.state.post.title}</h1>
                    <em className="PostSubtitle">{this.state.post.subtitle}</em>
                </header>
                <main>
                    <p>&nbsp;</p>
                    <p className="PostText" dangerouslySetInnerHTML={{__html: this.state.post.text}}/>
                </main>
                <footer className="PostFooter">
                    <p>
                        <br/>
                        <em>
                            Jonas Jensen
                            <br/>
                            {this.state.post.date}
                        </em>
                    </p>
                </footer>
            </article>
        </Paper>;
}

export default Post;
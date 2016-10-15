import React from "react";
import {Card, CardMedia, CardTitle} from 'material-ui/Card';
import DefaultCardHeader from "./DefaultCardHeader";
import muiImg from "../images/mui.jpg";
import "./style.css";

const BlogPostCard = ({title, subtitle, img}) =>
    <div className="CardContain">
        <Card>
            <DefaultCardHeader/>
            <CardMedia overlay={<CardTitle title={title} subtitle={subtitle}/>}>
                <img src={muiImg} alt="React"/>
            </CardMedia>
        </Card>
    </div>;

BlogPostCard.propTypes = {
    title: React.PropTypes.node.isRequired,
    subtitle: React.PropTypes.string.isRequired,
    img: React.PropTypes.string.isRequired,
};

export default BlogPostCard;
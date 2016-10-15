import React from "react";
import {Card, CardMedia, CardTitle} from 'material-ui/Card';
import DefaultCardHeader from "./DefaultCardHeader";
import muiImg from "./images/mui.jpg";
import "./style.css";

const BlogPostCard = () =>
    <div className="CardContain">
        <Card>
            <DefaultCardHeader/>
            <CardMedia overlay={
                <CardTitle
                    title={<a href='http://www.material-ui.com/'>Material UI is neat!</a>}
                    subtitle="Exploring bleeding-edge UI design"/>
            }>
                <img src={muiImg} alt="React"/>
            </CardMedia>
        </Card>
    </div>;

export default BlogPostCard;
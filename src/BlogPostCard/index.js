import React from "react";
import {Card, CardHeader, CardMedia, CardTitle} from 'material-ui/Card';
import alarm from "./images/alarm_material_ui.gif";
import avatar from "./images/photo.jpg";
import "./style.css";

const BlogPostCard = () =>
    <div className="CardContain">
        <Card>
            <CardHeader
                title={<a href="/bio">Jonas Jensen</a>}
                subtitle={new Date().toLocaleString()}
                avatar={avatar}/>
            <CardMedia overlay={
                <CardTitle
                    title={<a href='http://www.material-ui.com/'>Material UI is neat!</a>}
                    subtitle="Exploring bleeding-edge UI design"/>
            }>
                <img src={alarm} alt="React"/>
            </CardMedia>
        </Card>
    </div>;

export default BlogPostCard;
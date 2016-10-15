import React from "react";
import {Card, CardMedia, CardTitle} from 'material-ui/Card';
import DefaultCardHeader from "./DefaultCardHeader";
import alarm from "./images/alarm_material_ui.gif";
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
                <img src={alarm} alt="React"/>
            </CardMedia>
        </Card>
    </div>;

export default BlogPostCard;
import React from "react";
import {CardHeader} from 'material-ui/Card';
import avatar from "./images/photo.jpg";

const DefaultCardHeader = () =>
    <CardHeader
        title={<a href="/bio">Jonas Jensen</a>}
        subtitle={new Date().toLocaleString()}
        avatar={avatar}/>;


export default DefaultCardHeader;
import React from "react";
import {CardHeader} from 'material-ui/Card';
import avatar from "./images/photo.jpg";

const DefaultCardHeader = ({date}) =>
    <CardHeader title={<a href="/bio">Jonas Jensen</a>} subtitle={date} avatar={avatar}/>;

DefaultCardHeader.propTypes = {
    date: React.PropTypes.string.isRequired,
};

export default DefaultCardHeader;
import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import {Link} from "react-router";

const AppDrawer = ({docked, open, setDrawerState}) =>
    <Drawer docked={docked} open={open} onRequestChange={open => setDrawerState(open)}>
        <Link to="/" onClick={() => setDrawerState(false)}>
            <MenuItem>
                Home
            </MenuItem>
        </Link>
        <Link to="/blog" onClick={() => setDrawerState(false)}>
            <MenuItem>
                Blog
            </MenuItem>
        </Link>
    </Drawer>;

export default AppDrawer;
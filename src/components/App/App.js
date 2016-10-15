import React from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import AppDrawer from "../AppDrawer";
import "./style.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showDrawer: props.location.pathname === "/",};
        this.toggleShowDrawer = this.toggleShowDrawer.bind(this);
        this.setDrawerState = this.setDrawerState.bind(this);
    }

    setDrawerState = open => this.setState({showDrawer: open});
    toggleShowDrawer = () => this.setState({showDrawer: !this.state.showDrawer});

    render = () =>
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <div>
                <AppBar title="Home" onLeftIconButtonTouchTap={this.toggleShowDrawer}/>
                <AppDrawer
                    docked={false}
                    open={this.state.showDrawer}
                    setDrawerState={this.setDrawerState}/>
                {this.props.children}
            </div>
        </MuiThemeProvider>;
}

export default App;

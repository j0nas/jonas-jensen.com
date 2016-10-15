import React from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import "./style.css";

const App = ({posts, children}) =>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
            <AppBar title="Home"/>
            {children}
        </div>
    </MuiThemeProvider>;

App.propTypes = {
    // posts: React.PropTypes.array.isRequired
};

export default App;

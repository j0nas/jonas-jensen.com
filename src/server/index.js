const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const api = require('./api');
const webpackConfig = require('../client/dev.webpack.config.js');
const devMiddlewareConfig = {
    stats: {
        colors: true,
        children: false,
        reasons: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false
    }
};

const compiler = webpack(webpackConfig);
const devMiddleware = webpackDevMiddleware(compiler, devMiddlewareConfig);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/api', api);
app.use(devMiddleware);
app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res) => {
    const split = req.url.split('/');
    const file = split[split.length - 1];
    if (['bundle.js', 'index.html'].indexOf(file) !== -1) {
        res.end(devMiddleware.fileSystem.readFileSync(path.join(webpackConfig.output.path, file)))
    } else if (file.indexOf('.') === -1) {
        res.end(devMiddleware.fileSystem.readFileSync(path.join(webpackConfig.output.path, 'index.html')))
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port :" + port));

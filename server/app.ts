import * as express from 'express';
import * as compression from 'compression';

var bodyParser = require('body-parser'),
    morgan     = require('morgan'),
    path       = require('path'),
    config     = require('./config/config'),
    mongoose   = require('mongoose'),
    passport   = require('passport'),
    index     = require('./routes/index'),
    user       = require('./routes/user'),
    phone      = require('./routes/phone'),
    news       = require('./routes/news'),
    department = require('./routes/department'),
    coordination = require('./routes/coordination'),
    home         = require('./routes/home'),
    bot          = require('./routes/bot');

const app: express.Application = express();

// Connection with database
var options = {
    server: {
        socketOptions: {
            keepAlive: 300000, connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS : 30000
        }
    }
};

if(process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI, options);
} else {
    mongoose.connect(config.database, options);
}

app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, '/../client')));
// if (app.get('env') === 'production') {
//     app.use(express.static(path.join(__dirname, '/../client')));
// }
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(compression());
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());
require('./config/passport')(passport);

// Routes
app.use('/api/home', home);
app.use('/api/bot', bot);
app.use('/api/user', user);
app.use('/api/phone', phone);
app.use('/api/news', news);
app.use('/api/department', department);
app.use('/api/coordination', coordination);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(function (req, res) {
    res.status(404).send({
        errorMessage: 'Page Not Found'
    });
});

export { app }
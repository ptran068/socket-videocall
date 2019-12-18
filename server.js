import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from 'mongoose';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import config from './app/config/index';
import path from 'path';
import SocketModule from './app/modules/socket';
import route from './routes'
import User from './app/models/user'
const MongoStore = require('connect-mongo')(session);

const PORT = process.env.PORT || 3000;
const app = express();


const http = require('http').Server(app);
const { io } = SocketModule;
io.attach(http);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect(config.db.host, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(cors({ origin: 'http://web-socket-video-call.herokuapp.com' , credentials :  true}));
app.use(session({
    store: new MongoStore({ url: 'mongodb://balotv:ptran068@ds255794.mlab.com:55794/balotv' }),
    secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
    resave: true,
    saveUninitialized: true
}));

app.use( function (req, res, next) {
    if (req.session && req.session.user) {
        User.findOne({ email: req.session.user.email }, function (err, user) {
            if (user) {
                req.user = user;
                delete req.user.password; // delete the password from the session
                req.session.user = user; // refresh the session value
                res.locals.user = user;
            }
            // finishing processing the middleware and run the route
            next();
        });
    } else {
        next();
    }
});
app.use(route());
SocketModule.init()

//   app.use(function (req, res, next) {
    
//     res.setHeader('Access-Control-Allow-Origin', '*');
  
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  
//   //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
//     // Pass to next layer of middleware
//     next();
//   });
http.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});





module.exports = app;
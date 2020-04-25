const express = require('express'), session = require('express-session'), passport = require('passport');
const flash = require('connect-flash'), expressLayouts = require('express-ejs-layouts'); 
const MongoConnect = require('connect-mongo')(session), db_connection = require('./config/mongoose_config');  
const passportConfig = require('./config/passport_local_config'); 
const bodyParser = require('body-parser'); 
const PORT = process.env.PORT || 5500; 
const app = express(); 
const websocketServer = require('http').createServer(app); 
const socketServe = require('./config/chat_server_config').socketServe(websocketServer);
websocketServer.listen(3000, ()=>{
    console.log("Socket Server have been established successfully on port: ", 3000); 
}) 
app.set('view engine', 'ejs'); 
app.set('views', './views'); 
app.use(expressLayouts); 
app.use(express.static('./assets')); 
app.set("layout extractScripts", true); 
app.set("layout extractStyles", true); 

app.use(flash()); 

app.use(bodyParser.urlencoded({extended: true})); 
app.use(session({
    saveUninitialized: false, 
    resave: false, 
    name: 'garbage', 
    secret: 'no use just garbage', 
    cookie: {
        maxAge: 1000*60*60*24
    }, 
    store: new MongoConnect({
        mongooseConnection: db_connection
    })
})); 
app.use(passport.initialize()); 
app.use(passport.session()); 

app.use('/', require('./routes/index')); 


app.listen(PORT, (err)=>{
    if(err){
        console.log("Error while starting the server on port: ", PORT)
        return ;
    }
    console.log("Server started succesfully on port: ", PORT); 
})
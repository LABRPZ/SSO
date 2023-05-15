var express = require('express');
var cors = require('cors')
var app = express();
app.use(cors())
const bodyParser = require('body-parser');

//configuración para que solo acepte peticiones nuestras

/* var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
} */

//ejemplo de como usar la configuración de nuestro cors


/* app.get('/products/:id', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for only example.com.'})
}) */

//#region middlewares
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

var usersRouter = require('./routes/users');




app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/api', usersRouter);



module.exports = app;

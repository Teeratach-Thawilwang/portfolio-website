const express = require('express')
const cors = require('cors')
const router = require('./route/index')
const socket = require('./socket/socket')
var createError = require('http-errors');

const app = express()

app.use(express.json());

//enables cors
app.use(cors())

// use custom router
app.use('/', router)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// set port 
app.set('port', process.env.PORT || 8081);
// app.set('port', process.env.PORT || 35001);

// starting http server
const httpServer = app.listen(8081, () => {
    console.log('Backend Server start at', '\x1b[36m', 'http://localhost:' + app.get('port') + '/', '\x1b[0m');
})

// binding socket io
socket.getSocket(httpServer);
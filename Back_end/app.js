const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./route/index')
const socket = require('./socket/socket')

//enables cors
app.use(cors())
app.use(router)

app.set('port', process.env.PORT || 8081);
const httpServer = app.listen(8081, () => {
    console.log('Backend Server start at', '\x1b[36m', 'http://localhost:' + app.get('port') + '/', '\x1b[0m');
})

socket.getSocket(httpServer);
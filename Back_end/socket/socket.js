const socketIO = require('socket.io')

module.exports = {
    getSocket: (httpServer) => {
        const io = socketIO(httpServer, {
            cors: {
                origin: "*"
            }
        })
        io.on('connection', (socket) => {
            console.log(socket.id, ' connected.')
            var tmp = [
                { username: "นายA", comment: "ทักทาย", datetime: "Tue, 12 Apr 2022, 21:06:46" },
                { username: "นายB", comment: "ทักทาย", datetime: "Tue, 12 Apr 2022, 21:06:46" },
                { username: "นายC", comment: "ทักทาย", datetime: "Tue, 12 Apr 2022, 21:06:46" },
                // { username: "นายD", comment: "ทักทาย", datetime: "Tue, 12 Apr 2022, 21:06:46" },
                // { username: "นายE", comment: "ทักทาย", datetime: "Tue, 12 Apr 2022, 21:06:46" },
            ]
            // emit to client connection
            // get data from database
            socket.emit('allMessage', tmp)

            socket.on('addMessage', (data) => {
                var temp = { username: data.username, comment: data.comment, datetime: data.datetime }
                // emit to all client except sender
                socket.broadcast.emit('newMessage', temp)
            })

            socket.on('typing', (data) => {
                // emit to all client except sender
                socket.broadcast.emit('userTyping', { username: data.username })
            })

            socket.on('disconnect', () => {
                console.log(socket.id, 'has disconnected.')
            })

        })

        return io
    }
}

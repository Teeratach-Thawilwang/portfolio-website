const socketIO = require('socket.io')
var ChatDB = require('../models/chat')

module.exports = {
    getSocket: (httpServer) => {
        const io = socketIO(httpServer, {
            cors: {
                origin: "*"
            }
        })
        io.on('connection', (socket) => {
            // console.log(socket.id, ' connected.')

            // emit to client connection
            // get data from database
            ChatDB.find().exec((err, doc) => {
                // remove old comment when data over 100 record.
                if (doc.length > 50) {
                    // console.log('check len ',doc.length)
                    var i = 0;
                    for (i = 0; i < 50; i++) {
                        ChatDB.findByIdAndDelete(doc[i]._id, {
                            useFindAndModify: false
                        }).exec((err) => {
                            if (err) console.log('Delete record error : ', err)
                        })
                    }
                }
                socket.emit('allMessage', doc)
            })

            socket.on('addMessage', (data) => {
                var temp = {
                    username: data.username,
                    comment: data.comment,
                    datetime: data.datetime
                }
                // emit to all client except sender
                socket.broadcast.emit('newMessage', temp)

                // save to database
                let tempDB = new ChatDB({
                    'username': data.username,
                    'comment': data.comment,
                    'datetime': data.datetime
                })
                ChatDB.saveComment(tempDB, (err) => {
                    if (err) console.log('saveComment to db error : ', err)
                })
            })

            socket.on('typing', (data) => {
                // emit to all client except sender
                socket.broadcast.emit('userTyping', { username: data.username })
            })

            // socket.on('disconnect', () => {
            //     console.log(socket.id, 'has disconnected.')
            // })

        })

        return io
    }
}

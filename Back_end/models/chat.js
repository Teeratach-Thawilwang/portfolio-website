// Import mongoose
const mongoose = require('mongoose')

// connect to mongodb
const dburl = "mongodb://localhost:27017/realtime-chat";
mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => console.log(err))


// design schema
let chatSchema = mongoose.Schema({
    username: String,
    comment: String,
    datetime: String
})

// create model
let Chat = mongoose.model("chat", chatSchema)

// create insert method 
function saveComment(model, data) {
    model.save(data)
}

// export model
module.exports = Chat
module.exports.saveComment = saveComment
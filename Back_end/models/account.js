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
    email: String,
    password: String
}, { timestamps: {} })

// create model
let account = mongoose.model("account", chatSchema)

// create insert method 
function saveAccount(model, data) {
    model.save(data)
}

// export model
module.exports = account
module.exports.saveAccount = saveAccount
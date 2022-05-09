// Import mongoose
const mongoose = require('mongoose')

// connect to mongodb
const dburl = "mongodb://localhost:27017/realtime-chat";
const accountClient = mongoose.createConnection(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// design schema
let chatSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    user_id: String,
    token: String,
    isAdmin: { type: Boolean, default: false },
}, { timestamps: {} })

// create model
let account = accountClient.model("account", chatSchema)

// create save method 
function saveAccount(model, data) {
    model.save(data)
}

// export model
module.exports = account
module.exports.saveAccount = saveAccount
// Import mongoose
const mongoose = require('mongoose')

// connect to mongodb
const dburl = "mongodb://localhost:27017/fakenews";
const labelDesClient = mongoose.createConnection(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// design schema
let labelDesSchema = mongoose.Schema({
    Real: String,
    Satire: String,
    FalseNews: String,
    Commentary: String,
    Persuasive: String,
    Polarizing: String,
    Misreporting: String,
    NoReference: String,
    SharePost: String,
    Video: String,
    Deleted: String,
}, { collection: 'labelDes' })

// create model
let labelDes = labelDesClient.model("labelDes", labelDesSchema)

// export model
module.exports = labelDes
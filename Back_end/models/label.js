// Import mongoose
const mongoose = require('mongoose')

// connect to mongodb
const dburl = "mongodb://localhost:27017/fakenews";
const labelClient = mongoose.createConnection(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// design schema
let labelSchema = mongoose.Schema({
    post_id: Number,
    labeller: String,
    status: String,
    Real: Boolean,
    Satire: Boolean,
    FalseNews: Boolean,
    Commentary: Boolean,
    Persuasive: Boolean,
    Polarizing: Boolean,
    Misreporting: Boolean,
    NoReference: Boolean,
    Video: Boolean,
    Deleted: Boolean,
}, { collection: 'label' })

// create model
let labels = labelClient.model("label", labelSchema)

// create save method 
function save(model, data) {
    model.save(data)
}

// export model
module.exports = labels
module.exports.save = save
// Import mongoose
const mongoose = require('mongoose')

// connect to mongodb
const dburl = "mongodb://localhost:27017/fakenews";
const postClient = mongoose.createConnection(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// design schema
let postSchema = mongoose.Schema({
    page_name: String,
    post_id: String,
    post_text: String,
    like: Number,
    love: Number,
    support: Number,
    haha: Number,
    wow: Number,
    sorry: Number,
    anger: Number,
    share: Number,
    comment_count: Number,
    post_time: String,
    fetch_time: String,
    url: String,
}, { collection: 'post' })

// create model
let posts = postClient.model("post", postSchema)

// export model
module.exports = posts
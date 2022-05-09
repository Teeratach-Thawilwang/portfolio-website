const express = require('express')
const router = express.Router();
const fs = require('fs')
const path = require('path');

// import middleware
const auth = require("../middleware/auth")

// import chat model
var accountCL = require('../models/account');
var postCL = require('../models/post');
var labelCL = require('../models/label');
var labelDesCL = require('../models/labelDes');

// import bcrypr
const bcrypt = require("bcrypt");

// import jwt
const JWT = require("jsonwebtoken")

// const { route } = require('express/lib/application');

/******************* Useful function *******************/
// These function might be move to helpers folder
const createToken = async (email, expiretime = '2h') => {
    return JWT.sign(
        { user_id: email },
        process.env.TOKEN_KEY,
        {
            expiresIn: expiretime
        })
}

const getpost = async (posts, labels) => {
    const data = [];
    for (let i = 0; i < posts.length; i++) {
        for (let j = 0; j < labels.length; j++) {
            if (posts[i].post_id === labels[j].post_id) {
                const temp = {
                    post_id: posts[i].post_id,
                    page_name: posts[i].page_name,
                    post_time: posts[i].post_time,
                    labeller: labels[j].labeller,
                    status: labels[j].status,
                }
                data[i] = temp;
                break;
            }
        }
    }
    return data
}
/*********************** Route ************************/
router.get('/', (req, res) => {
    res.send('Teeratach Express.js Server')
});

router.post('/login', async (req, res) => {
    const body = req.body;
    const user = await accountCL.findOne({ email: body.email });
    if (user) {
        // if email is exist, check password with hash password
        const validPassword = await bcrypt.compare(body.password, user.password)
        if (validPassword) {
            // validatation true = password is correct.
            let accData = { username: user.username, email: user.email, token: user.token }
            let msg = { message: 'valid password', account: accData }
            res.status(200).json(msg)
        } else {
            res.status(400).json({ error: 'Invalid password' })
        }
    } else {
        // Email does not exist in db.
        res.status(401).json({ error: 'Email does not exist.' })
    }
})

router.post('/signin', async (req, res) => {
    const body = req.body
    if (!(body.email && body.password)) {
        return res.status(400).send({ error: "Data not formatted properly" });
    }
    const user = await accountCL.findOne({ email: body.email });
    if (!user) {
        const user = new accountCL(body);
        // set salt = 7
        const salt = await bcrypt.genSalt(7);
        // encrypt password
        user.password = await bcrypt.hash(user.password, salt);
        // create jwt token by using email
        let token = await createToken(user.email)
        user.token = token
        // insert account to db.
        console.log('insert ', user)
        accountCL.saveAccount(user, (err) => {
            if (err) {
                console.log('Error in /signin : ', err)
                res.status(500).json({ error: 'Cannot create account.' })
            } else {
                res.status(200).json({ message: 'Create account successfully.', token: token })
            }
        })
    } else {
        res.status(409).json({ error: 'This email is already used.' })
    }
})

router.post('/checkLogin', async (req, res) => {
    const body = req.body
    const user = await accountCL.findOne({ email: body.email });
    if (user.token === body.token) {
        // correct email and token
        let accData = { username: user.username, email: body.email }
        res.status(200).json({ message: 'Valid cookies', account: accData })
    } else {
        res.status(401).json({ error: 'Invalid cookies' })
    }
})

/* Label  */
router.get('/getPosts', auth, async (req, res) => {
    const body = req.query
    let postCount = await postCL.count({})
    const nSkip = (body.nPage - 1) * body.row
    const nLimit = body.row
    if (body.nPage >= 1 && body.row >= 1 && postCount >= body.nPage * body.row) {
        const posts = await postCL.find({},
            { _id: 0, page_name: 1, post_id: 1, post_time: 1 })
            .skip(nSkip)
            .limit(nLimit);
        const labels = await labelCL.find({},
            { _id: 0, post_id: 1, labeller: 1, status: 1 })
            .skip(nSkip)
            .limit(nLimit);

        // join by post_id
        const data = await getpost(posts, labels)

        res.status(200).json({ posts: data })
    } else {
        res.status(401).json({ error: 'Invalid request' })
    }
})

router.get('/posts', auth, async (req, res) => {
    const body = req.query
    const posts = await postCL.findOne({ post_id: body.post_id.toString() })
    res.status(200).json({ posts: posts })
})

router.get('/label', auth, async (req, res) => {
    const body = req.query
    const labels = await labelCL.findOne({ post_id: body.post_id.toString() })
    res.status(200).json({ labels: labels })
})

router.get('/labelDes', auth, async (req, res) => {
    const labelDes = await labelDesCL.find({})
    res.status(200).json({ labelDes: labelDes[0] })
})

router.post('/label/update', auth, async (req, res) => {
    const body = req.body
    body.status = 'done'
    body.post_id = body.post_id.toString()
    delete body._id
    const labels = await labelCL.findOneAndUpdate({ post_id: body.post_id.toString() }, body, { new: 1 });
    const labelsObj = labels.toObject()
    delete labelsObj._id
    if (JSON.stringify(labelsObj) === JSON.stringify(body)) {
        res.status(200).json({ message: 'Update successfully.' })
    } else {
        res.status(500).json({ error: 'Cannot update.' })
    }
})

router.get('/html', (req, res) => {
    const body = req.query
    const filePath = `../../data/html/post_url_${body.page_name}_posts_${body.post_id}.html`
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(401).json({ error: "No such file or directory" })
        } else {
            res.set('Content-Type', 'text/html');
            res.send(data.toString())
        }
    })
})

router.get('/getPostImage/:post_id', auth, async (req, res) => {
    const body = req.params
    const filePath = `../../data/image/`
    const fileName = `_postID_${body.post_id}_`
    const fileNameList = []
    fs.readdirSync(filePath).forEach(file => {
        if (file.includes(fileName)) {
            fileNameList.push(file)
        }
        return
    });
    res.status(200).json({ image: fileNameList })
})

router.get('/postImage/:filename', async (req, res) => {
    const body = req.params
    const filePath = `../../data/image/` + body.filename
    res.status(200).sendFile(path.resolve(filePath), (err) => {
        if (err) {
            res.status(401).json({ error: "No such file or directory" })
        }
    })
})

module.exports = router;
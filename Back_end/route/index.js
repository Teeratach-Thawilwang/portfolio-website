const express = require('express')
const router = express.Router();

// import chat model
var accountDB = require('../models/account');

// import bcrypr
const bcrypt = require("bcrypt");
const { route } = require('express/lib/application');

/******************* Useful function *******************/
const createCookiesLogin = async (email) => {
    // set salt = 5
    const salt = await bcrypt.genSalt(5);
    // encrypt email
    const hashEmail = await bcrypt.hash(email, salt);
    return hashEmail
}

const checkCookiesLogin = async (email, hashEmail) => {
    const validCookiesLogin = await bcrypt.compare(email, hashEmail)
    return validCookiesLogin
}
/*********************** Route ************************/
router.get('/', (req, res) => {
    res.send('Teeratach Express.js Server')
});

router.post('/login', async (req, res) => {
    const body = req.body;
    const user = await accountDB.findOne({ email: body.email });
    if (user) {
        // if email is exist, check password with hash password
        const validPassword = await bcrypt.compare(body.password, user.password)
        if (validPassword) {
            // validatation true = password is correct.
            let HashEmail = await createCookiesLogin(user.email)
            let accData = { username: user.username, email: user.email, hashEmail: HashEmail }
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
    const user = await accountDB.findOne({ email: body.email });
    if (!user) {
        const user = new accountDB(body);
        // set salt = 7
        const salt = await bcrypt.genSalt(7);
        // encrypt password
        user.password = await bcrypt.hash(user.password, salt);
        // hash email
        let HashEmail = await createCookiesLogin(user.email)
        // insert account to db.
        console.log('insert ', user)
        accountDB.saveAccount(user, (err) => {
            if (err) {
                console.log('Error in /signin : ', err)
                res.status(500).json({ error: 'Cannot create account.' })
            } else {
                res.status(200).json({ message: 'Create account successfully.', hashEmail: HashEmail })
            }
        })
    } else {
        res.status(401).json({ error: 'This email is already used.' })
    }
})

router.post('/checkLogin', async (req, res) => {
    const body = req.body
    let valid = await checkCookiesLogin(body.email, body.hashEmail)
    if (valid) {
        // correct email and hashEmail
        const user = await accountDB.findOne({ email: body.email });
        let accData = { username: user.username, email: body.email }
        res.status(200).json({ message: 'Valid cookies', account: accData })
    } else {
        res.status(401).json({ error: 'Invalid cookies' })
    }
})

module.exports = router;
const express = require('express')
const router = express.Router();

// import chat model
var accountDB = require('../models/account');

// import bcrypr
const bcrypt = require("bcrypt");

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
            let accData = { username: user.username, email: user.email }
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
        // insert account to db.
        console.log('insert ', user)
        accountDB.saveAccount(user, (err) => {
            if (err) {
                console.log('Error in /signin : ', err)
                res.status(500).json({ error: 'Cannot create account.' })
            } else {
                res.status(200).json({ message: 'Create account successfully.' })
            }
        })
    }else{
        res.status(401).json({error : 'This email is already used.'})
    }
})

module.exports = router;
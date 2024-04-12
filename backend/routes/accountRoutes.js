const express = require('express');
const router = express.Router();
const accountSchema = require('../model/accountSchema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(algorithm, key, iv);
const decipher = crypto.createDecipheriv(algorithm, key, iv);

rfTokens = [];

// Create Account
router.post('/createAccount', async (req, res) => {
    try {
        const b = req.body;

        // Check if email exists
        const check = await accountSchema.find({ email: b.email });
        if (check[0]) return res.json({ message: "Email already linked to account." });

        // Create Account and Log in
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(b.password, salt);

        let encrypted = cipher.update(b.dob, 'utf8', 'hex');
        encrypted += cipher.final('hex');


        const account = new accountSchema({
            email: b.email,
            password: hashedPass,
            userName: b.userName,
            dob: encrypted,
        });

        const newAccount = await account.save();

        res.status(201).json(newAccount);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Log In
router.post('/login', async (req, res) => {
    const b = req.body;
    const account = await accountSchema.find({ email: b.email });

    if (account[0] == undefined) return res.json({ message: "User not found" });

    //Check password
    try {
        if (bcrypt.compare(b.password, account[0].password)) {
            //Create JWT
            const sig = { email: account[0].email, name: account[0].name };
            const accessToken = generateToken(sig);
            //const refreshToken = jwt.sign(sig, process.env.REFRESH_TOKEN_SECRET);

            //rfTokens.push(refreshToken);
            return res.status(200).json(sig);
        }
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
});

// Check if Email exists
router.post('/checkEmail', async (req, res) => {
    const b = req.body;
    const check = await accountSchema.find({ email: b.email }, { email: true });
    console.log(check)
    if (check[0]) return res.status(200).json({ emailTaken: true });
    return res.status(200).json({ emailTaken: false });
});

// Check if user name exists
router.post('/checkUserName', async (req, res) => {
    const b = req.body;
    const check = await accountSchema.find({ userName: b.userName }, { userName: true });
    if (check[0]) return res.status(200).json({ nameTaken: true });
    return res.status(200).json({ nameTaken: false });
});

//Generate Token
function generateToken(sig) {
    return jwt.sign(sig, process.env.JWT_CODE, { expiresIn: '30s' });
}


module.exports = router;
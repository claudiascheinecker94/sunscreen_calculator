const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const { checkUser } = require('../middleware/authMiddleware');
const Detail = require('../models/Details');

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    //incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'This email address is not registered';
        return errors;
    }

    //incorrect password
    if(err.message === 'incorrect password'){
        errors.password = 'This password is incorrect';
        return errors;
    }

    // duplicate error code
    if (err.code === 11000) {
        errors.email = 'This email address is already registered';
        return errors;
    }

    //validation errors
    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });

        return errors;
    }
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => { //id is payload
    return jwt.sign({ id }, 'claudia secret', {
        expiresIn: maxAge //requires time in seconds
    });
}

module.exports.status_get = (req, res) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'claudia secret', async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.json({ user: null });
            } else {
                let user = await User.findById(decodedToken.id);
                res.json({ user });
            }
        })
    } else {
        res.json({ user: null});
    }
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}


module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user : user._id });
    }
    catch (err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}


module.exports.accountsetup_get = (req, res, next) => {
    res.render('accountsetup');
    //globalUserId = req.params.userId;
    //console.log("in the get " + globalUserId);
}

module.exports.accountsetup_post = async (req, res) => {
    //console.log("in the post " + globalUserId)

    try{
        const userId = res.locals.user._id;
        console.log('User: ' + userId);

        const { height, weight, age, skin } = req.body;
        console.log(req.body);
        const detail = await Detail.create({ userId, height, weight, age, skin });
        res.status(201).json({ detail : detail.userId });
    } catch (e) {
        console.log(e);
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });

    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}

module.exports.forgotpassword_post = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({email});

        //check if user was found in db
        if(user !== null){
            //create reset token
            const resetToken = createToken(user._id);
            user.resetToken = resetToken;
            res.cookie('resetToken', resetToken, { httpOnly: true, expiresIn: '24h' });
            await User.findOneAndUpdate({email: email}, user);
        
            //send email with reset link to user (for now console.log token)
            console.log("reset link", `http://localhost:3000/resetpassword?resetToken=${resetToken}`);
            res.status(200).json("Reset Instructions Sent");

        } else {
            const err = 'No user with this email found.';
            res.status(400).json(err);
        }

    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.resetpassword_post = async (req, res)=> {
    console.log(req.body)
    const password = req.body.password;
    const resetToken = req.body.token;
    var tokenVerified = false;


    //check if reset token is valid
    console.log('check token')
    if(resetToken){
        jwt.verify(resetToken, 'claudia secret', (err, decodedToken) => {
            if(err){
                console.log(err.message);
            } else {
                tokenVerified = true;
                console.log('success');
            }
        })
    } else {
        console.log('No Token Detected');
    }

    //reset password
    console.log('reset password')
    if(tokenVerified) {
        try {
            const user = await User.findOne ({resetToken: resetToken});
            
            if(user) {
                const email = user.email;
                user.password = password;
                user.resetToken = null;
                await user.save(); 
                res.status(200).json('Password reset successfully.');
            } else {
                res.status(400).json('Token has already been used. Please request a new token.');
            }
    
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({errors});
        }
    }
}

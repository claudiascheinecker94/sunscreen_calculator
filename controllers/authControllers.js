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
        errors.email = 'that email is not registered';
        return errors;
    }

    //incorrect password
    if(err.message === 'incorrect password'){
        errors.password = 'that password is incorrect';
        return errors;
    }

    // duplicate error code
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
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

//emergency - just create a local variable, but unsafe
//let globalUserId;

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

module.exports.userpage_get = async (req, res) => {

    try {
        let userId = req.params.detailId; //detailId = userId
        console.log(req.params.detailId);
        let accountDetails = await Detail.find({userId});

        console.log(accountDetails[0].height);
        res.render('userpage', { accountDetails });
    } catch(err) {
        console.log(err);
        res.redirect('/error');
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
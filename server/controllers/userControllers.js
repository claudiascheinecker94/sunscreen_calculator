const Parser = require('rss-parser')
const jwt = require('jsonwebtoken');
const { checkUser } = require('../middleware/authMiddleware');
const User = require('../models/Users');
const Detail = require('../models/Details');
const Goal = require('../models/Goals');
const Reading = require('../models/Readings');

module.exports.userpage_get = async (req, res) => {

    try {
        let userId = req.params.detailId; //detailId = userId
        let accountDetails = await Detail.find({userId});

        res.status(200).json({accountDetails});
    } catch(err) {
        console.log(err);
        res.status(400).json({});
    }       
}

module.exports.userpage_put = async (req, res) => {
//https://stackoverflow.com/questions/60499814/put-request-with-express-and-mongo-db
//https://mongoosejs.com/docs/tutorials/findoneandupdate.html 
    try {
        let userId = req.params.detailId; //detailId = userId
        console.log(req.params.detailId)
        console.log(req.body)
        const data = await Detail.findOneAndUpdate({userId}, {
            height: req.body.height,
            weight: req.body.weight,
            age: req.body.age,
            skin: req.body.skin
        });

        res.status(200).send({data});
    } catch(err) {
        console.log(err);
        res.status(400).send('not updated');
    }       
}

module.exports.deleteaccount_delete = async (req, res) => {
    let userId = req.params.id
    let confirmationOfDeletion = false;

    try {
        await User.deleteOne({_id : userId});
        await Detail.deleteOne({userId});
        await Reading.deleteMany({userId});
        await Goal.deleteMany({userId});

        confirmationOfDeletion = true;
        console.log('successfully deleted db entries');
        res.status(200).json({confirmationOfDeletion});

    } catch (error) {
        res.status(400).json(error);
    } 
}

module.exports.goals_get = async (req,res) => {
    try {
        let userId = req.params.id; //detailId = userId
        let totalGoalProgress = await Goal.find({userId});
        let totalCalculations = await Reading.find({userId});
        //console.log("Calculations:" + totalCalculations);
        res.status(200).json({totalGoalProgress, totalCalculations});
    } catch(err) {
        res.status(400).json(err);
    }       
}

module.exports.goals_post = async (req, res) => {
    const { success } = req.body;

    try {
        const userId = req.params.id;
        const marked_complete = new Date();
        const goal = await Goal.create({ userId, marked_complete, success })
        res.status(200);
    }
    catch (err){
        res.status(400).json({ err });
    }
}

module.exports.news_get = async (req, res) => {
    
    try {
        const feedURL = "https://sundoctors.com.au/blog/category/sun-protection/feed/"
        const parser = new Parser();
        let articles = [];

        const feed = await parser.parseURL(feedURL);
            
        feed.items.forEach(item => {
            articles.push({item})
        })

        res.status(200).json({articles});
    } catch (error) {
        res.status(400).json({ error });
        console.log(error);
    }
    //https://www.youtube.com/watch?v=cPOFttS3-CI&ab_channel=Mind-Boggling
    //https://www.isdin.com/en-US/blog/skincare/sun-protection/
    //<link rel="alternate" type="application/rss+xml" title="SunDoctors &raquo; Sun Protection Category Feed" href="https://sundoctors.com.au/blog/category/sun-protection/feed/" />
    //<link rel="alternate" type="application/rss+xml" title="The Skin Cancer Foundation &raquo; Ask the Expert: Does a High SPF Protect My Skin Better? Comments Feed" href="https://www.skincancer.org/blog/ask-the-expert-does-a-high-spf-protect-my-skin-better/feed/" />
    //<link rel="alternate" type="application/rss+xml" title="RSS Feed" href="https://thesunscreencompany.com/blog?format=rss" />
}
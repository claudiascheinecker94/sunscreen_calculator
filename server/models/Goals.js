const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    marked_complete: {
        type: Date,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
    }
});

// fire a function after a doc saved to db
goalSchema.post('save', function(doc, next){
    console.log('goal saved', doc);
    next();
})

const Goal = mongoose.model('goal', goalSchema);

module.exports = Goal;
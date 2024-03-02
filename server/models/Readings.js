const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    reapplicationRate: {
        type: Number,
        required: true,
    },
    reapplicationPerDay: {
        type: Number,
        required: true,
    }
});

// fire a function after a doc saved to db
readingSchema.post('save', function(doc, next){
    console.log('reading saved', doc);
    next();
})

const Reading = mongoose.model('reading', readingSchema);

module.exports = Reading;
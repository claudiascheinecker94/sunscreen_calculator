const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    height: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    skin: {
        type: Number,
        required: true,
    }
});

// fire a function after a doc saved to db
detailSchema.post('save', function(doc, next){
    console.log('details saved', doc);
    next();
})

const Detail = mongoose.model('detail', detailSchema);

module.exports = Detail;
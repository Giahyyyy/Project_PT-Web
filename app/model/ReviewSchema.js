// ReviewSchema.js
const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    comment: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
});

const Review = model('Review', reviewSchema);

module.exports = Review;

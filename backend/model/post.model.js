const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Users who liked the post
    media: [{ type: String }],  // URLs for images/videos
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;

/**
 * Created by sanketp on 11/16/2015.
 */
var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    body: String,
    author: String,
    upVotes: {type: Number, default: 0},
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
});

commentSchema.methods.upVote = function(cb) {
    this.upVotes += 1;
    this.save(cb);
}

mongoose.model('Comment', commentSchema);
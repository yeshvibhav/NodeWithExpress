/**
 * Created by sanketp on 11/16/2015.
 */
var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
   title: String,
    link: String,
    upVotes: {type: Number, default: 0},
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

postSchema.methods.upVote = function(cb) {
    this.upVotes += 1;
    this.save(cb);
};

mongoose.model('Post', postSchema);
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
/*var User = mysql.model('Users');*/

var passport = require('passport');
var jwt = require('express-jwt');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/* GET home page. */

router.get('/', function(req, res, next) {
    var message="";
    var ErrMessage="";
    ErrMessage.message ="";
  res.render('index', {ErrorMessage: ''});
});
var userAuth = require('../controller/UserAuthController');
var merchants = require('../controller/MerchantController');
/*router.post('/', userAuth.adminLogin, function(req, res, next) {

});*/

router.get('/menuBar', function(req, res, next) {

    res.render('index', {title: 'Authentication'});
});

router.post('/addUserList',function(req, res, next) {
console.log("addUsers");
    merchants.addUsersList(req,res);

});

router.post('/insertFetchDetails',function(req, res, next) {

    merchants.insertFetchUsersList(req,res);

});
router.get('/delay',function(req, res, next) {

    merchants.delay(req,res);

});
router.post('/insertFetchUsersListPromises',function(req, res, next) {

    merchants.insertFetchUsersListPromises(req,res);

});
router.get('/withPromises',function(req, res, next) {

    merchants.withPromises(req,res);

});
router.get('/testPromises',function(req, res, next) {

    merchants.testPromises(req,res);

});



/*router.get('/login', merchant.getMerchantList);*/


router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts) {
    if(err) {
      return next(err);
    }
    res.json(posts);
  });
});

router.post('/posts', auth, function(req, res, next) {
  var post = new Post(req.body);
  post.author = req.payload.username;

  post.save(function(err, post) {
    if(err) {
      return next(err);
    }
    res.json(post);
  });
});

router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);
  query.exec(function(err, post) {
    if(err) {
      return next(err);
    }
    if(!post) {
      return next(new Error('cant\'t find post'));
    }

    req.post = post;
    return next();
  });
});

router.put('/posts/:post/upvote', auth, function(req, res, next) {
  req.post.upVote(function(err, post) {
    if(err) {
      return next(err);
    }
    res.json(post);
  });
});

router.param('comment', auth, function(req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function(err, comment) {
    if(err) {
      return next(err);
    }
    if(!comment) {
      return next(new Error('cant\'t find comment'));
    }

    req.comment = comment;
    return next();
  });
});

router.post('/posts/:post/comments', auth, function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;
  comment.author = req.payload.username;

  comment.save(function(err, comment) {
    if(err) {
      return next(err);
    }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err) {
        return next(err);
      }
      res.json(comment);
    });
  });
});

router.put('/posts/:post/comments/:comment/upvote', auth, function(req, res, next) {

  req.comment.upVote(function(err, comment) {
    if(err) {
      return next(err);
    }
    res.json(comment);
  });
});

router.get('/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    if(err) {
      return next(err);
    }
    res.json(post);
  });
});

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password);

  user.save(function (err){
    if(err){
        return res.status(500).json({message: 'User already exits.'})
    }
    return res.json({token: user.generateJWT()})
  });
});

router.post('/', function(req, res, next){
    if(!req.body.username || !req.body.password) {
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    passport.authenticate('local', function (err, user, info) {
        if(err) {

            res.render('index', {ErrorMessage: 'Invalid User'});
        }

        if(user) {

            res.render('dashBoard', {ErrorMessage: ''});

        } else {

            var ErrMessage ="";
            var message = 'Invalid User';
            ErrMessage.message ='Invalid User';
            res.render('index', {ErrorMessage:'Invalid User'});
        }
    })(req, res, next);
});

module.exports = router;

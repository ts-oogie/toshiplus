const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; 
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    }); 
});

passport.use(new GoogleStrategy({ 
    clientID: keys.clientID,
    clientSecret: keys.secret,
    callbackURL : "/auth/google/callback"
}, 
    (accessToken,refreshToken, profile, done ) => { 

        //Find all instances of profile.id
        //if there are no records of profile.id, then create new user
        //else do nothing

        User.findOne({ googleID: profile.id }).then((usersExisting) => {
        	if (usersExisting) {
                done(null, usersExisting);
            }
        	else {
        		 new User({ 
		        	googleID: profile.id,
		        	profileName: profile.displayName,
		        	firstName: profile.name.givenName,
		        	lastName: profile.name.familyName,
		        	email: profile.emails[0].value
		        }).save().then(user => done(null, user)); 
        	} 
        });  
       
    } 
));


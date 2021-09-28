const passport = require('passport');
 
module.exports = (app) => {
	app.get('/auth/google', 
	    passport.authenticate('google', {
	        scope: ['profile', 'email']
	    })
	);

	app.get('/auth/google/callback', 
	    passport.authenticate('google', {
	        scope: ['profile', 'email']
	    }, 
		(accessToken,refreshToken, profile, done ) => {
			console.log("accessToken : ", accessToken);
			console.log("refreshToken : ", refreshToken);
			console.log("profile : ", profile);
			console.log("GOT IT");
		}
		)
	);

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});
};
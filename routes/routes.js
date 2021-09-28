module.exports = (app) => {

	//main
	app.get('/' , function(req, res ){ 
	    res.sendFile(__dirname + '/home.html');
	});

	//Projects
	app.get('/projects/leechesposter' , function(req, res ){ 
	    res.sendFile(__dirname + '/projects/leechesposter/index.html');
	}); 

	app.get('/projects/tva' , function(req, res ){ 
	    res.sendFile(__dirname + '/projects/tvapocalypse/index.html');
	}); 

	app.get('/projects/sccperformance' , function(req, res ){ 
	    res.sendFile(__dirname + '/projects/sccperformance/index.html');
	}); 

	app.get('/projects/sccperformancesite' , function(req, res ){ 
	    res.sendFile(__dirname + '/projects/sccperformancesite/index.html');
	});  

	app.get('/projects/leeches' , function(req, res ){ 
	    res.sendFile(__dirname + '/projects/leeches/index.html');
	}); 

	app.get('/projects/banyan_one' , function(req, res ){ 
	    res.sendFile(__dirname + '/projects/banyan_one/index.html');
	}); 



	//Develop 
	app.get('/develop' , function(req, res ){ 
	    res.sendFile(__dirname + '/dev.html');
	}); 

	//Design
	app.get('/design' , function(req, res ){ 
	    res.sendFile(__dirname + '/home.html');
	});  
	
	// Login 
	app.get('/login/user', (req, res) => { 
	    res.sendFile(__dirname + '/login.html');
	});


};


 
var path = require('path'),
	fs = require('file'),
	uuid = require('node-uuid'),
	mongo = require('mongodb'),
	moment = require('moment'),
	mocks = require('./mockDataHelpers');

var users = require(path.join(__dirname, '..', 'tests', 'seed', 'users.json'));
var tokens = require(path.join(__dirname, '..', 'tests', 'seed', 'tokens.json'));
var employees = require(path.join(__dirname, '..', 'tests', 'seed', 'employees.json'));

let handler = (handler) => {
	return (req,res,next) => {
		try {
	    	console.log('APS API received ' + req.method + ' ' + req.url);
            //console.dir(req);
			//if (req.params) { console.log(JSON.stringify(req.params, null, 4));}
			//if (req.body) { console.log(JSON.stringify(req.body, null, 4)); }

	    	var raisehttperror = req.params.raisehttperror;
	        if (raisehttperror && raisehttperror > 0) {
	        	console.log('Raising HTTP error: ' + raisehttperror);
	        	res.writeHead(raisehttperror);
	            res.end('bad stuff happened');
	            return next();
	        }

	    	var raiseapperror = req.params.raiseapperror;
	        if (raiseapperror && raiseapperror > 0) {
	        	console.log('Raising App error: ' + raiseapperror);

	        	res.writeHead(200, { 'Content-Type': 'application/json' });
	            res.end(JSON.stringify({error: raiseapperror}));

	            return next();
	        }

            handler(req.params, req.body, (data) => {
	        	res.writeHead(200, { 'Content-Type': 'application/json' });
	            res.end(JSON.stringify(data));

		        return next();
	        });
	    } catch (ex) {
	    	console.error('Error in processing REST operation: ' + ex);
	        return next();
	    }
    }
}

let login = (params, body, cb) => {
	return new Promise((resolve,reject) => {
		var file = path.join(__dirname, '..', 'tests', 'seed', 'jwt.json');
		fs.readFile(file, (err,data) => {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	})
	.then((jwt) => {
		cb && cb(jwt);
	})
	.catch((err) => {
		console.error(err);
		throw err;
	});
}

let logout = (params, body, cb) => {
	cb && cb();
}

let getGrosses = (params, body, cb) => {
	// generate grosses for each employee
	console.log('>> Generate grosses for ' + params.unit + ' starting ' + params.start);
	let data = [];
	employees.forEach((employee) => {
		let dt = moment(params.start); dt.startOf('week'); dt.add(1,'d');	// start on monday
		let count = 0;
		if (params.unit == 'day') {
			count = 1;
		} else if (params.unit == 'week') {
			count = 6;
		} else if (params.unit == 'month') {
			count = (4 * 6) - 4;
		} else if (params.unit == 'year') {
			count = (52 * 6) - 52;
		}
		// pick a random day to skip (employee day off)
		let skip = mocks.Helpers.generateInt(1,6);
		let incrementAndSkipSunday = (d) => {
			d.add(1,'d');
			if (d.day() == 0) { // always skip sunday
				d.add(1,'d');
			}
		}
		console.log('>>> Generate ' + count + ' grosses for ' + employee.name + ', skipping day of week ' + skip);
		data = data.concat(mocks.generate(count, (i) => {
			//console.log('>>> Generate ' + i + ' gross for ' + employee.name);
			let gross = {
				_id: mongo.ObjectID(),
				id: uuid.v1(),
				employee: {
					id: employee.id,
					name: employee.name,
					title: employee.title,
					rent: employee.rents[0].percentage
				},
				amount: dt.day() == skip ? 0 : mocks.Helpers.generateDecimal(100,500,2),
				on: dt.toDate(),
				modified: moment().toDate(),
				modifiedby: 'admin'
			};
			incrementAndSkipSunday(dt);
			//console.log(gross);
			return gross;
		}));
	});

	cb && cb(data);
}


module.exports = [
	{
    	method: 'post',
    	url: '/login',
        handler: handler(login)
    },
	{
    	method: 'post',
    	url: '/logout',
        handler: handler(logout)
    },
	{
    	method: 'get',
    	url: '/api/grosses/:unit/:start',
        handler: handler(getGrosses)
    }
];

'use strict'
var program = require('commander'),
	config = require('config'),
	jwt = require('jsonwebtoken');

let collect = (val, memo) => {
	memo.push(val);
	return memo;
}

function main(args) {
	try {
		var opts = {
			token: args.token,
        	userid: args.userid,
			username: args.username,
			fname: args.fname,
			lname: args.lname,
			roles: args.roles && args.roles.length > 0 ? args.roles : ['user'],
			secret: args.secret
	    };

	    console.error('');
	    console.error('Generate JSON Web Token');
	    //console.error('  ' + JSON.stringify(opts, null, 4));
	    console.error('');

        let user = {
			"userid": opts.userid,
			"username": opts.username,
	        "firstname": opts.fname,
	        "lastname": opts.lname,
			"email": '',
	        "roles": opts.roles,
	        "status": 'active'
        };
		let token = jwt.sign({user: user, token: opts.token}, opts.secret, {expiresIn: '180d'});
        console.log(token);
	    console.error('');
	    console.error('done');

	    return 0;

	} catch(ex) {
		console.error('Failed to generate json web token: ' + ex);
	    return -1;
	}
}

program
	.version('0.0.1')
	.description('Generate JSON Web Token')
	.option('-t, --token <s>', 'Auth Token')
	.option('-u, --userid <s>', 'User Id')
	.option('-n, --username <s>', 'User Name')
	.option('-f, --fname <s>', 'User First Name')
	.option('-l, --lname <s>', 'User Last Name')
	.option('-r, --role [c]', 'Security Role(s)', collect, [])
	.option('-s, --secret <s>', 'Secret', config.session.secret)
	.parse(process.argv);

main(program);

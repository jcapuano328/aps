'use strict'
var program = require('commander');
var restify = require('restify');

let run = (port, routes) => {
	port = port || 8282;
    routes = require(routes || './routes.js');

	console.log('Starting Mock REST Service');

	var server = restify.createServer();
    server.use(restify.queryParser());
    server.use(restify.bodyParser({mapParams: false}));
    server.use(restify.authorizationParser());
	server.use(restify.fullResponse());
	/*(server.use(restify.CORS({
	  //origins: ['*'],
	  credentials: true//,
	  //headers: ['authorization']
  	}));*/

	server.pre(restify.CORS({
	  origins: ['*'],
	  credentials: true,
	  headers: ['X-Requested-With', 'Authorization']
	}));
	server.pre(restify.fullResponse());
	server.on('MethodNotAllowed', (req, res) => {
	    if (req.method.toLowerCase() === 'options') {
	      var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'Origin', 'X-Requested-With', 'Authorization']; // added Origin & X-Requested-With & **Authorization**

	      if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');

	      res.header('Access-Control-Allow-Credentials', true);
	      res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
	      res.header('Access-Control-Allow-Methods', res.methods.join(', '));
	      res.header('Access-Control-Allow-Origin', req.headers.origin);

	      return res.send(200);
	   } else {
	      return res.send(new restify.MethodNotAllowedError());
	   }
	});

    loadRoutes(server, routes);

	console.log('Listening...');
	server.listen(port, () => {
    	//console.log('%s listening at %s', server.name, server.url);
        console.log('Mock REST Server running at %s', server.url);
	});
}

let loadRoutes = (server, routes) => {
	console.log('Creating routes...');
    if (routes && routes.length > 0) {
    	for (var i = 0; i<routes.length; i++) {
        	var route = routes[i];
            console.log('   ' + route.method + ' @ ' + route.url);
        	if (route.method == 'post') {
            	server.post(route.url, route.handler);
            }
            else if (route.method == 'get') {
            	server.get(route.url, route.handler);
            }
            else if (route.method == 'put') {
            	server.put(route.url, route.handler);
            }
            else if (route.method == 'delete') {
            	server.del(route.url, route.handler);
            }
            else {
            	console.log('Unknown REST operation specified: ' + route.method);
            }
        }
    }
}

let main = (args) => {
	try {
		console.log('');
		console.log('Creating Mock REST Service');
		var opts = {
        	port: args.port,
			routes: args.routes
	    };
		//console.log(opts);
	    run(opts.port, opts.routes);

		return 0;
	} catch (ex) {
		console.error('Error in creating Mock REST Service: ' + ex);
	    return -1;
	}
}

program
	.version('0.0.1')
	.description('Mock REST Services')
	.option('-p, --port <s>', 'Port', 4000)
	.option('-r, --routes <s>', 'Routes')
	.parse(process.argv);

main(program);

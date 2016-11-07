'use strict'
var program = require('commander'),
	uuid = require('node-uuid'),
	mongo = require('mongodb'),
	moment = require('moment');

let randomFloat = (low,high,precision) => {
	low = low || 0;
    high = high | 1000;
    precision = precision || 2;
	var p = Math.pow(10, precision);
    var d = (Math.random()*(high-low+1)) + low;
	return Math.ceil(d * p) / p;
}

let collect = (val, memo) => {
  memo.push(val);
  return memo;
}


function main(args) {
	try {
		var opts = {
        	employeeid: args.employeeid,
			start: args.start,
			count: args.count
	    };

	    console.error('');
	    console.error('Generate Daily Grosses ');
	    //console.error('  ' + JSON.stringify(opts, null, 4));
	    console.error('');

		console.log('[');

		let now = moment().format();
		opts.employeeid.forEach((employeeid) => {
			let dt = moment(args.start);
			for (var i = 0; i<opts.count; i++) {
				let gross = {
					_id: mongo.ObjectID(),
			        id: uuid.v1(),
			        employeeid: employeeid,
			        amount: randomFloat(100, 500),
			        on: 'ISODate(' + dt.format() + ')',
			        modified: 'ISODate(' + now + ')',
			        modifiedby: 'admin'
				};
				console.log(JSON.stringify(gross, null, 4) + ',');
				dt.add(1,'d');
				if (dt.day() == 0) {
					dt.add(1,'d');
				}
			}
		});
		console.log(']');

	    return 0;

	} catch(ex) {
		console.error('Failed to generate daily grosses: ' + ex);
	    return -1;
	}
}

program
	.version('0.0.1')
	.description('Generate Daily Grosses for an Employee')
	.option('-e, --employeeid [c]', 'Employee Id(s)', collect, [])
	.option('-s, --start <s>', 'Start Date', new Date())
	.option('-c, --count <s>', 'Number of days', 7)
	.parse(process.argv);

main(program);

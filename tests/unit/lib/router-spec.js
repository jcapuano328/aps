'use strict';
var chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon'),
	sandbox = require('sandboxed-module'),
	path = require('path');
chai.use(require('sinon-chai'));

describe('Router', () => {
	var env = {};
	beforeEach(() => {
		env = {};
		env.log = sandbox.require('../../mocks/log')();

		env.config = {
			paths: {
				routes: [path.join(__dirname, '..', '..', 'fixtures', 'routes')]
			}
		};
		env.file = {
			walk: sinon.stub()
		};
		env.server = {
	        get: sinon.stub(),
	        post: sinon.stub(),
			put: sinon.stub(),
			del: sinon.stub(),
			delete: sinon.stub()
		};
		env.auth = sinon.stub().returns(() => {});

		env.routes = {
			file1: {
				path: path.join(env.config.paths.routes[0], 'file1.js'),
				routes: [
					{
						method: 'get',
						uri: '/path/to/resource1',
						protected: true,
						handler: sinon.stub()
					},
					{
						method: 'post',
						uri: '/path/to/resource2',
						protected: true,
						handler: sinon.stub()
					}
				]
			},
			file2: {
				path: path.join(env.config.paths.routes[0], 'sub', 'file2.js'),
				routes: [
					{
						method: 'put',
						uri: '/path/to/resource3',
						protected: false,
						handler: sinon.stub()
					},
					{
						method: 'delete',
						uri: '/path/to/resource4',
						protected: true,
						handler: sinon.stub()
					}
				]
			}
		};

		env.modules = {
			'file': env.file,
			'./log': env.log
		};
		env.modules[env.routes.file1.path] = env.routes.file1.routes;
		env.modules[env.routes.file2.path] = env.routes.file2.routes;

		env.router = sandbox.require('../../../lib/router', {
			requires: env.modules
		})(env.config)(env.auth);
	});

	describe('register', () => {
		describe('array', () => {
			beforeEach((done) => {
				env.file.walk.yields(null, null, null, [env.routes.file1.path, env.routes.file2.path]);
				env.router.register(env.server)
				.then(() => { done(); })
				.catch(done);
			});
			it('should load the route definitions', () => {
				expect(env.file.walk).to.have.been.calledWith(env.config.paths.routes[0]);
			});
			it('should register the route definitions', () => {
				expect(env.server.get).to.have.been.calledWith('/path/to/resource1', sinon.match.func, sinon.match.func);
				expect(env.server.post).to.have.been.called;
				expect(env.server.put).to.have.been.called;
				expect(env.server.delete).to.have.been.called;
			});
		});

		describe('function', () => {
			beforeEach((done) => {
				env.modules = {
					'file': env.file,
					'./log': env.log
				};
				env.modules[env.routes.file1.path] = env.routes.file1.routes;
				env.modules[env.routes.file2.path] = () => {return env.routes.file2.routes};

				env.router = sandbox.require('../../../lib/router', {
					requires: env.modules
				})(env.config)(env.auth);

				env.file.walk.yields(null, null, null, [env.routes.file1.path, env.routes.file2.path]);

				env.router.register(env.server)
				.then(() => { done(); })
				.catch(done);
			});
			it('should load the route definitions', () => {
				expect(env.file.walk).to.have.been.calledWith(env.config.paths.routes[0]);
			});
			it('should register the route definitions', () => {
				expect(env.server.get).to.have.been.called;
				expect(env.server.post).to.have.been.called;
				expect(env.server.put).to.have.been.called;
				expect(env.server.delete).to.have.been.called;
			});
		});

		describe('authenticated', () => {
			beforeEach((done) => {
				env.file.walk.yields(null, null, null, [env.routes.file1.path, env.routes.file2.path]);

				env.router.register(env.server)
				.then(() => { done(); })
				.catch(done);
			});
			it('should load the route definitions', () => {
				expect(env.file.walk).to.have.been.calledWith(env.config.paths.routes[0]);
			});
			it('should register the route definitions', () => {
				expect(env.server.get).to.have.been.called;
				expect(env.server.post).to.have.been.called;
				expect(env.server.put).to.have.been.called;
				expect(env.server.delete).to.have.been.called;
			});
			it('should use the auth middleware', () => {
				expect(env.auth.callCount).to.equal(4);
			});
		});
	});
});

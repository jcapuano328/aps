'use strict'
var log = require('../lib/log');

/* opts
        entity:     entity name
        service:    service object or path to object (to be required)
        parent:
            name:   name of parent "entity"
            idname: name of parent "entity" id parameter
        protected:  true/false
 */
let crudRoutes = (opts) => {
    opts = opts || {
        entity: '',
        service: {
        },
        parent: {
            name: '',
            idname: ''
        },
        protected: true
    };

    let service = typeof opts.service == 'string' ? require(opts.service) : opts.service;
    service.create = service.create || promiseReject;
    service.read = service.read || promiseReject;
    service.readAll = service.readAll || promiseReject;
    service.update = service.update || promiseReject;
    service.remove = service.remove || promiseReject;
    service.removeAll = service.removeAll || promiseReject;

    let routes = [];

    ['post', 'get', 'put', 'delete'].forEach((method) => {
        let uribase = ((opts.parent && opts.parent.name) ? ('/' + opts.parent.name + '/:' + (opts.parent.idname || opts.parent.name + 'id')) : '') +
            '/' + opts.entity;

        let uri = uribase;
        if (method == 'get' || method == 'put' || method == 'delete') {
            uri += '/:id';
        }

        routes.push({
            method: method,
            uri: uri,
            protected: !!opts.protected,
            handler: handler(method, service)
        });
        if (method == 'get' || method == 'delete') {
            routes.push({
                method: method,
                uri: uribase,
                protected: opts.protected,
                handler: handler(method + 'all', service)
            });
        }
    });

    return routes;
};

let promiseReject = () => { return Promise.reject(false); };

let handler = (method, service) => {
    if (method == 'post') {
        return (req,res,next) => {
            return service.create(req.params,req.body)
            .then((data) => {
                res.send(201, data);
            })
            .catch((err) => {
                let code = err.type === 'validation' ? 400 : 500;
                res.send(code, err);
            });
        };
    }
    if (method == 'get') {
        return (req,res,next) => {
            return service.read(req.params)
            .then((data) => {
                res.send(200, data);
            })
            .catch((err) => {
                let code = err.type === 'validation' ? 400 : 500;
                res.send(code, err);
            });
        };
    }
    if (method == 'getall') {
        return (req,res,next) => {
            return service.readAll(req.params)
            .then((data) => {
                res.send(200, data);
            })
            .catch((err) => {
                let code = err.type === 'validation' ? 400 : 500;
                res.send(code, err);
            });
        };
    }
    if (method == 'put') {
        return (req,res,next) => {
            return service.update(req.params,req.body)
            .then((data) => {
                res.send(200, data);
            })
            .catch((err) => {
                let code = err.type === 'validation' ? 400 : 500;
                res.send(code, err);
            });
        };
    }
    if (method == 'delete') {
        return (req,res,next) => {
            return service.remove(req.params)
            .then((data) => {
                res.send(200, data);
            })
            .catch((err) => {
                let code = err.type === 'validation' ? 400 : 500;
                res.send(code, err);
            });
        };
    }
    if (method == 'deleteall') {
        return (req,res,next) => {
            return service.removeAll(req.params)
            .then((data) => {
                res.send(200, data);
            })
            .catch((err) => {
                let code = err.type === 'validation' ? 400 : 500;
                res.send(code, err);
            });
        }
    }
    return (req,res,next) => { next && next(); }
}

module.exports = crudRoutes;

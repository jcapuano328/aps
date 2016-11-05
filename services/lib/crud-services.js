'use strict'
var Repository = require('../lib/repository'),
    log = require('../lib/log');

/* opts
        collection: collection name
        collectionid: collection id field name
        options:
                    mongo options: sort, etc
        validators:
            create:
                params:
                data:
            read:
                params:
            readAll:
                params:
            search:
                params
            update:
                params:
                data:
            remove:
                params:
            removeAll:
                params:
        search
            params
        createNew
            params:
            data:
        newOptions
        createDoc
        preProcess
            operation:
            data:
            user:
        postProcess
            operation:
            data:
            user:
 */
let validateTrue = () => { return Promise.accept(true); };

let crudServices = (opts) => {
    opts = opts || {
        collection: '',
        collectionid: '',
        validators: {}
    };
    opts.validators = opts.validators || {};
    opts.validators.create = opts.validators.create || validateTrue;
    opts.validators.read = opts.validators.read || validateTrue;
    opts.validators.readAll = opts.validators.readAll || validateTrue;
    opts.validators.search = opts.validators.search || validateTrue;
    opts.validators.update = opts.validators.update || validateTrue;
    opts.validators.remove = opts.validators.remove || validateTrue;
    opts.validators.removeAll = opts.validators.removeAll || validateTrue;
    opts.search = opts.search || (() => {return {};});
    opts.createNew = opts.createNew || ((params, d) => {return d;});
    opts.createDoc = opts.createObject || ((d) => {return d;});
    opts.preProcess = opts.preProcess || ((o,d) => { return Promise.accept(d); });
    opts.postProcess = opts.postProcess || ((o,d) => { return Promise.accept(d); });

    return {
        create(params, data) {
            log.info('Create ' + opts.collection);
            return opts.validators.create(params, data)
            .then((valid) => {
                return opts.preProcess('create', data)
                .then((d) => {
                    let repo = Repository(opts.collection);
                    return repo.insert(d);
                })
                .then((result) => {
                    log.debug(opts.collection + ' created');
                    return opts.postProcess('create', data)
                    .then((d) => {
                        return d || result;
                    });
                });
            })
            .catch((err) => {
                log.error(err.message);
                throw err;
            });
        },

        read(params) {
            log.info('Read ' + opts.collection);
            return opts.validators.read(params)
            .then((valid) => {
                let repo = Repository(opts.collection);
                let query = {};
                let options = opts.options;
                if (params.id == 'new' && opts.newOptions) {
                    options = opts.newOptions();
                }
                else {
                    query[opts.collectionid] = params.id;
                }
                return repo.select(query, options)
            })
            .then((result) => {
                let d = (result && result.length > 0) ? result[0] : null;
                if (params.id != 'new' && !d) {
                    throw {type: 'process', message: opts.collection + ' not found'};
                }
                if (params.id == 'new') {
                    d = opts.createNew(params, d);
                }
                log.debug(opts.collection + ' found: ' + JSON.stringify(d));
                return opts.createDoc(d);
            })
            .catch((err) => {
                log.error(err.message);
                throw err;
            });
        },

        readAll(params) {
            log.info('Read ' + opts.collection);
            return opts.validators.readAll(params)
            .then((valid) => {
                let query = opts.search(params) || {};
                let repo = Repository(opts.collection);
                return repo.select(query, opts.options);
            })
            .then((result) => {
                result = result || [];
                log.debug(result.length + ' ' + opts.collection + ' found');
                return result.map(opts.createDoc);
            })
            .catch((err) => {
                log.error(err.message);
                throw err;
            });
        },

        search(params) {
            log.info('Search ' + opts.collection);
            return opts.validators.search(params)
            .then((valid) => {
                let repo = Repository(opts.collection);
                let query = opts.search(params);
                return repo.select(query, opts.options);
            })
            .then((result) => {
                result = result || [];
                log.debug(result.length + ' ' + opts.collection + ' found');
                return result.map(opts.createDoc);
            })
            .catch((err) => {
                log.error(err.message);
                throw err;
            });
        },

        update(params, data) {
            log.info('Update ' + opts.collection);
            return opts.validators.update(params, data)
            .then((valid) => {
                return opts.preProcess('update', data)
                .then((d) => {
                    let repo = Repository(opts.collection);
                    return repo.save(d);
                })
                .then((result) => {
                    log.debug(opts.collection + ' updated');
                    return opts.postProcess('update', data)
                    .then((d) => {
                        return opts.createDoc(d || result);
                    });
                });
            })
            .catch((err) => {
                log.error(err.message);
                throw err;
            });
        },

        remove(params) {
            log.info('Remove ' + opts.collection);
            return opts.validators.remove(params)
            .then((valid) => {
                return opts.preProcess('remove', {})
                .then((d) => {
                    let repo = Repository(opts.collection);
                    let query = {};
                    query[opts.collectionid] = params.id;
                    return repo.remove(query);
                })
                .then((result) => {
                    log.debug(opts.collection + ' removed');
                    return opts.postProcess('remove', result)
                    .then((d) => {
                        return d || result;
                    });
                });
            })
            .catch((err) => {
                log.error(err.message);
                throw err;
            });
        },
        removeAll(params) {
            log.info('Remove ' + opts.collection);
            return opts.validators.removeAll(params)
            .then((valid) => {
                return opts.preProcess('remove', {})
                .then((d) => {
                    let repo = Repository(opts.collection);
                    return repo.remove({});
                })
                .then((result) => {
                    log.debug(opts.collection + ' removed');
                    return opts.postProcess('remove', result)
                    .then((d) => {
                        return d || result;
                    });
                });
            })
            .catch((err) => {
                log.error(err.message);
                throw err;
            });
        }
    };
};

module.exports = crudServices;

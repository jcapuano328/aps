module.exports = {
    port: 4000,
    paths: {
        routes: [
            './web/server/routes/',
            './services/routes/'
        ]
    },
    session: {
        secret: 'aps-secret',
        cookie: {
            maxAge: 86400,
            secure: false,
            httpOnly: true
        }
    },
    db: {
        server: 'localhost',
        port: 27017,
        name: 'aps',
        options: {
            server: {
                maxPoolSize: 10
            },
            db: {
                journal: true,
                safe: true
            }
        }
    },
    auth: {
        database: 'aps',
        tokenLifetime: 60
    },
    log: {
        server: { // server-side logging parameters
            levels: ['error', 'warn', 'info', 'debug', 'trace'],
            transports: { // logging transports
                console: {
                    format: ['date', 'level', 'message'],
                    level: 'warn', // maximum level of logged messages
                    enabled: true, // this switch can be used to easily toggle use of a given transport
                    colorize: true, // this switch can be used to easily toggle use of colors
                    json: false	 // plain text or json output
                }
            }
        }
    }
};

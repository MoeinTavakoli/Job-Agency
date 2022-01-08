const config = {
    databse: {
        host: '127.0.0.1',
        user: 'postgres',
        database: 'job',
        password: '2283',
        port: 5432,
        ssl: {
            rejectUnauthorized : false,
        }

    },
    jwt: {
        secret: "jlkfghjlfgkhl"
    }
}


module.exports = config
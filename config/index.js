module.exports = {
    env: process.env.ENV,
    server: {
        name: process.env.SERVER_NAME || 'server',
        port: process.env.SERVER_PORT || 9000,
    },
    socket: {
        port: process.env.SOCKET_PORT || 9001,
    },
    JWT: {
        secret: process.env.JWT_SECRET_KEY
    },
    mongo: {
        dbHost: process.env.DB_HOST,
        dbPort: process.env.DB_PORT,
        dbName: process.env.DB_NAME,
        dbUser: process.env.DB_USER,
        dbPass: process.env.DB_PASS,
    },
    aws: {
        s3Access: process.env.S3_ACCESS_KEY,
        s3Secret: process.env.S3_SECRET_KEY,
    }
}
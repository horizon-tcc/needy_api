module.exports = {
    algorithm: "HS256",
    expiresIn: "1h",
    secret: process.env.JWT_SECRET_KEY
}
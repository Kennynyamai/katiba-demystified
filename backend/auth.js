// routes/auth.js
const { checkDuplicateEmail } = require("./middleware/auth");
const controller = require("./controllers/auth");

module.exports = function(app) {
    // CORS Headers
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    // Routes for Users
    app.post('/register', [checkDuplicateEmail], controller.registerUser);
    app.post('/login', controller.loginUser);
    app.post('/google-login', controller.googleLogin);
};

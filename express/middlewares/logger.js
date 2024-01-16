const logger = (req, res, next) => {
    console.log(req.method, req.url);
    // res.send('Middleware sends response');
    next();
}
module.exports = logger;
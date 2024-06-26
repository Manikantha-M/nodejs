const {CustomAPIError} = require('../errors/custom-error')
const errorHandler = (err, req, res, next) => {
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({message: err.message});
    }
    return res.status(500).json({msg: 'Somethig went wrong'});
}

module.exports = errorHandler;
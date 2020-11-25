const { body, validationResult } = require('express-validator')
exports.registerUserValidationRules = () => {
    return [
        body('name', 'Invalid user name').exists().notEmpty(),
        body('email', 'Invalid email').exists().isEmail().notEmpty(),
        body('password', 'Invalid password').exists().notEmpty().isLength({ min: 6 }),
    ]
}

exports.validateRegisterUser = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        status: false,
        errors: extractedErrors,
        msg: "Request Validation Failed"
    })
}
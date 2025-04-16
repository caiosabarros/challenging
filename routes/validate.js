const { body, validationResult } = require('express-validator')
const validationRules = () => {
    return [
        // challenge categories validation rules  
        [
            // name must be at least 3 chars.
            body('dailyChallenges').isArray(),
            // users must be an array.
            body('users').isArray(),
            body('listDifficulty').isNumeric(),
            // description must have min length of 10 chars.
            body('description').isLength({ min: 10 }),
        ],
        // users validation rules
        [
            body('username').isString(),
            body('categories').isArray(),
            body('challenges').isArray(),
            body('githubUrl').isURL(),
            body('bio').isLength({ min: 10 }),
            body('age').isNumeric()
        ]
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    validationRules,
    validate,
}
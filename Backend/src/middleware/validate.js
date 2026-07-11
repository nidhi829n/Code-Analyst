const ApiError = require("../utils/ApiError");

const validate = (schema) => {

    return (req, res, next) => {

        const result = schema.safeParse(req.body);

        if (!result.success) {

            throw new ApiError(
                400,
                result.error.issues[0].message
            );

        }

        req.body = result.data;

        next();

    };

};

module.exports = validate;
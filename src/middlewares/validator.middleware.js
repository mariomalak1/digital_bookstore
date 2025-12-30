const validator = (schema, options = {}) => {
    const defaultOptions = {
        abortEarly: false,
        allowUnknown: false,
        convert: true,
        ...options,
    }

    return (req, res, next) => {
        try {
            const errors = []

            for (const key of Object.keys(schema)) {
                const { error, value } = schema[key].validate(req[key], defaultOptions)

                if (error) {
                    const propertyErrors = error.details.map((detail) => ({
                    field: detail.path.join('.'),
                    message: detail.message.replace(/"/g, ''),
                    value: detail.context?.value,
                    type: detail.type,
                    }))
                    errors.push(...propertyErrors)
                }
            }

            if (errors.length > 0) {
                return res.status(422).message({ message: "Validation failed", errors });
            }
            next()
        } 
        catch (err) {
            console.error('global-validation middleware error:', err);
            return res.status(422).message({ message: "Validation failed" });
        }
    }
}

export default validator;

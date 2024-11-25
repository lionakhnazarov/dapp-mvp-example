module.exports = (  ) => {
    return async (req, res, next) => {
        const {email, password} = req.body;
        const errors = [];

        const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            errors.push("Email is required.");
        } else if (!emailRegexp.test(email)) {
            errors.push("Invalid email format.");
        }

        if (!password) {
            errors.push("Password is required.");
        } else if (password.length < 8) {
            errors.push("Password must be at least 8 characters long.");
        }

        if (errors.length > 0) {
            return res.status(400).json({errors});
        }

        next();
    }
}
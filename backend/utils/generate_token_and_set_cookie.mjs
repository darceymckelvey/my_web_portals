import jwt from "jsonwebtoken";

export const generate_token_and_set_cookie = (res, user_id) => {
    const token = jwt.sign({ user_id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie('token', token, {
        httpOnly: true, // prevents XSS attacks
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', // prevents CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
}

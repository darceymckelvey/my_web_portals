import { User } from "../models/user.model.mjs";
import bcrypt from 'bcryptjs';
import { generate_verification_token } from "../utils/generate_verification_token.mjs";
import { generate_token_and_set_cookie } from "../utils/generate_token_and_set_cookie.mjs";

export const signup = async (req, res) => {
    const { email, password, first_name, last_name } = req.body;

    try {
        if(!email || !password || !first_name) {
            throw new Error("email, password, first_name are required.");
        }

        const user_already_exists = await User.findOne({where: {email}});
        console.log('user_already_exists', user_already_exists);
        if(user_already_exists) {
            return res.status(400).json({success: false, message: 'User already exists.'})
        }

        const hashed_password = await bcrypt.hash(password, 10);
        const verification_token = generate_verification_token();

        const user = new User({
            email,
            password: hashed_password,
            first_name,
            last_name,
            verification_token,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        });

        await user.save();

        // jwt - json web token
        generate_token_and_set_cookie(res, user._id);

        res.status(201).json({
            success: true,
            message: 'User created successfully.',
            user: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                password: undefined
            }
        });

    } catch (err) {
        res.status(400).json({success: false, message: err.message})
    }
}

export const login = async (req, res) => {
    res.send('Login route')
}

export const logout = async (req, res) => {
    res.send('Logout route')
}
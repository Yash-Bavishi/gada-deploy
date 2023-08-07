import {User} from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
const authMiddleware = asyncHandler(async (req, res, next) => {
    // get token
    let token = req.cookies.jwt;
    console.log(token)
    if (token) {
        let userFr = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(userFr.user).select('-password')
        next()
    } else {
        res.status(401)
        throw new Error("User not logged in")
    }
})

export {authMiddleware}
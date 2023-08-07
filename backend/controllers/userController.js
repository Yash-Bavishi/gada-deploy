import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { User } from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import cookieParser from 'cookie-parser'
// @desc User login
// @req  POST /api/login
// @token set token
const salt = await bcrypt.genSalt(10)

const loginRoute = asyncHandler(async(req,res) => {
    const {email, password} = req.body
    console.log(email)
    console.log(password)
    // Only findOne or single user has custom method
    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))) {
        await generateToken(res, user._id);
        res.status(201).json({message: {email: user.email, name: user.name}})
    } else {
        res.status(401)
        throw new Error("Invalid email or password")
    }
})

// @desc User logout
// @req  POST /api/logout
// @token destroy token
const logoutRoute = asyncHandler ( async (req,res) => {
    res.cookie('jwt', '', {
        maxAge: 0
    })
    res.status(200).json({message: "successfully logout"})
})

// @desc Register login
// @req  POST /api/login
// @token set token
const registerRoute = asyncHandler(async (req,res) => {
    const {name, email, password, confirmPassword} = req.body
    const userExists = await User.find({email})
    console.log(userExists)
    if(userExists[0]){
        res.status(400)
        throw new Error('User already exists')
    }

    if (password !== confirmPassword) {
        res.status(400)
        throw new Error("Passwords don't match")
    }

    const user = await User.create({
        name,
        email,
        password,
    })

    console.log(user)
    if (user) {
        await generateToken(res, user._id);
        res.status(200).json({name, email})
    }

})

// @desc Profile login
// @req  POST /api/profile
// @token verify token and  user
const profileRoute = asyncHandler( async (req,res) => {
    const {name, email} = req.body
    const updUser = await User.findById(req.user._id)
    console.log("konie")
    if (updUser) {
        updUser.name = req.body.name || req.user.name
        updUser.email = req.body.email || req.user.email
        console.log(req.body.name)
        console.log(req.user.name)
        console.log(updUser.name)
        await updUser.save()
        res.status(200).json({message: "done check"})
    } else{
        res.status(400)
        throw new Error("User couldn't be updated")
    }
})

export {
    loginRoute,
    logoutRoute,
    registerRoute,
    profileRoute
}


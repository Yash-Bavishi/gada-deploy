import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
const generateToken = (res, user) => {
    console.log(user)
   let token = jwt.sign({user},process.env.JWT_SECRET, {
    expiresIn: '30d'
   }) 
   
   res.cookie('jwt',token,{
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict'
   })
   
}

export default generateToken
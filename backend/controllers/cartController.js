import cookies from 'cookie-parser'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { Shop } from '../models/shopModel.js'
const getCartItems = asyncHandler(async (req, res) => {
    console.log('call recevied')
    // Return an array of JSON objects containing item name and cookie 
    let items = req.cookies.cartItem
    console.log(items)
    // items = Shop.find({name: [name1, name2]})
    let item_name = []
    for (let i = 0; i < items.length; i++) {
        item_name.push(items[i].itemName)
    }

    let new_items = await Shop.find({name: item_name})
    console.log(new_items)
    res.status(200).send({new_items, items})
})

const addToCart = asyncHandler(async (req, res) => {
    let payload = {itemName: req.params.itemName, quantity: req.params.count}

    let cookie = req.cookies.cartItem
    let lock = false
    if (cookie) {
        for (let  i = 0; i < cookie.length; i++) {
            if(cookie[i].itemName == payload.itemName) {
                cookie[i].quantity = Number.parseInt(payload.quantity) + Number.parseInt(cookie[i].quantity)
                lock = true
            }
        }

        if (lock) {
            res.cookie('cartItem', cookie, {
                maxAge: 500 * 1000,
                secure: process.env.NODE_ENV !== "development",
                sameSite: 'strict',
                httpOnly: true
            })
            res.status(200).json({message: "updated"})
        } else {
            payload = [...cookie, payload]
            res.cookie('cartItem', payload, {
                maxAge: 500 * 1000,
                secure: process.env.NODE_ENV !== "development",
                sameSite: 'strict',
                httpOnly: true
            })
            res.status(200).json({message: "new cookie updated"})
        }
    } else {
        res.cookie('cartItem', [payload], {
            maxAge: 500 * 1000,
            secure: process.env.NODE_ENV !== "development",
            sameSite: 'strict',
            httpOnly: true
        })
        res.status(200).json({message: "new cookie added"})
    }



})

const removeFromCart = asyncHandler(async (req, res) => {
    if (!req.cookies.cartItem) {
        console.log("debu")
        res.status(400).json({message: "No cookie found"})
    }

    const cookie = req.cookies.cartItem
    const itemName = req.params.itemName

    const newCookie  = cookie.filter(m => {
        return m.itemName !== itemName
    })

    res.cookie('cartItem', newCookie, ({
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 600 * 5000
    }))
    res.status(200).json({message: "check console"})

})

export {
    getCartItems,
    addToCart,
    removeFromCart
}
import asyncHandler from 'express-async-handler';
import { Shop } from '../models/shopModel.js';

const postItem = asyncHandler(async (req, res) => {
    if (process.env.NODE_ENV == "production") {
        res.status(500)
        throw new Error("This path is not allowed for you")
    } 

    let {name, quantity, amount} = req.body
    quantity = Number.parseInt(quantity)
    amount = Number.parseInt(amount)
    const item = await Shop.create({
        name,
        quantity,
        amount
    })

    if(item) {
        res.status(200).json({message: {name, quantity}})
    } else {
        res.status(400)
        throw new Error("Invalid data")
    }

})

const getItem = asyncHandler (async (req, res) => {
    console.log("CALL AYA")
    const itemName = req.params.itemName;
    // const count = Number.parseInt(req.params.count)

    const item = await Shop.findOne({name: itemName})
    if(!item) {
        res.status(400)
        throw new Error("Item not found")
    }    

    /*
    if(item.quantity < count) {
        res.status(400)
        throw new Error("Not in stock")
    }
    */

    res.status(200)
    console.log(item)
    res.json(item)
})


const getAllItem = asyncHandler(async(req,res) => {
    const items = await Shop.find({})
    if (items) {
        res.status(200).json({items});
    } else {
        res.status(500)
        throw new Error ("No Items Foudn");
    }
})

const putItem = asyncHandler (async (req, res) => {
    const itemName = req.params.itemName;
    const count = Number.parseInt(req.params.count)

    const item = await Shop.findOne({name: itemName})
    if(!item) {
        res.status(400)
        throw new Error("Item not found")
    }    

    if(item.quantity < count) {
        res.status(400)
        throw new Error("Not in stock")
    }


    await item.updateQuantity(item.quantity - count)
    await item.save()
    res.status(200).json({message: "Done updating check"})

})


export {
    getItem,
    postItem,
    getAllItem,
    putItem
}
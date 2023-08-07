import mongoose from "mongoose";

const shopSchema = await mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

shopSchema.methods.updateQuantity = async function(quanity) {
    console.log("Yohoyoho")
    this.quantity = quanity
    console.log(this.name)
    console.log(this.quantity)
    console.log(this.amount)
}

const Shop = mongoose.model('stock', shopSchema)

export { Shop }
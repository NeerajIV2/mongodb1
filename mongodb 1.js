const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/productsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }
})

const Product = mongoose.model('Product', productSchema)

async function runCRUD() {
    try {
        const newProduct = new Product({
            name: "Phone",
            price: 20000,
            category: "Electronics"
        })
        await newProduct.save()
        console.log("Created:", newProduct)

        const products = await Product.find()
        console.log("All Products:", products)

        const updated = await Product.findByIdAndUpdate(newProduct._id, { price: 18000 }, { new: true })
        console.log("Updated:", updated)

        const deleted = await Product.findByIdAndDelete(newProduct._id)
        console.log("Deleted:", deleted)
    } catch (err) {
        console.log(err)
    } finally {
        mongoose.connection.close()
    }
}

runCRUD()

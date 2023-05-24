import express from "express"
import userRoutes from "./routes/users.js"
import productsRoutes from "./routes/products.js"
import orderRoutes from "./routes/orders.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/", userRoutes)
app.use("/products", productsRoutes)
app.use("/orders", orderRoutes)

console.log('API Executando')

app.listen(8800)
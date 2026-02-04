import dotenv from "dotenv";
// require('dotenv').config({ path: './.env' })
dotenv.config({ path: './.env' })

import connectDB from './db/index.js'


import { app } from './app.js'




connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MongoDB connection error", err)
})




/*
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    } catch (error) {
        console.error("Error: ", error)
        throw error
    }
})()
 */
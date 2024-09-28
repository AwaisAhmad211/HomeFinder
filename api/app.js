import express from "express";
import authRouter from './routes/auth.route.js'

const app = express();
app.use("/api/auth", authRouter)

app.listen(8800,()=> {
    console.log("Listining on port 8800")
})
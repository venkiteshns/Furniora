import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


import router from './routes/user.js'

app.use('/',router)


app.use((err,req,res,next) => {
    if(err) {
        console.log("server error occoured");
    }
})

export default app;
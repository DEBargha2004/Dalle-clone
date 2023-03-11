import express from 'express'
import cors from 'cors'
import {router} from './routes/route.js'
import cookieParser from 'cookie-parser'
import { signRoute } from './routes/sign.js'
import fs from 'fs'

if(!fs.existsSync('image')){
    fs.mkdirSync('image')
}

const app = express()
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))
app.use(cookieParser())
app.use(express.json({limit:'50mb'}))
app.use('/',router)
app.use('/',signRoute)

app.listen(4000,()=>{
    console.log('Running at port 4000');
})





const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const dotenv = require('dotenv')
const cors=require('cors')
const path=require("path")
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postsRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')
const multer = require('multer')

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connected Successfully")
    }
    catch(err){
        console.log(err)
    }
}

//Middelwares
dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postsRoute)
app.use("/api/comments",commentRoute)


//image uploader
const storage = multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
    }
})

const upload = multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("Image has been uploaded successfully!")
})


app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("App is running on Port 5000!")
})
import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import bp from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import LocalStrategy from 'passport-local';
const app = express();
app.use(bp.json());
app.use(cors());
app.use(bp.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(session({
    secret: 'cheezy seven pizza',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
  

main().catch(err => console.log(err)).then(()=>{
    console.log("DB connected")
})

async function main() {
   await mongoose.connect('mongodb://127.0.0.1:27017/seeyouDB');
//   await mongoose.connect(`mongodb+srv://Suryadeep31:${process.env.DB_PASSWORD}@fruitsreviews.zztdnvq.mongodb.net/?retryWrites=true&w=majority&appName=fruitsReviews`);
}

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});
const User = mongoose.model('User', userSchema);

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.get("/signin", (req, res)=>{
    res.status(200).json({
        message: "Error while signin"
    })
})
app.get("/home", (req, res)=>{
    res.status(200).json({
        message: "Success"
    })
})
app.post("/", (req, res) => {
    let {email, username, password} = req.body;
    User.register(new User({
        email: email,
        username: username
    }), password, (err)=> {
        if(err){
            console.log("Error while signup")
            res.status(200).json({
                message: "Error while signup"
            })
        }
        else{
            console.log("User registered")
            res.status(200).json({
                message: "User registered"
            })
        }
    })
})

app.post("/signin",passport.authenticate("local",{
    successRedirect: "/home",
    failureRedirect: "/signin"
}));

app.get("/db/getUsers", (req, res) => {
    User.find({}).then((allUsers)=>{
        res.send(allUsers);
    });
    
})
app.listen(8000, () => {
    console.log("Server running at index 8000");
})
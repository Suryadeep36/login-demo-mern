import express from 'express'
import bp from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(bp.json());
app.use(cors());
app.use(bp.urlencoded({ extended: true }));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/seeyouDB');
}

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})
const User = mongoose.model('User', userSchema);


app.post("/login", (req, res) => {
    let {email, password} = req.body;
    const newUser = new User({
        email: email,
        password: password
    })
    newUser.save().then(()=>{
        res.status(200).json({
            message: "Data was sent"
        })
    })
})

app.get("/db/getUsers", (req, res) => {
    User.find({}).then((allUsers)=>{
        res.send(allUsers);
    });
    
})
app.listen(8000, () => {
    console.log("Server runnig at index 8000");
})
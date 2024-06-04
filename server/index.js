import express from 'express'
const app = express();
import bp from 'body-parser';
import cors from 'cors';

app.use(bp.json());
app.use(cors());
app.use(bp.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
    console.log(req.body);
    res.status(200).json({
        message: "Data was sent"
    })
})
app.listen(8000, () => {
    console.log("Server runnig at index 8000");
})
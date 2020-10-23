const express = require("express")
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {useNewUrlParser: true, useUnifiedTopology: true});

app.get("/", ({body}, res) => {
    res.send("this may or may not be working??")
});













app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}!`);
});


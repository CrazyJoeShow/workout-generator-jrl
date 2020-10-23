const express = require("express")
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// mongoose.conncect(process.envmongoURI HERE) THEN chain parser,topology,index,and findModifyHERE
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

app.get("/", ({body}, res) => {
    res.send("this may or may not be working??")
});

// connections for success error and connection HW 
const connection = mongoose.connection;
connection.on("connnected", () => {
    console.log("Mongoose IS LIVE");
});
connection.on("error", (err) => {
    console.log("Error connectiong to mongoose");
});
app.get("/api/config", (req, res) => {
    res.json({ success: "Workout is connected"});
});



require(".routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
});











app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}!`);
});


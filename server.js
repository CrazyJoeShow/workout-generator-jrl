const express = require("express")
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}!`);
});


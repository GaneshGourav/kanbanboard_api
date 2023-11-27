const express = require('express');
const app = express();
const {connection} = require('./db')
const PORT = process.env.PORT||7700
require("dotenv").config();


app.get("/",async (req,res)=>{
    try {
        res.status(200).json({"msg":"You're welcome in kanban board "});
    } catch (error) {
        res.status(500).json({"msg":"Internal Server Error"})
    }
})

app.listen(PORT,async()=>{
    try {
        await connection;
        console.log("connected to dbs");
        console.log(`Port is rnning at ${PORT}`)
    } catch (error) {
        console.log("Internal server Error")
    }
})
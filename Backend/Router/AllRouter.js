const express = require('express');
const boardRouter = express.Router();
const {BoardModel} = require('../model/boardmodel');


boardRouter.post("/",async(req,res)=>{
    try {
        const {name,board}= req.body;
        const newBoard = new BoardModel({name,board});
        await newBoard.save();
        res.status(200).json({"msg":"Added board",newBoard})
    } catch (error) {
        res.status(500).json({"msg":"internal serevr Error"})
    }
});


boardRouter.get("/", async(req,res)=>{
    try {
        const userId = req.id;
        const board = await BoardModel.find({board:userId});
        res.status(200).json({"msg":"board",board})
    } catch (error) {
        res.status(500).json({"msg":"Internal server Error"})
    }
})

boardRouter.post("/:id/row/:rowid/task",async(req,res)=>{
    try {
        const {title,description,status}= req.body;
        const id = req.params.id;
        const rowid = req.params.rowid;
        const board = await BoardModel.findById(id);
        if(!board){
            return res.status(404).json({"msg":"board not found"})
        }

        const row = board.row.id(rowid);
        if(!row){
            return res.status(404).json({"msg":"board not found"})
        }
row.task.push({title,description,status});
await board.save();
res.status(200).json({"msg":board})
        
    } catch (error) {
        res.status(500).json({"msg":"Internal Server Error"})
    }
})
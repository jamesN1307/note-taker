const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid')
const PORT = process.env.PORT || 3001;
const takeNote = require('./Develop/db/db.json')
const app = express();

let notes;

//parsing data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serves css/js/static assets
app.use(express.static("public"))


// get NOTE routes

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./Develop/public/index.html"))
})
app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname,"./Develop/public/notes.html"))
})

app.get("/db/db",(req,res)=>{
    res.json(takeNote)
})

function reloadPage(){
    fs.write.File("db/db.json",JSON.stringify(notes), err => {
        if (err) throw err;
        return true;
    })
}

// get method  

app.get("/api/notes",(req,res)=>{
    const note = JSON.parse(fs.readFileSync("./Develop/db/db.json","utf-8"))
    res.json(note)
})
// post method 
app.post("/api/notes",(req,res)=>{
    const newNote = JSON.parse(fs.readFileSync("./Develop/db/db.json","utf-8"))
    const { title, text} = req.body
    if (req.body){
        const urNote = {
            title,
            text,
            id: uuidv4(),
        }
    newNote.push(urNote);
    const readableNote = JSON.stringify(newNote,null,4);
    fs.writeFileSync("./Develop/db/db.json/", readableNote)
    res.json(`Your new note ${urNote.id} is now in a json file`)
    }else{
        throw err;
    }
})

app.delete("/api/notes",(req,res)=>{
    const erase = JSON.parse(fs.readFileSync("./Develop/db/db.json"))
    fs.writeFileSync("./db/db.json",JSON.stringify(erase.filter(filterNote => {
        filterNote.id !== req.params.id
    },null,4
    )))
})


app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./Develop/public/index.html"))
})
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})
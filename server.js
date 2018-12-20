const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8004;
// Use the array below to store the users. Add/remove/update items in it based off
let storage = [];
app.use(bodyParser.json());


app.post('/create/:name/:email/:state', (req, res) => {
    let newUsers = {
    name:  req.params.name,
    email: req.params.email,
    state: req.params.state
  }
   let storageContents = fs.readFileSync('./storage.json', 'utf8');
   let containers = JSON.parse(storageContents)
     containers.push(newUsers);
    console.log(containers);
   fs.writeFileSync('./storage.json', JSON.stringify(containers));
   res.sendStatus(200);
 })


app.get('/', (req, res) => {
  let storage = fs.readFileSync('./storage.json', 'utf8');
  res.json(JSON.parse(storage));
})


app.get('/:name', (req, res) => {
  let storageContents = fs.readFileSync('./storage.json', 'utf8');
  let content =JSON.parse(storageContents)
   // let result = content.filter(item => item.name === req.params.name)[0];
   let result =  content.find(c => c.name === req.params.name);
  if(result) {
     res.json(result)
  } else{
    res.sendStatus(404);
  }
})


app.put('/:name/:email/:state', (req, res) => {
 let content = require(`./storage.json`)
 let  updatedUserInformation = {
    name: req.body.name,
    email: req.body.email,
    state: req.body.state
}
updateArray = content.map((item)=>{
    if(item.name == req.params.name){
      item = updatedUserInformation
    }
    return item;
  })
  fs.writeFileSync(`./storage.json`, JSON.stringify(updateArray))
  const data = fs.readFileSync('./storage.json', 'utf-8')
  res.json(JSON.parse(data))
})


app.delete('/:name', (req,res)=>{
  let content = require(`./storage.json`)
  let result = content.filter((item)=>item.name != req.params.name)
  fs.writeFileSync(`./storage.json`, JSON.stringify(result))
  res.send('object has been deleted!')
})


app.use(function(req, res) {
  res.sendStatus(404)
})



app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
})

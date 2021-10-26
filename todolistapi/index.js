const express = require("express");
const app = express();
const toDoList = [];

app.use(express.json());

app.post("/", (req, res) => {
  toDoList.push(req.body);
  res.send(toDoList);
});

app.get("/", (req, res) => {
  res.send(toDoList);
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(toDoList.find((element) => element.id == id));
});

app.get("/", (req, res) => {
  res.send(toDoList);
});

app.put("/:id", (req, res) => {
  const { id } = req.body;
  targetIndex = toDoList.findIndex((element) => element.id == id);
  toDoList[targetIndex] = req.body;
  res.send(toDoList.find((element) => element.id == id));
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  targetIndex = toDoList.findIndex((element) => element.id == id);
  toDoList.splice(targetIndex, 1);
  res.send(`task no. ${id} deleted`);
});

app.listen(8888, () => console.log(`listening on 8888`));

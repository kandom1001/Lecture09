const express = require("express");
const app = express();
const toDoList = [];

app.use(express.json());

app.post("/", (req, res) => {
  toDoList.push(req.body);
  res.status(201).send("The task successfully added");
});

app.get("/", (req, res) => {
  res.status(200).send(toDoList);
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  const target = toDoList.find((element) => element.id == id);
  target
    ? res.status(200).send(target)
    : res.status(404).send("Task not found");
});

app.put("/:id", (req, res) => {
  const { id } = req.params;
  const targetIndex = toDoList.findIndex((element) => element.id == id);

  if (targetIndex >= 0) {
    toDoList[targetIndex] = req.body;
    return res.status(200).send("The task successfully updated");
  } else {
    return res.status(404).send("Task not found");
  }
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  const targetIndex = toDoList.findIndex((element) => element.id == id);

  if (targetIndex >= 0) {
    toDoList.splice(targetIndex, 1);
    return res.status(200).send("The task successfully deleted");
  } else {
    return res.status(404).send("Task not found");
  }
});

app.listen(8888, () => console.log(`listening on 8888`));

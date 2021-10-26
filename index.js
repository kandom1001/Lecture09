const { randomUUID } = require("crypto");
const express = require("express");
const app = express();
const toDoList = [];
const cors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
};

app.use(express.json());
app.use(cors);

app.post("/tasks", (req, res) => {
  const task = {
    ...req.body,
    id: randomUUID(),
  };
  toDoList.push(task);
  res.status(201).json(task);
});

app.get("/tasks", (req, res) => {
  const { description } = req.query;
  if (description) {
    const filteredTasks = toDoList.filter((i) =>
      i.description.includes(description)
    );
    return res.json(filteredTasks);
  }
  res.status(200).json(toDoList);
});

app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const target = toDoList.find((element) => element.id === id);
  target
    ? res.status(200).send(target)
    : res.status(404).send("Task not found");
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { description, done } = req.body;
  const target = toDoList.find((element) => element.id === id);

  if (!target) {
    return res.status(404).json({ error: "target not found" });
  }

  if (done !== undefined) {
    // "123"  !"123" = false !!"123" = true
    target.done = !!done;
  }

  if (description) {
    target.description = "" + target.description;
  }

  return res.json(target);
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const targetIndex = toDoList.findIndex((element) => element.id === id);

  if (targetIndex >= 0) {
    toDoList.splice(targetIndex, 1);
    return res.status(200).send("The task successfully deleted");
  } else {
    return res.status(404).send("Task not found");
  }
});

app.listen(3000, () => console.log(`listening on 3000`));

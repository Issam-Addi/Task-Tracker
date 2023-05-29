const db  = require("./config");

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
require("dotenv").config();

const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());


const User = db.collection("Users");
const Task = db.collection("Tasks");

app.get("/", async (req, res) => {
  const snapShot = await User.get();
  const users = snapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  res.send(users);
});

app.get("/LogIn", (req, res) => {

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    res.send(user);
    next();
  } catch (error) {
    // Token is invalid or expired
    res.send(null);
  }
});

app.post("/create", async (req, res) => {
  let data = req.body;
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_KEY);
  await User.add(data);
  res.send(accessToken);
});

app.post("/createToken", async (req, res) => {
  let data = req.body;
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_KEY);
  res.send(accessToken);
});

app.get("/getTasks", async (req, res) => {
  const snapShot = await Task.get();
  const Tasks = snapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  res.send(Tasks);
});

app.post("/createTask", async (req, res) => {
  const data = req.body;
  await Task.add(data);
  res.send();
});

app.post("/updateTask", async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  await Task.doc(id).update(data);
  res.send({ msg: "Updated" });
});

app.post("/deleteTask", async (req, res) => {
  const id = req.body.id;
  await Task.doc(id).delete();
  res.send({ msg: "Deleted" });
});

app.listen(PORT);
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

//middleware
app.use(express.json()); //json
app.use(express.raw()); // ?
app.use(express.text()); //text
app.use(express.urlencoded({ extended: true })); //form data or url-encoded
app.use(cors());

//db
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "person",
  })
  .then((connect) => console.log("db connected"))
  .catch((e) => console.log(e));

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Person = mongoose.model("Person", personSchema);

//http method
app.get("/person", (req, res) => {
  Person.find()
    .then((data) => res.json(data))
    .catch((e) => res.status(500).json({ message: e.message }));
});

app.post("/person", (req, res) => {
  const { name, age } = req.body;
  new Person({ name, age })
    .save()
    .then((data) => res.json(data))
    .catch((e) => res.status(500).json({ message: e.message }));
});

app.put("/person/:id", (req, res) => {
  const id = req.params.id;
  const { name, age } = req.body;
  Person.findByIdAndUpdate(id, { name, age }, { new: true })
    .then((d) =>
      d
        ? res.json(d)
        : res.status(404).json({ message: "person not found for update" })
    )
    .catch((e) => res.status(500).json({ message: e.message }));
});

app.delete("/person/:id", (req, res) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then((d) =>
      d
        ? res.json(d)
        : res.status(404).json({ message: "person not found for delete" })
    )
    .catch((e) => res.status(500).json({ message: e.message }));
});

app.listen(port, () => {
  console.log(`person api listening on port ${port}`);
});

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/appointments", (req, res) => {
  return res.json({ message: "Hello World" });
});

app.post("/appointment", (req, res) => {
  return res.json({ message: "Create appointment!" });
});

app.put("/appointment", (req, res) => {
  return res.json({ message: "Update appointment" });
});

app.delete("/appointments/:id", (req, res) => {
  return res.json({ message: "Delete appointment" });
});

app.listen(3000, () => console.log(`Example app listening on port 3000`));

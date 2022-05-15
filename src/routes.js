const express = require("express");
const EventController = require("./Controllers/EventController");

const routes = express.Router();

routes.get("/appointments", (req, res) => {
  return res.json({ message: "Hello World" });
});

routes.post("/createEvent", EventController.CreateEvent);

routes.put("/appointment", (req, res) => {
  return res.json({ message: "Update appointment" });
});

routes.delete("/appointments/:id", (req, res) => {
  return res.json({ message: "Delete appointment" });
});

module.exports = routes;

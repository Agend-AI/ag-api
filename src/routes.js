const express = require("express");
const EventController = require("./Controllers/EventController");

const routes = express.Router();

routes.get("/event", EventController.GetEvents);

routes.post("/event", EventController.CreateEvent);

routes.put("/event/:id", EventController.UpdateEvent);

routes.delete("/event/:id", EventController.DeleteEvent);

module.exports = routes;

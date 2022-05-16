const { google } = require("googleapis");
require("dotenv").config();

// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
const SCOPES = "https://www.googleapis.com/auth/calendar";
const calendar = google.calendar({ version: "v3" });

const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
);

const InserEvent = async (event) => {
  try {
    let response = await calendar.events.insert({
      auth,
      calendarId,
      resource: event,
    });

    console.log(response);

    if (response["status"] == 200 && response["statusText"] === "OK") {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    console.log(`Error at insertEvent --> ${error}`);
    return error;
  }
};

const GetEvents = async (dateTimeStart, dateTimeEnd) => {
  try {
    let response = await calendar.events.list({
      auth: auth,
      calendarId: calendarId,
      timeMin: dateTimeStart,
      timeMax: dateTimeEnd,
    });

    console.log(response);
    let items = response["data"]["items"];
    return items;
  } catch (error) {
    console.log(`Error at getEvents --> ${error}`);
    return 0;
  }
};

const DeleteEvent = async (eventId) => {
  try {
    let response = await calendar.events.delete({
      auth: auth,
      calendarId: calendarId,
      eventId: eventId,
    });

    if (response.data === "") {
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(`Error at deleteEvent --> ${error}`);
    return 0;
  }
};

module.exports = { InserEvent, GetEvents, DeleteEvent };

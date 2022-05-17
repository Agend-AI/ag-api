const { google } = require("googleapis");
require("dotenv").config();

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

const SCOPES = "https://www.googleapis.com/auth/calendar";
const calendar = google.calendar({ version: "v3" });

const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
);

const InsertEvent = async (event) => {
  try {
    let response = calendar.events.insert({
      auth,
      calendarId,
      resource: event,
    });

    return (event = {
      id: response.data.id,
      summary: response.data.summary,
      description: response.data.description,
      start: response.data.start,
      end: response.data.end,
    });
  } catch (error) {
    return "Erro ao criar o evento";
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

    let items = [];

    response.data.items.forEach((element) => {
      const event = {
        id: element.id,
        summary: element.summary,
        description: element.description,
        start: element.start,
        end: element.end,
      };

      items.push(event);
    });

    return items;
  } catch (error) {
    console.log(`Error at getEvents --> ${error}`);
    return 0;
  }
};

const DeleteEvent = async (eventId) => {
  try {
    await calendar.events.delete({
      auth: auth,
      calendarId: calendarId,
      eventId: eventId,
    });

    return "Evento deletado com sucesso";
  } catch (error) {
    return "Erro ao deletar o evento";
  }
};

const UpdateEvent = async (
  eventId,
  newSummary,
  newDescription,
  newDateTimeStart,
  newDateTimeEnd
) => {
  try {
    const updatedEvent = {
      id: eventId,
      summary: newSummary,
      description: newDescription,
      start: {
        dateTime: newDateTimeStart,
      },
      end: {
        dateTime: newDateTimeEnd,
      },
    };

    const changedEvent = await calendar.events.update({
      auth: auth,
      calendarId: calendarId,
      eventId: eventId,
      resource: updatedEvent,
    });

    return {
      id: eventId,
      summary: changedEvent.data.summary,
      description: changedEvent.data.description,
      start: changedEvent.data.start,
      end: changedEvent.data.end,
    };
  } catch (error) {
    return "Erro ao atualizar o evento";
  }
};

module.exports = { InsertEvent, GetEvents, DeleteEvent, UpdateEvent };

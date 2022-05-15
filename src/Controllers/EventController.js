const {
  InserEvent,
  GetEvents,
  DeleteEvent,
} = require("../services/googleApiService");

module.exports = {
  async CreateEvent(request, response) {
    const { summary, description, dateTimeStart, dateTimeEnd } = request.body;

    let event = {
      summary: summary,
      description: description,
      start: {
        dateTime: dateTimeStart,
      },
      end: {
        dateTime: dateTimeEnd,
      },
    };

    console.log(event);

    var result = await InserEvent(event);
    return response.json(result);
  },
  async GetEvents(request, response) {},
  async DeleteEvent(request, response) {},
};

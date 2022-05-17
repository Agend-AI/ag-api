const {
  InsertEvent,
  GetEvents,
  DeleteEvent,
  UpdateEvent,
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

    var result = await InsertEvent(event);

    return response.json(result);
  },
  async GetEvents(request, response) {
    const { dateTimeStart, dateTimeEnd } = request.body;

    let dateStart =
      dateTimeStart == null ? "2022-01-01T00:00:00.000-03:00" : dateTimeStart;
    let dateEnd =
      dateTimeEnd == null ? "2022-12-31T21:00:00.000-03:00" : dateTimeEnd;

    let result = await GetEvents(dateStart, dateEnd);

    return response.json(result);
  },
  async DeleteEvent(request, response) {
    const { id } = request.params;

    let result = await DeleteEvent(id);

    return response.json(result);
  },
  async UpdateEvent(request, response) {
    const { id } = request.params;
    const { summary, description, dateTimeStart, dateTimeEnd } = request.body;

    let result = await UpdateEvent(
      id,
      summary,
      description,
      dateTimeStart,
      dateTimeEnd
    );

    return response.json(result);
  },
};

const { google } = require('googleapis')
const { OAuth2 } = google.auth

const oAuth2Client = new OAuth2(
  'YOUR CLIENT ID GOES HERE',
  'YOUR CLIENT SECRET GOES HERE'
)

oAuth2Client.setCredentials({
  refresh_token: 'YOUR REFRESH TOKEN GOES HERE',
})

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

const eventStartTime = new Date()
eventStartTime.setDate(eventStartTime.getDay() + 2)

const eventEndTime = new Date()
eventEndTime.setDate(eventEndTime.getDay() + 4)
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

const event = {
  summary: `Meeting with David`,
  location: `3595 California St, San Francisco, CA 94118`,
  description: `Meet with David to talk about the new client project and how to integrate the calendar for booking.`,
  colorId: 1,
  start: {
    dateTime: eventStartTime,
    timeZone: 'America/Denver',
  },
  end: {
    dateTime: eventEndTime,
    timeZone: 'America/Denver',
  },
}

calendar.freebusy.query(
  {
    resource: {
      timeMin: eventStartTime,
      timeMax: eventEndTime,
      timeZone: 'America/Denver',
      items: [{ id: 'primary' }],
    },
  },
  (err, res) => {
    if (err) return console.error('Free Busy Query Error: ', err)

    const eventArr = res.data.calendars.primary.busy

    if (eventArr.length === 0)
      return calendar.events.insert(
        { calendarId: 'primary', resource: event },
        err => {
          if (err) return console.error('Error Creating Calender Event:', err)
          return console.log('Calendar event successfully created.')
        }
      )

    return console.log(`Sorry I'm busy...`)
  }
)

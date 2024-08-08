const { google, GoogleApis } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5173/login"
);

const scopes = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/userinfo.email",
];

const url = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
});

module.exports = {
  oauth2Client,
  authUrl: url,
};

const { google } = require("googleapis");
const  getWhyNextReasons = async function(name, email) {
    try {
    
      const scopes = ["https://www.googleapis.com/auth/spreadsheets"];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      // we need to replace the escaped newline characters
      // https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse
      process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes
    );

    const sheets = google.sheets({ version: "v4", auth: jwt });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1",
    });
    
    const rows = response.data.values;


    const response2 = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SPREADSHEET_ID, //spreadsheet id
        range: "Sheet1", //sheet name and range of cells
        valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
        resource: {
            values: [[name, email]],
        },
    });
  } catch (err) {
    console.log(err);
  }
  return [];
}
module.exports = getWhyNextReasons
const CLIENT_URL = require("./clientUrl");

function aircraftCard(serviceType, assetName, price, flightTime, orderID) {
  const formattedTime = formatTime(flightTime);
  return `<tr>
            <td style="border: 1px solid #dddddd; padding: 8px">${assetName}</td>
            <td style="border: 1px solid #dddddd; padding: 8px">${formattedTime}</td>
            <td style="border: 1px solid #dddddd; padding: 8px">$${price}</td>
          </tr>`;
}

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} hour(s) and ${remainingMinutes} minute(s)`;
}

module.exports = {
  aircraftCard,
};

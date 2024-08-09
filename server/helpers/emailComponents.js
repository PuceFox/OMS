const CLIENT_URL = require("./clientUrl");

function aircraftCard(serviceType, assetName, price, flightTime, orderID) {
  const formattedTime = formatTime(flightTime);
  return `<div style="background-color: white; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); width: 300px; padding: 20px; text-align: center;">
              <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">${serviceType} Service</h2>
              <p style="font-size: 18px; color: #555; margin: 10px 0;">Aircraft: ${assetName}</p>
              <p style="font-size: 18px; color: #555; margin: 10px 0;">Total Flight Time: ${formattedTime}</p>
              <p style="font-size: 18px; color: #555; margin: 10px 0;">Price: $${price}</p>
              <a href="${CLIENT_URL}/accept/${orderID}?aircraft=${assetName}&price=${price}"
                    ><button
                      style="
                        background-color: #007bff;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        padding: 10px 20px;
                        font-size: 16px;
                        cursor: pointer;
                        margin-top: 20px;
                      "
                    >
                      Choose
                    </button></a
                  >
              
          </div>`;
}

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} hour(s) and ${remainingMinutes} minute(s)`;
}

module.exports = {
  aircraftCard,
};

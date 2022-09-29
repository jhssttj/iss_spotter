const fetchMyIP = function(callback) {
  const request = require('request');
  request('https://api.ipify.org?format=json', (error, response, body) => {
    const ipData = JSON.parse(body);
    if (error) {
      callback(error,null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    callback(null, ipData.ip);
    return;
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const request = require('request');
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    const ipData = JSON.parse(body);
    if (error) {
      callback(error, null);
      return;
    }
    if (!ipData.success) {
      const message = `Success status was ${ipData.success}. Server message says: ${ipData.message} when fetching for IP ${ipData.ip}`;
      callback(Error(message), null);
      return;
    }
    let coordinates = {};
    coordinates.latitude = ipData.latitude;
    coordinates.longitude = ipData.longitude;
    callback(error, coordinates);
    return;
  });

};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
};

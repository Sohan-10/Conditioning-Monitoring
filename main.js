var IotApi = require('@arduino/arduino-iot-client');
var rp = require('request-promise');
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000

app.use(cors({
  origin: [`http://localhost:${PORT}`, `http://localhost:5500`, "http://192.168.1.5:5500","http://192.168.0.3:5500", "http://10.20.60.2:5500", "http://192.168.0.106:5500"],
  methods: ["POST", "GET"],
  credentials: true
}))

app.get('/output', async (req, res) => {
  var client = IotApi.ApiClient.instance;
  // Configure OAuth2 access token for authorization: oauth2
  var oauth2 = client.authentications['oauth2'];
  oauth2.accessToken = await getToken();

  var api = new IotApi.PropertiesV2Api(client)
  var id = "0b877550-406e-4db7-bf32-bc1193860a62"; // {String} The id of the thing

  var opts = {
    'showDeleted': true // {Boolean} If true, shows the soft deleted properties
  };
  api.propertiesV2List(id, opts).then(function(data) {
    let response_data = {};
    for (let i = 0; i < data.length; i++) {
      response_data[data[i].name] = data[i].last_value;
    }
    console.log(response_data)
    res.json(response_data)
  })
  .catch(err => console.log(err));
})

// let res = fetch()
// res = JSON.parse(res)

app.listen(PORT, () => {
  console.log("Server running...")
})

async function getToken() {
    var options = {
        method: 'POST',
        url: 'https://api2.arduino.cc/iot/v1/clients/token',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        json: true,
        form: {
            grant_type: 'client_credentials',
            client_id: '2zBVi0gfqXTbeq4nl1dugtxUmf5ehRDC',
            client_secret: '2W1Y5yOWNN2nfqGBGbT9K7bR0ZducDVMnJV5hs8Ff7CSPS3jo07peNAYxf7odfFB',
            audience: 'https://api2.arduino.cc/iot'
        }
    };

    try {
        const response = await rp(options);
        return response['access_token'];
    }
    catch (error) {
        console.error("Failed getting an access token: " + error)
    }
}

// async function listProperties() {
//   var client = IotApi.ApiClient.instance;
//   // Configure OAuth2 access token for authorization: oauth2
//   var oauth2 = client.authentications['oauth2'];
//   oauth2.accessToken = await getToken();

//   var api = new IotApi.PropertiesV2Api(client)
//   var id = "0b877550-406e-4db7-bf32-bc1193860a62"; // {String} The id of the thing

//   var opts = {
//     'showDeleted': true // {Boolean} If true, shows the soft deleted properties
//   };
//   api.propertiesV2List(id, opts).then(function(data) {
//     console.log(data[0].last_value);
//   });
// }

// setInterval(function() {
//   listProperties();
// }, 2000); // 1000 milliseconds = 1 second delay


// listProperties();

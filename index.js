const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const maxmind = require('maxmind');
// Declare some server variables and import an helper package (body-parser)
var app_var = express(); 
var bodyParser = require('body-parser')
// Tell the app to user body parser on incoming json objects (they will be stringified therefore need parsing). 
app_var.use(bodyParser.json()); // for parsing application/json
app_var.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

// for the geoip: 

// we get location data thusy: 

async function main(app){
	// Create a database instance: 
	var db = await maxmind.open('./GeoLite2-City.mmdb'); 
	// Fire up our app: 
	app.listen(PORT, function () {
	  console.log('Example app listening on port 5000!')
	})

	// Give our app a base method: 
	app.get('/', async function (req, res) {
		let fetched = await db.getWithPrefixLength('66.6.44.4'); 
		console.log(fetched)
		 // the response is an array 
		res.json(fetched[0])
	})

	app.get('/ip/:ip', async function (req, res) {
		// Let's get the ip addres from the IP: 
		// this is URL encoced string
		let ip = decodeURIComponent(req.params.ip)
		// Validate IP and only proceed if valid:  
		let valid = await maxmind.validate(ip);
		if(valid == true){
			// fetch the data: 
			var ipData = await db.getWithPrefixLength(ip);
			var dataObj = ipData[0]; 
			var outObject = {}
			// Define the lat/lon pair for the IP: 
			outObject.latitude = dataObj.location.latitude; 
			outObject.longitude = dataObj.location.longitude; 
			// Check for city field: 
			if(dataObj.city){
				outObject.city = dataObj.city.names.en; 
			}
			else{
				outObject.city = ""; 
			}
			// And for country field: 
			if(dataObj.country){
				outObject.country_name = dataObj.country.names.en; 
			}
			else{
				outObject.country_name = ""; 
			}
			// And for region: 
			if(dataObj.subdivisions){
				if(dataObj.subdivisions.length > 0){
					outObject.region_name = dataObj.subdivisions[0].names.en 
				}
				else{
					outObject.region_name = ""
				}
			}
			else{
				outObject.region_name = ""; 
			}
			// And for region field: 
			res.json(outObject)
			  // the response is an array 
		}
		else{
			res.json({})
		}
	})
}

main(app_var); 

// lets test our app out! 


const fetch = require('node-fetch');
async function main(){
	// the ip: 
  let ip = '66.6.44.4'; 
  // encoded: 
	ip = encodeURIComponent(ip); 
	// url: 
	let baseURL = "http://10.0.0.201:5000/ip/"; 
	let fetchURL = baseURL + ip; 
	console.log(fetchURL)
	let ipData = await fetch(fetchURL); 
	let ipjson = await ipData.json(); 
	console.log(ipjson)
} 

main()


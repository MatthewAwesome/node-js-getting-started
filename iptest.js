// lets test our app out! 


const fetch = require('node-fetch');
async function main(){
	// the ip: 
  let ip = '66.6.44.4'; 
  // encoded: 
	ip = encodeURIComponent(ip); 
	// url: 
	let baseURL = "https://blooming-stream-19964.herokuapp.com/ip/"; 
	let fetchURL = baseURL + ip; 
	console.log(fetchURL)
	let ipData = await fetch(fetchURL); 
	console.log(ipData)
	let ipjson = await ipData.json(); 
	console.log(ipjson)
} 

main()


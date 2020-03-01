import './css/style.css';
console.log('ita-webpack4-labs');
let $website = document.querySelector('#website');
$website.innerHTML =  process.env.PHYTOJS_API_SERVICE_URL;


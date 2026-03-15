const apiKey = "5e34d2f5468ff34b4a6a567553d69016";

const consoleBox = document.getElementById("consoleLog");

function log(msg){
consoleBox.textContent += msg + "\n";
}

log("[Sync] Script Start");

function searchCity(){

const city = document.getElementById("cityInput").value;

log("[Sync] Start Fetching");

fetchWeather(city);

}

async function fetchWeather(city){

try{

log("[Async] Fetching Weather...");

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
);

if(!response.ok){
throw new Error("City not found");
}

const data = await response.json();

displayWeather(data);

saveHistory(city);

log("[Async] Data received");

}catch(error){

alert(error.message);

log("[Error] " + error.message);

}

}

function displayWeather(data){

document.getElementById("city").innerText =
data.name + ", " + data.sys.country;

document.getElementById("temp").innerText =
data.main.temp + " °C";

document.getElementById("weather").innerText =
data.weather[0].main;

document.getElementById("humidity").innerText =
data.main.humidity + "%";

document.getElementById("wind").innerText =
data.wind.speed + " m/s";

}

function saveHistory(city){

let history =
JSON.parse(localStorage.getItem("history")) || [];

if(!history.includes(city)){

history.push(city);

localStorage.setItem(
"history",
JSON.stringify(history)
);

}

loadHistory();

}

function loadHistory(){

const historyDiv =
document.getElementById("history");

historyDiv.innerHTML="";

let history =
JSON.parse(localStorage.getItem("history")) || [];

history.forEach(city=>{

let btn=document.createElement("button");

btn.innerText=city;

btn.onclick=()=>fetchWeather(city);

historyDiv.appendChild(btn);

});

}

window.onload=loadHistory;

log("[Sync] Script End");
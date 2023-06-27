const searchForm = document.getElementById("searchForm");
const ipInput = document.getElementById("ipInput");
const ipField = document.getElementById("ip");
const timezoneField = document.getElementById("timezone");
const locationField = document.getElementById("location");
const ispField = document.getElementById("isp");

const map = L.map("map", {
	minZoom: 7,
});
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const markerIcon = L.icon({
	iconUrl: "images/icon-location.svg",
	iconSize: [38, 55],
	iconAnchor: [22, 54],
	// popupAnchor: [-3, -76],
	// shadowSize: [68, 95],
	// shadowAnchor: [22, 94]
});

var marker;

window.addEventListener("load", async () => {
	const response = await fetch(
		`http://ip-api.com/json/?fields=status,country,countryCode,city,zip,district,lat,lon,timezone,isp,query`
	);

	const res = await response.json();

	if (!res) return;
	if (res.status !== "success") return;

	ipField.innerText = res.query;
	locationField.innerHTML = `${res.city}, ${res.country}`;
	ispField.innerText = res.isp;

	let datetime_str = new Date().toTimeString("en-US", {
		timeZone: res.timezone,
	});

	const timezone = datetime_str.match(/\(([^)]+)\)/)[1];
	const currentTime = new Date().toLocaleTimeString({
		timeZone: res.timezone,
	});
	const currentDate = new Date().toLocaleDateString({
		timeZone: res.timezone,
	});

	timezoneField.innerHTML = `${timezone},<br>${currentTime},<br>${currentDate}`;

	console.log([timezone, currentTime, currentDate]);

	map.setView([res.lat, res.lon], 13);
	marker = new L.marker([res.lat, res.lon], { icon: markerIcon });
	map.addLayer(marker);
});

searchForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const response = await fetch(
		`http://ip-api.com/json/${ipInput.value}?fields=status,country,countryCode,city,zip,district,lat,lon,timezone,isp,query`
	);
	const res = await response.json();

	if (!res) return;
	if (res.status !== "success") return;

	ipField.innerText = res.query;
	locationField.innerHTML = `${res.city}, ${res.countryCode}`;
	ispField.innerText = res.isp;

	let datetime_str = new Date().toTimeString("en-US", {
		timeZone: res.timezone,
	});

	const timezone = datetime_str.match(/\(([^)]+)\)/)[1];
	const currentTime = new Date().toLocaleTimeString({
		timeZone: res.timezone,
	});
	const currentDate = new Date().toLocaleDateString({
		timeZone: res.timezone,
	});

	timezoneField.innerHTML = `${timezone},<br>${currentTime},<br>${currentDate}`;

	map.setView([res.lat, res.lon], 13);
	map.removeLayer(marker);
	marker = new L.marker([res.lat, res.lon], { icon: markerIcon });
	map.addLayer(marker);
});

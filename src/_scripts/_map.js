var map = L.map('map');
var sat = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGF0aW1lcyIsImEiOiJjanJmNjg4ZzYweGtvNDNxa2ZpZ2lma3Z4In0.g0lYVIEs9Y5QcUOhXactHA');
sat.addTo(map);
map.setView([33.983265, -118.306799], 18);

homicides.forEach(o => { 
	L.circleMarker([o.latitude,  o.longitude])
	.addTo(map) 
	.bindTooltip(`${o.first_name} ${o.last_name}`, {permanent: true});
});

var sat2 = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGF0aW1lcyIsImEiOiJjanJmNjg4ZzYweGtvNDNxa2ZpZ2lma3Z4In0.g0lYVIEs9Y5QcUOhXactHA', {
    maxZoom: 8
});
var mini = new L.Control.MiniMap(sat2);
mini.addTo(map);
// 1. Inicjalizacja mapy
var map = L.map('map', {
  center: [51.75921, 19.45835],
  zoom: 13
});

// 2. Warstwy podkładowe
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)'
});

// 3. Panel warstw
var baseMaps = {
  "OpenStreetMap": osm,
  "OpenTopoMap": topo
};

L.control.layers(baseMaps).addTo(map);

const crossIcon = L.divIcon({
    className: 'cross-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});


// Ikonka markerów
pointToLayer: (feature, latlng) =>
    L.marker(latlng, { icon: crossIcon }),

// Wczytanie świątyń
fetch('swiatynie.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: ikonka});
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup(`
          <b>${feature.properties.nazwa}</b><br>
          Wyznanie: ${feature.properties.wyznanie}<br>
          Rok budowy: ${feature.properties.rok_budowy}<br>
          Adres: ${feature.properties.adres}<br>
          Styl: ${feature.properties.styl}<br>
          <img src="${feature.properties.zdjecie}" width="200">
        `);
      }
    }).addTo(map);
  })
  .catch(err => console.error(err));

// EasyPrint – przycisk drukowania
L.easyPrint({
  title: 'Drukuj mapę',
  position: 'topleft',
  sizeModes: ['Current', 'A4Landscape', 'A4Portrait']
}).addTo(map);



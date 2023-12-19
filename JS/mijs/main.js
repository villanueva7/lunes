var boundary = [-81.3899688720703, -18.4412956237793, -68.5886001586914, 0.0298568718135357];

var map = L.map('map', {
    center: [(boundary[1] + boundary[3]) / 2, (boundary[0] + boundary[2]) / 2],
    zoom: 7
});

var defaultBase = L.tileLayer.provider('OpenStreetMap').addTo(map);


document.getElementById('select-location').addEventListener('change',function(e){
  let coords = e.target.value.split(",");
  map.flyTo(coords,18);
})


var baseLayers = {
    'Streets': defaultBase,
    'OpenTopoMap': L.tileLayer.provider('OpenTopoMap'),
    'EsriWorldPhysical': L.tileLayer.provider('Esri.WorldPhysical'),
    'EsriWorldImagery': L.tileLayer.provider('Esri.WorldImagery'),
	'Esri.WorldGrayCanvas': L.tileLayer.provider('Esri.WorldGrayCanvas'), 
	'Esri.NatGeoWorldMap': L.tileLayer.provider('Esri.NatGeoWorldMap'), 
	'CartoDB.DarkMatter': L.tileLayer.provider('CartoDB.DarkMatter')
};

var manzana = L.tileLayer.wms('http://localhost:2525/geoserver/s16_practica/wms', {
    layers: 's16_practica:Manzana',
    format: 'image/png',
    opacity: 1,
    transparent: true,
    tiled: 'true'
});

var limit = L.tileLayer.wms('http://localhost:2525/geoserver/s16_practica/wms', {
    layers: 's16_practica:Limite',
    format: 'image/png',
    opacity: 1,
    transparent: true,
    tiled: 'true'
});

var layer_lotesb = L.tileLayer.wms('http://localhost:2525/geoserver/s_bartolome/wms', {
    layers: 's_bartolome:Lote',
    format: 'image/png',
    opacity: 1,
    transparent: true,
    tiled: 'true'
});
var raster1 = L.tileLayer.wms('http://localhost:2525/geoserver/s16_practica/wms', {
    layers: 's16_practica:prueba1',
    format: 'image/png',
    opacity: 1,
    transparent: true,
    tiled: 'true'
});




var groupOverLays = {

	"CAPAS DISTRITO DE SAN BARTOLOME : ": {
        
		"Raster San Bartolome ": raster1,
		"Limite San Bartolome ": limit,
		"Manzana ": manzana,
		"Lote ": layer_lotesb
    }
};




L.control.groupedLayers(baseLayers, groupOverLays).addTo(map);
//L.control.groupedLayers(baseLayers, groupOverLays, {collapsed:false}).addTo(mape);

L.control.scale({position: 'bottomleft'}).addTo(map);


//map.pm.addControls(options);

var circulo = L.circle([-11.910859, -76.529566], {
    color: '#9C7716',
    fillColor: '#9C7716',
    fillOpacity: 0.,
    radius: 500
}).addTo(map);

circulo.bindPopup("Area de trabajo");


 //////////////////////////////////////////////////////////////////////////////////
 
var carto_light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {attribution: '©OpenStreetMap, ©CartoDB',subdomains: 'abcd',maxZoom: 24});

// Agregar plugin MiniMap
var minimap = new L.Control.MiniMap(carto_light,
    {
        toggleDisplay: true,
        minimized: false,
        position: "bottomleft"
    }).addTo(map);

// Agregar escala
 new L.control.scale({imperial: false}).addTo(map);
 
 
 //////////////////////////////////////////////////////////////////////////////////
 

 //////////////////////////////////////////////////////////////////////////////////
 

 // Configurar PopUp
function popup(feature,layer){
    if(feature.properties && feature.properties.ID){
        layer.bindPopup("<strong>Id: </strong>" + feature.properties.ID + "<br/>" + "<strong>Manzana: </strong>" + feature.properties.MANZANA +"<br/>" + "<strong>Lote: </strong>" + feature.properties.LOTE);
    }
}

// Agregar capa en formato GeoJson
//L.geoJson(lote).addTo(map);

var loteJS = L.geoJson(lote,{
	color: 'red',
    fillColor: '#FF0000',
    onEachFeature: popup
}).addTo(map);




// Agregar la leyenda
const LEYENDA = L.control.Legend({
    position: "topleft",
    collapsed: false,
    symbolWidth: 24,
    opacity:1,
    column:1,
    legends: [
        
        {
            label: "Area de trabajo",
            type: "circle",
            radius: 6,
            color: "#9C7716",
            fillColor: "#9C7716",
            fillOpacity: 0,
            weight: 2,
            layers: [circulo],
            inactive: false,
        }, {

            label: "Lote",
            type: "rectangle",
            color: "red",
            fillColor: "#FF0000",
            weight: 2,
            layers: loteJS,lote	
        }]
		
}).addTo(map);


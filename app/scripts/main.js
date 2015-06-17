// Mapboxgl demo app
'use strict';

var map;

mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuamFtaW4td3lzcyIsImEiOiJVcm5FdEw4In0.S8HRIEq8NqdtFVz2-BwQog';

// init the map
map = new mapboxgl.Map({
    container: 'map',
    style: 'https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v7.json',
    center: [39.8282, -98.5795],
    zoom: 3,
});

map.on('style.load', function() {

	map.addSource("tom", {
   		"type": "geojson",
    	"data": 'https://raw.githubusercontent.com/bwyss/template-mapbox-gl-js-v8/master/app/data/population.json'
  	});

	map.addLayer({
        'id': 'foobar',
        'type': 'symbol',
        'source': 'tom',
        'interactive': true,
    	'layout': {
    	  	'icon-image': '{marker-symbol}-12',
    	  	'text-field': '{title}',
    	  	'text-font': 'Open Sans Semibold, Arial Unicode MS Bold',
    	  	'text-offset': [0, 0.6],
    	  	'text-anchor': 'top'
    	},
    	'paint': {
    	  	'text-size': 12
    	}
    });

    console.log('map:');
    console.log(map);

    map.on('click', function(e) {
      	map.featuresAt(e.point, {layer : 'foobar', radius : 60}, function(err, features) {
          	if (err) throw err;
          		document.getElementById('features').innerHTML = JSON.stringify(features, null, 2);
      		});
  	});
});


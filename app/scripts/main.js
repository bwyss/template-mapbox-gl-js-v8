// Mapboxgl demo app
'use strict';

var map;

mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuamFtaW4td3lzcyIsImEiOiJVcm5FdEw4In0.S8HRIEq8NqdtFVz2-BwQog';

// init the map
map = new mapboxgl.Map({
    container: 'map',
    style: 'https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v7.json',
    center: [0.360550, -78.091930],
    zoom: 5,
});

map.on('style.load', function() {


	map.addSource("tom", {
   		"type": "geojson",
    	"data": '../data/losses-poly.json'
  	});
  /*
// style for point data
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
*/

// style for polygon data
    map.addLayer({
        'id': 'foobar1',
        'type': 'fill',
        'source': 'tom',
        'interactive': true,
        'paint': {
            'fill-color': '#ffffb2',
            'fill-opacity': 0.8,
            //'fill-outline-color': '#CCCCFF'
        },
        'filter': [
            '<=', 'GM_EDU', 0.49
        ]
    });

    map.addLayer({
        'id': 'foobar2',
        'type': 'fill',
        'source': 'tom',
        'interactive': true,
        'paint': {
            'fill-color': '#fecc5c',
            'fill-opacity': 0.8,
            //'fill-outline-color': '#CCCCFF'
        },
        'filter': ['all',['>', 'GM_EDU', 0.49], ['<=', 'GM_EDU', 0.815]]
    });

    map.addLayer({
        'id': 'foobar3',
        'type': 'fill',
        'source': 'tom',
        'interactive': true,
        'paint': {
            'fill-color': '#fd8d3c',
            'fill-opacity': 0.8,
            //'fill-outline-color': '#CCCCFF'
        },
        'filter': ['all',['>', 'GM_EDU', 0.815], ['<=', 'GM_EDU', 1.139]]
    });

    map.addLayer({
        'id': 'foobar4',
        'type': 'fill',
        'source': 'tom',
        'interactive': true,
        'paint': {
            'fill-color': '#f03b20',
            'fill-opacity': 0.8,
            //'fill-outline-color': '#CCCCFF'
        },
        'filter': ['all',['>', 'GM_EDU', 1.139], ['<=', 'GM_EDU', 1.46]]
    });

    map.addLayer({
        'id': 'foobar5',
        'type': 'fill',
        'source': 'tom',
        'interactive': true,
        'paint': {
            'fill-color': '#bd0026',
            'fill-opacity': 0.8,
            //'fill-outline-color': '#CCCCFF'
        },
        'filter': [
            '>=', 'GM_EDU', 1.46
        ]
    });


    console.log('map:');
    console.log(map);

    map.on('click', function(e) {
      	map.featuresAt(e.point, { radius : 6}, function(err, features) {
          	if (err) throw err;
          		document.getElementById('features').innerHTML = JSON.stringify(features[0].properties.LOG_AV_SVI, null, 2);
      		});
  	});

});


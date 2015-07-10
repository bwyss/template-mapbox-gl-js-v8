// Mapboxgl demo app
'use strict';

var map;

mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuamFtaW4td3lzcyIsImEiOiJVcm5FdEw4In0.S8HRIEq8NqdtFVz2-BwQog';

// init the map
map = new mapboxgl.Map({
    container: 'map',
    style: 'https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v7.json',
    center: [-1.83, -78.183],
    zoom: 5.5,
});

map.on('style.load', function() {


    map.addSource("tom", {
        "type": "geojson",
        "data": "../data/losses-poly.json"
        //"data": 'https://raw.githubusercontent.com/bwyss/template-mapbox-gl-js-v8/master/app/data/losses-poly.json'
    });

});




// Collor options
var colorsPalRed = ['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026'];
var colorsPalBlue = ['#f1eef6', '#bdc9e1', '#74a9cf', '#2b8cbe', '#045a8d'];
var colorsPal = colorsPalRed;

$('#colorSelection').change(function() {
    if ($('#colorSelection').val() === 'red') {
        try {
            map.removeLayer('foobar1');
            map.removeLayer('foobar2');
            map.removeLayer('foobar3');
            map.removeLayer('foobar4');
            map.removeLayer('foobar5');
            map.render();

        } catch (e) {
            // continue
        }

        // set color scheme
        colorsPal = colorsPalRed;
        createLayer();
        map.update();
    }
    else if ($('#colorSelection').val() === 'blue') {
        console.log(map);
        colorsPal = colorsPalBlue;

        try {
            map.removeLayer('foobar1');
            map.removeLayer('foobar2');
            map.removeLayer('foobar3');
            map.removeLayer('foobar4');
            map.removeLayer('foobar5');
            map.removeLayer('foobar-label');
            map.render();

        } catch (e) {
            // continue
        }

        // set color scheme
        colorsPal = colorsPalBlue;
        createLayer();
    }
});

function createLayer () {

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
        'text-field': '{DPA_DESPAR}',
        'paint': {
            'fill-color': colorsPal[0],
            //'fill-opacity': 0.8,
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
            'fill-color': colorsPal[1],
            //'fill-opacity': 0.8,
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
            'fill-color': colorsPal[2],
            //'fill-opacity': 0.8,
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
            'fill-color': colorsPal[3],
            //'fill-opacity': 0.8,
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
            'fill-color': colorsPal[4],
            //'fill-opacity': 0.8,
            //'fill-outline-color': '#CCCCFF'
        },
        'filter': [
            '>=', 'GM_EDU', 1.46
        ]
    });

    map.addLayer({
        'id': 'foobar-label',
        'type': 'symbol',
        'source': 'tom',
        'layout': {
            //'symbol-placement':'center',
            'text-field': '{DPA_DESPAR}',
            'text-font': 'DIN Offc Pro Bold, Arial Unicode MS Regular',
            'text-max-size': 22,
            //'text-max-width': 14,
            //'text-letter-spacing': 0.1,
            'text-padding': 4,
            //'text-anchor': 'center',
        },
    });

    console.log('map:');
    console.log(map);

    map.on('click', function(e) {
      	map.featuresAt(e.point, { radius : 6}, function(err, features) {
            console.log('features:');
            console.log(features);
          	if (err) throw err;
          		document.getElementById('features').innerHTML = 'Data value from JSON: ' + JSON.stringify(features[0].properties.LOG_AV_SVI, null, 2);
                // Hard coded attributes list
                var keys = ["QWKHOME", "QPOVERTY", "GM_ECONOMY", "AV_ECONOMY", "QFEMALE", "QAGEDEP", "QDISABLED", "QINDIGINOU", "QHRENTERS", "QNOHEALTHI", "QNONATID", "QNOSTATREG", "QGRPHMDOM", "PPUNIT", "GM_VPOP", "AV_VPOP", "AV_EDU", "GM_EDU1", "AV_EDU1", "GM_SVI", "AV_SVI", "LOG_AV_SVI"];
                var values = [];
                var name = 'Hover over the chart!';

                for (var i = 0; i < keys.length; i++) {
                    var tmp = keys[i];
                    values.push(features[0].properties[tmp]);
                }
                chart(keys, values, name);
      		});
  	});


    ////////////////////////////////////////////
    /////////////// Pie Chart //////////////////
    ////////////////////////////////////////////

    function chart(keys, values, name) {
        var w = 400,
            h = 400,
            r = 180,
            inner = 70,
            color = d3.scale.category20c();

        var data = [];

        for (var i = 0; i < values.length; i++) {
           data[i] = {"label":keys[i], "value":values[i]};
        }
        console.log('data:');
        console.log(data);

        var total = d3.sum(data, function(d) {
            return d3.sum(d3.values(d));
        });

        var vis = d3.select("#features")
            .append("svg:svg")
            .data([data])
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("transform", "translate(" + r * 1.1 + "," + r * 1.1 + ")");

        var textTop = vis.append("text")
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .attr("class", "textTop")
            .text( "TOTAL" )
            .attr("y", -10);

        var textBottom = vis.append("text")
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .attr("class", "textBottom")
            .text(total.toFixed(2))
            .attr("y", 10);

        vis.append("text")
            .attr("text-anchor", "left")
            .style("font-size", "16px")
            .text(name)
            .attr("y", -185)
            .attr("x", -195);

        var arc = d3.svg.arc()
            .innerRadius(inner)
            .outerRadius(r);

        var arcOver = d3.svg.arc()
            .innerRadius(inner + 5)
            .outerRadius(r + 5);

        var pie = d3.layout.pie()
            .value(function(d) { return d.value; });

        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
                .append("svg:g")
                    .attr("class", "slice")
                    .on("mouseover", function(d) {
                        d3.select(this).select("path").transition()
                            .duration(200)
                            .attr("d", arcOver);
                        textTop.text(d3.select(this).datum().data.label)
                            .attr("y", -10);
                        textBottom.text(d3.select(this).datum().data.value.toFixed(3))
                            .attr("y", 10);
                    })
                    .on("mouseout", function(d) {
                        d3.select(this).select("path").transition()
                            .duration(100)
                            .attr("d", arc);
                        textTop.text( "TOTAL" )
                            .attr("y", -10);
                        textBottom.text(total.toFixed(2));
                    });

        arcs.append("svg:path")
            .attr("fill", function(d, i) { return color(i); } )
            .attr("d", arc);
/*
        var legend = d3.select("#features").append("svg")
            .attr("class", "legend-hazus")
            .attr("width", 400)
            .attr("height", 40)
            .selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(" + i * 27 + ",0)"; });

        legend.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function(d, i) { return color(i); });

        legend.append("text")
            .attr("x", 0)
            .attr("y", 30)
            .attr("dy", ".35em")
            .text(function(d) { return d.label; });
*/
    }

};


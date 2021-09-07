const style = `
<style>
    #leaflet {
        height: 100%;
        width: 100%;
    }

    .wrapper {
        display: none;
    }

    .map-icons {
        height: 55px;
        width: 60px;
        width: 50px;
        border-radius: 50%;
        border: 5px solid blue;
        object-fit: cover;
    }
    .triangle-wrapper {
        justify-content: center;
        display: flex;
        width: 60px;
        margin-top: -2px;
    }

    .triangle {
        height: 0;
        background-color: transparent;
        border-style: solid;
        border-left-width: 8;
        border-right-width: 8;
        border-bottom-width: 16px;
        border-left-color: transparent;
        border-right-color: transparent;
        border-top-color: transparent;
        border-bottom-color: blue;
        transform: rotate(180deg);
    }
    .leaflet-popup-content {
    /* change size of margin */
        margin: 14px 14px;
    /* make the line height smaller */
    line-height: 1.4;
    }
    
    /* change color when the cursor hovers over the popup close button */
    .leaflet-container a.leaflet-popup-close-button:hover {
        color: #9d132a;
    }
    
    /* change color of an unvisited link and the zoom symbols */
    a:link {
        color: #9d132a;
    }
    
    /* change color of a visited link */
    a:visited {
        color: #84b819;
    }
    
    /* change color when the cursor hovers over a link */
    a:hover {
        color: #e11b3c;
    }
</style>
`;
const head = `
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.20/lodash.min.js" integrity="sha512-90vH1Z83AJY9DmlWa8WkjkV79yfS2n2Oxhsi2dZbIv0nC4E6m5AbH8Nh156kkM7JePmqD6tcZsfad1ueoaovww==" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""></script>
    ${style}
</head>
`;

const mapFunctions = `
<script>
    var findMarker = function (data) {
        return _.find(leaflet._layers,(marker) => marker.id == data.id);
    }

    var updateMarker = function (marker, data) {
        if(data && data.location instanceof Array) {
            var newLatLng = new L.LatLng(data.location[0], data.location[1]);
            marker.setLatLng(newLatLng);
        }
    }

    var createMarker = function (data) {
        data = JSON.parse(data);
        var marker = findMarker(data);
        if(marker) {
            console.log('render marker',data);
            return updateMarker(marker, data);
        }
        var html = '<div><img class="map-icons" src="'+data.url+'?version='+Math.floor(Math.random() * 1000)+'"><div class="triangle-wrapper"><span class="triangle"></span></div></div>';
        var marker = L.marker(data.location, {
            icon: L.divIcon({
                html: html,
                iconAnchor:   [30, 85], 
                popupAnchor: [0, -85],
                className: 'dummy',
            }),
        })
        .addTo(leaflet)
        .bindPopup("<strong style='color: #84b819'>"+data.name+"</strong><br>This is demo popup use to deal with feature features.");
        marker.id = data.id;
    }

    var setView = function (lat, long, zoom) {
        leaflet.setView([lat, long], zoom);
    }
</script>
`;

const initMap = `
<script>
    var leaflet = L.map('leaflet').setView([$lat, $lng], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 30,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        // id: 'mapbox/satellite-v9',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(leaflet).bindPopup("<strong style='color: #84b819'>SRF Data</strong><br>Schweizer Rundfunk und Fernsehen | Zürich<br>Head: Sandra Manca");
</script>
`;

const script = `
<html>
    ${head}
    <body>
        <div id="leaflet"></div>
    </body>
    ${mapFunctions}
    ${initMap}
</html>
`;

export default script;

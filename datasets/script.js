//Get only Moorings
fetch('./canalplan_places.geojson')
    .then(response => response.json())
    .then(data => {
        console.log(data.features);
        data.features = data.features.filter((x) => {
            return x.properties.layer === "mooring"
        });
        console.log(data);
        stores = data;
    })
    .catch(error => console.error('Error:', error));

//Get only Marinas
fetch('./canalplan_places.geojson')
    .then(response => response.json())
    .then(data => {
        console.log(data.features);
        data.features = data.features.filter((x) => {
            return x.properties.layer === "facilities" && x.properties.icon === "cp-boatyard"
        });
        console.log(data);
        stores = data;
    })
    .catch(error => console.error('Error:', error));
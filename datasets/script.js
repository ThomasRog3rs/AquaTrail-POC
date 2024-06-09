const fs = require('fs');
//Get only Moorings
try{
    let data = fs.readFileSync('./canalplan_places.geojson', 'utf8');
    data = JSON.parse(data);
    data.features = data.features.filter((x) => {
        return x.properties.layer === "mooring"
    });
    const output = JSON.stringify({"type": "FeatureCollection", "features": data.features})
    console.log(output);

    fs.writeFileSync('./moorings.geojson', output);
}catch(err){
    console.error(err);
}

// //Get only Marinas
try{
    let data = fs.readFileSync('./canalplan_places.geojson', 'utf8');
    data = JSON.parse(data);
    data.features = data.features.filter((x) => {
        return x.properties.layer === "facilities" && x.properties.icon === "cp-boatyard"
    });
    const output = JSON.stringify({"type": "FeatureCollection", "features": data.features})
    console.log(output);

    fs.writeFileSync('./marinas.geojson', output);
}catch(err){
    console.error(err);
}
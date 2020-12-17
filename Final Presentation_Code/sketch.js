// https://mappa.js.org/docs/getting-started.html


// Other possible interesting videos:
// Subscribers data: https://www.youtube.com/watch?v=Ae73YY_GAU8&feature=youtu.be
// Earthquake Data: https://www.youtube.com/watch?v=ZiYdOwOrGyc&t=1083s

// For integrating images: https://www.youtube.com/watch?v=FVYGyaxG4To


let myMap;
let canvas;
const mappa = new Mappa('Leaflet');

let options = {
  lat: 42.90888574594455,
  lng: -78.86234533825683,
  zoom: 12.5,
  style: "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png"
}


function preload() {
  // With this code, you will need to convert your GPX file to CSV
  // Google search online converters and select one to test
  vehicles = loadTable('gta.csv', 'csv', 'header');
  sexualAssaults = loadTable('sexualAssault.csv', 'csv', 'header');
  homicides = loadTable('homicide.csv', 'csv', 'header');
  cameras = loadTable('cameras.csv', 'csv', 'header');
  tomPath = loadTable('cleary_Route01.csv', 'csv', 'header');
  joshPath = loadTable('Josh_PathWEEK10.csv', 'csv', 'header');
}


function setup() {
  canvas = createCanvas(800, 800);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  myMap.onChange(clear);


  myMap.onChange(drawGTA.bind(null, vehicles));
  myMap.onChange(drawSA.bind(null, sexualAssaults));
  myMap.onChange(drawH.bind(null, homicides));
  myMap.onChange(drawCam.bind(null, cameras));
  myMap.onChange(drawTomPath.bind(null, tomPath));
  myMap.onChange(drawJosh.bind(null, joshPath));
}

function initialize() {
  // translate(100, 100);
  const fenway = { lat: 42.345573, lng: -71.098326 };
  const map = new google.maps.Map(document.getElementById("map"), {
    center: fenway,
    zoom: 14,
  });
  const panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano"),
    {
      position: fenway,
      pov: {
        heading: 34,
        pitch: 10,
      },
    }
  );
  map.setStreetView(panorama);
}


function draw() {
}


function drawTomPath(path) {
  for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'tomlat'));
    const longitude = Number(path.getString(i, 'tomlong'));

    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      const pos = myMap.latLngToPixel(latitude, longitude);
      noStroke();
      fill(123, 11, 217, 50);
      ellipse(pos.x, pos.y, 2, 2)

      stroke(123, 11, 217);
      strokeWeight(2);
      line(pos.x, pos.y, pos.x, pos.y);
    }
  }
}

function drawJosh(path) {
  for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'reclat'));
    const longitude = Number(path.getString(i, 'reclon'));

    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      const pos = myMap.latLngToPixel(latitude, longitude);
      noStroke();
      fill(2, 124, 248, 60);
      ellipse(pos.x, pos.y, 2, 2);

      stroke(2, 124, 248);
      strokeWeight(2);
      line(pos.x, pos.y, pos.x, pos.y);
    }
  }
}

function drawCam(path) {
  for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'latitude'));
    const longitude = Number(path.getString(i, 'longitude'));

    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      const pos = myMap.latLngToPixel(latitude, longitude);
      noStroke();
      fill(119, 227, 11);
      rect(pos.x, pos.y, 7, 7);

      stroke('white');
      strokeWeight(.75);
      line(pos.x, pos.y, pos.x, pos.y);
    }
    this.clicked = function() {


    }

  }
  function mousePressed() {
        for (var i = 0; i < cameras.length; i++)
          cameras[i].clicked();


  }
}

function drawH(path) {
  for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'latitude'));
    const longitude = Number(path.getString(i, 'longitude'));

    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      const pos = myMap.latLngToPixel(latitude, longitude);
      noStroke();
      fill(145, 29, 35);
      ellipse(pos.x, pos.y, 5, 5)

      stroke('red');
      strokeWeight(1);
      line(pos.x, pos.y, pos.x, pos.y);
    }
  }
}

function drawGTA(path) {
  for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'latitude'));
    const longitude = Number(path.getString(i, 'longitude'));

    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      const pos = myMap.latLngToPixel(latitude, longitude);
      noStroke();
      fill(255, 243, 71, 10);
      ellipse(pos.x, pos.y, 5, 5)

      stroke('yellow');
      strokeWeight(2);
      line(pos.x, pos.y, pos.x, pos.y);
    }
  }
}

function drawSA(path) {
  for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'latitude'));
    const longitude = Number(path.getString(i, 'longitude'));

    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      const pos = myMap.latLngToPixel(latitude, longitude);
      noStroke();
      fill(237, 47, 57, 10);
      ellipse(pos.x, pos.y, 5, 5)

      stroke('orange');
      strokeWeight(2);
      line(pos.x, pos.y, pos.x, pos.y);
    }
  }
}

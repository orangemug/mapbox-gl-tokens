const mapboxGlTokens = require("../");

let message = "Enter your <maptiler.com> token below use osm-liberty";
const token = window.prompt(message, "");

const map = new mapboxgl.Map({
  container: 'map',
  style: 'https://maputnik.github.io/osm-liberty/style.json',
  /* Transform the requests adding in the tokens */
  transformRequest: mapboxGlTokens({
    tilehosting: token
  })
});

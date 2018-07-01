# mapbox-gl-tokens
Making it easy to reuse open source mapbox-gl-js styles that need tokens

[![stability-unstable](https://img.shields.io/badge/stability-unstable-yellow.svg)][stability]
[![Build Status](https://circleci.com/gh/orangemug/mapbox-gl-tokens.png?style=shield)][circleci]
[![Dependency Status](https://david-dm.org/orangemug/mapbox-gl-tokens.svg)][dm-prod]
[![Dev Dependency Status](https://david-dm.org/orangemug/mapbox-gl-tokens/dev-status.svg)][dm-dev]

[stability]:   https://github.com/orangemug/stability-badges#unstable
[circleci]:    https://circleci.com/gh/orangemug/mapbox-gl-tokens
[dm-prod]:     https://david-dm.org/orangemug/mapbox-gl-tokens
[dm-dev]:      https://david-dm.org/orangemug/mapbox-gl-tokens#info=devDependencies

_Problem_: To reuse mapbox-gl styles with sources other than Mapbox, for example [maptiler](https://maptiler.com) or [thunderforest](https://thunderforest.com/) requires modifying the `style.json` to insert your own keys/tokens

_Solution_: A simple function to transform the http requests at runtime to add in your tokens.


## Install
To install

```
npm install orangemug/mapbox-gl-tokens
```


## Usage
Via `<script/>` tags

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset=utf-8 />
  <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.js'></script>
  <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.css' rel='stylesheet' />
  <!-- Include the library -->
  <script src='https://orangemug.github.io/mapbox-gl-tokens/mapbox-gl-tokens.min.js'></script>
</head>
<body>
  <div id='map'></div>
  <script>
  var map = new mapboxgl.Map({
      container: 'map',
      style: 'https://maputnik.github.io/osm-liberty/style.json',
      /* Transform the requests adding in the tokens */
      transformRequest: mapboxGlTokens({
        tilehosting: "INSERT_TOKEN_HERE",
        thunderforest: "INSERT_TOKEN_HERE"
      })
  });
  </script>
</body>
</html>
```

Via npm

```js
const mapboxGlTokens = require("mapbox-gl-tokens");

const tokens = {
  tilehosting: "TOKEN",
  thunderforest: "TOKEN"
};

const map = new mapboxgl.Map({
  container: 'map',
  style: 'https://maputnik.github.io/osm-liberty/style.json',
  transformRequest: mapboxGlTokens(tokens),
});
```

The library also accepts a second parameter, which can further transform the request.

```
mapboxGlTokens(tokens, function(url, resourceType) {
  // Transform the request in the normal way...
  return {
    url: url
  }
});
```

See <https://www.mapbox.com/mapbox-gl-js/api#map> `options.transformRequest` for full details.


## License
[MIT](LICENSE)


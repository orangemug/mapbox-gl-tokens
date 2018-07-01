const assert = require("assert");
const mapboxGlTokens = require("../");


const TOKENS = {
  tilehosting: "test_tilehosting",
  thunderforest: "test_thunderforest",
};

const TRANSFORM_MOD = function(url, resourceType) {
  return {
    url: url+"&test=1"
  }
};

describe("mapbox-gl-tokens", function() {
  it("tilehosting", function() {
    const transformRequest = mapboxGlTokens(TOKENS, TRANSFORM_MOD);
    const rslt = transformRequest("https://maps.tilehosting.com/data/contours.json?key={key}")
    assert.deepEqual(rslt, {
      url: `https://maps.tilehosting.com/data/contours.json?key=${TOKENS.tilehosting}&test=1`
    });
  });

  it("thunderforest", function() {
    const transformRequest = mapboxGlTokens(TOKENS, TRANSFORM_MOD);
    const rslt = transformRequest("https://tile.thunderforest.com/thunderforest.transport-v1.json?apikey={apikey}")
    assert.deepEqual(rslt, {
      url: `https://tile.thunderforest.com/thunderforest.transport-v1.json?apikey=${TOKENS.thunderforest}&test=1`
    });
  });

  it("unknown", function() {
    const transformRequest = mapboxGlTokens(TOKENS, TRANSFORM_MOD);
    const rslt = transformRequest("https://example.com?apikey=foo")
    assert.deepEqual(rslt, {
      url: `https://example.com?apikey=foo&test=1`
    });
  });

  it("without additional transformRequest", function() {
    const transformRequest = mapboxGlTokens(TOKENS);
    const rslt = transformRequest("https://example.com?apikey=foo")
    assert.deepEqual(rslt, {
      url: `https://example.com?apikey=foo`
    });
  });
})

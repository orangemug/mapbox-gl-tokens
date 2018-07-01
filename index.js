const url = require("url");

const tilehosting = {
  id: "tilehosting",
  check: function(urlObj, resourceType) {
    return (
      urlObj.hostname.match(/\.tilehosting.com/)
    );
  },
  handler: function(token, urlObj, resourceType) {
    urlObj.query.key = token;
    const newUrl = url.format(urlObj);
    return newUrl;
  }
}

const thunderforest = {
  id: "thunderforest",
  check: function(urlObj, resourceType) {
    return (
      urlObj.hostname.match(/\.thunderforest.com/)
    );
  },
  handler: function(token, urlObj, resourceType) {
    urlObj.query.apikey = token;
    const newUrl = url.format(urlObj);
    return newUrl;
  }
}

const providers = [
  tilehosting,
  thunderforest
];

/**
 * @param {Object} tokens
 * @param {Function} requestTransformFunction
 * @return {Object}
 */
module.exports = function(tokens, requestTransformFunction) {
  return function(reqUrl, resourceType) {
    const urlObj = url.parse(reqUrl, true);

    // Remove old search, this will get replaced by `urlObj.query`
    delete urlObj.search;

    let newUrl = reqUrl;

    for(let i=0; i<providers.length; i++) {
      const provider = providers[i];
      if(provider.check(urlObj, resourceType)) {
        newUrl = provider.handler(tokens[provider.id], urlObj, resourceType);
        break;
      }
    }

    // Allow additional 'transformRequest' function
    if(requestTransformFunction) {
      return requestTransformFunction(newUrl, resourceType);
    }
    else {
      return {
        url: newUrl
      }
    }
  }
};


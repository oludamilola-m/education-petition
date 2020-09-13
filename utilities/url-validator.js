const url = require("url");

module.exports = function isValidUrl(address) {
    const parsedAddress = url.parse(address);
    return !["https:", "http:"].includes(parsedAddress.protocol);
};

//key.js figure out what key should be return
if (process.env.NODE_ENV === "production") {
	// we are in production mode, return the porduction creditential
	module.exports = require("./prod");
} else {
	// we are in development mode, return the development creditential
	module.exports = require("./dev");
}

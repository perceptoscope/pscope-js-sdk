var pscope = require('./index');


pscope.on('rotation', function(rotation) {
	console.log(rotation)
});

console.log("connecting to wamp");
pscope.connect({
	url: 'ws://192.168.1.12:3000/'
}).then(function() {
	console.log("Connected!")
	pscope.setRotation(Math.PI, 0, 100);
});
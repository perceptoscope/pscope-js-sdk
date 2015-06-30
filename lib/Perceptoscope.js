var events = require('events'),
	_	= require('lodash'),
	util = require('util'),
	url	 = require('url'),
	autobahn = require('autobahn'),
	Promise = require('bluebird').Promise,
	querystring = require('querystring');


var DEFAULT_CONFIG = {
				realm: 'realm',
 				url: 'http://localhost:3000/'
			};

if (require('is-browser') && window.location.search) {
	DEFAULT_CONFIG = querstring.parse(window.location.search).pscope;
}


// private variables
var rotation;

function Perceptoscope() {

	Object.defineProperties(this, {
		'rotation' : {
			get: function() {
				return rotation;
			}
		},
		'hmd' : {
			get: function() {
				return hmd;
			}
		}
	});
}

util.inherits(Perceptoscope, events.EventEmitter);

_.assign(Perceptoscope.prototype, {
	connect: function(config) {
		return new Promise(function(resolve, reject) {
			config = _.defaults(config, DEFAULT_CONFIG);
			console.log(config);

		    this.connection = new autobahn.Connection(config);
			this.connection.onopen = function (session) {
				this.session = session;
				resolve(this.session);
			}.bind(this);
			this.connection.onerror = reject;
			this.connection.open();


		}.bind(this));
	},

	setRotation: function(pitch, yaw, speed) {
		return this.session.call('com.perceptoscope.rotateTo', [pitch, yaw, speed]);
	},

	takeSnapshot: function(camera) {
		return this.session.call('com.perceptoscope.camera.snapshot', [camera]);
	},

	onRotation: function(data) {
		rotation = data;
		this.emit('rotation', rotation);
	}
});

module.exports = Perceptoscope;
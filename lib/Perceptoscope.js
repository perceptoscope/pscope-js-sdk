var events = require('events'),
    autobahn = require('autobahn');

/**
 * Perceptopscope WAMP Topics
 * @constant
 * @private
 */
const TOPICS = {
    ROTATION: 'com.perceptoscope.rotation',
    POSITION: 'com.perceptoscope.position',
    HMD: 'com.perceptoscope.hmd'
};

/**
 * Perceptopscope WAMP RPC Names
 * @constant
 * @private
 */
const RPC = {
    ROTATION: {
        GET: 'com.perceptoscope.store.rotation.get'
    },
    POSITION: {
        GET: 'com.perceptoscope.store.position.get'
    },
    HMD: {
        GET: 'com.perceptoscope.store.hmd.get'
    }
};

/**
 * Event names
 * @constant
 * @private
 */
const EVENTS = {
    /** Fired when rotation changes */
    ROTATION: 'rotation',
    /** Fired when position changes */
    POSITION: 'position',
    /** Fired when HMD changes */
    HMD: 'hmd',
    /** Fired when pscope is ready */
    CONNECTED: 'connected'
};

/**
 * @typedef {object} Quaternion
 * @property x {number}
 * @property y {number}
 * @property z {number}
 * @property w {number}
 */
/**
 * @typedef {object} Point
 * @property x {number}
 * @property y {number}
 * @property z {number}
 */
/**
 * @typedef {object} HMD
 * @property fov {FieldOfView}
 * @property left {Eye}
 * @property right {Eye}
 */

/**
 * @typedef {object} FieldOfView
 * @property upDegrees {number}
 * @property rightDegrees {number}
 * @property downDegrees {number}
 * @property leftDegrees {number}
 */

/**
 * @typedef {object} Eye
 * @property {Rect} renderRect
 * @property {Point} eyeTranslation
 */

/**
 * @typedef {object} Rect
 * @property x {number}
 * @property y {number}
 * @property width {number}
 * @property height {number}
 */


/**
 * A connection to perceptope
 * @extends event.EventEmitter
 * @example
 * var pscope = new Perceptoscope('ws://localhost:3000');
 * pscope.on(Perceptoscope.Events.ROTATION, rotation => {
 *     console.log(rotation);
 * });
 * pscope.connect();
 */
class Perceptoscope extends events.EventEmitter {

    /**
     * Creates a Perceptope
     * @param {string} url - The websocket url to the perceptoscope ex. ws://localhost:3000
     */
    constructor(url) {
        super();
        this._url = url;
    }

    /**
     * Connects to a perceptoscope and fetches intial values for rotation, position and hmd.
     * @return {Promise}
     */
    connect() {
        return new Promise((resolve, reject) => {
            this.connection = new autobahn.Connection({
                'realm': 'pscope',
                url: this._url
            });
            this.connection.onopen = session => {
                this._session = session;

                session.subscribe(TOPICS.ROTATION, this._subscriber('_rotation', EVENTS.ROTATION));
                session.subscribe(TOPICS.POSITION, this._subscriber('_position', EVENTS.POSITION));
                session.subscribe(TOPICS.HMD, this._subscriber('_hmd', EVENTS.HMD));

                Promise.all([
                    session.call(RPC.ROTATION.GET, []),
                    session.call(RPC.POSITION.GET, []),
                    session.call(RPC.HMD.GET, [])
                ]).then(results => {
                    this._subscriber('_rotation', EVENTS.ROTATION)(results[0]);
                    this._subscriber('_position', EVENTS.POSITION)(results[1]);
                    this._subscriber('_hmd', EVENTS.HMD)(results[2]);
                    resolve(this);
                });
            };
            this.connection.onerror = reject;
            this.connection.open();
            this.emit(EVENTS.CONNECTED);
        });
    }

    /**
     * @private
     */
    _subscriber(varName, eventName) {
        return value => {
            value = value instanceof Array ? value[0] : value;

            console.log(varName, value);
            this[varName] = value;
            this.emit(eventName);
        };
    }

    /**
     * Closes the connection
     */
    close() {
        if (this.connection) {
            this.connection.close();
        }
    }

    /**
     * The url of the websocket conection
     * @return {string}
     */
    get url() {
        return this._url;
    }

    /**
     * The current rotation
     * @return {Quaternion}
     */
    get rotation() {
        return this._rotation;
    }

    /**
     * Current HMD (Head Mounted Display) configurations
     * @return {HMD}
     */
    get hmd() {
        return this._hmd;
    }

    /**
     * Current position of the perceptoscope
     * @return {Point}
     */
    get position() {
        return this._position;
    }

}

/**
 * Event Names
 * @static
 */
Perceptoscope.Events = EVENTS;

module.exports = Perceptoscope;

![perceptoscope](http://perceptoscope.com/wp-content/uploads/2015/07/page1image1952.png)
# pscope-js-sdk
The javascript SDK for connecting to a Perceptoscope over it's WAMP WebSocket. Works in both NodeJS and the browser.


## Documentation
<a name="Perceptoscope"></a>
### Perceptoscope ⇐ `EventEmitter`
A connection to perceptope

**Extends:** `EventEmitter`

* [Perceptoscope](#Perceptoscope) ⇐ `event.EventEmitter`
    * [new Perceptoscope(url)](#new_Perceptoscope_new)
    * _instance_
        * [.url](#Perceptoscope+url) ⇒ `string`
        * [.rotation](#Perceptoscope+rotation) ⇒ [`Quaternion`](#Quaternion)
        * [.hmd](#Perceptoscope+hmd) ⇒ [`HMD`](#HMD)
        * [.position](#Perceptoscope+position) ⇒ [`Point`](#Point)
        * [.connect()](#Perceptoscope+connect) ⇒ `Promise`
        * [.close()](#Perceptoscope+close)
    * _static_
        * [.Events](#Perceptoscope.Events)

<a name="new_Perceptoscope_new"></a>

#### new Perceptoscope(url)
Creates a Perceptope


| Param | Type     | Description                                                      |
|-------|----------|----------------------------------------------------------------- |
| url   | `string` | The websocket url to the perceptoscope ex. `ws://localhost:3000` |

**Example**
```js
var pscope = new Perceptoscope('ws://localhost:3000');
pscope.on(Perceptoscope.Events.ROTATION, rotation => {
    console.log(rotation);
});
pscope.connect();
```
<a name="Perceptoscope+url"></a>

#### perceptoscope.url ⇒ `string`
The url of the websocket conection

<a name="Perceptoscope+rotation"></a>

#### perceptoscope.rotation ⇒ [`Quaternion`](#Quaternion)
The current rotation

<a name="Perceptoscope+hmd"></a>
#### perceptoscope.hmd ⇒ [`HMD`](#HMD)
Current HMD (Head Mounted Display) configurations

<a name="Perceptoscope+position"></a>

#### perceptoscope.position ⇒ [`Point`](#Point)
Current position of the perceptoscope

<a name="Perceptoscope+connect"></a>

#### perceptoscope.connect() ⇒ `Promise`
Connects to a perceptoscope and fetches intial values for rotation, position and hmd.
<a name="Perceptoscope+close"></a>

#### perceptoscope.close()
Closes the connection

<a name="Perceptoscope.Events"></a>
#### Perceptoscope.Events `object`
**Properties**

| Name      | Value        | Description                   |
|-----------| -------------|-------------------------------|
| ROTATION  | `"rotation"` | Fired when [`rotation`](#Perceptoscope+rotation) changes  |
| POSITION  | `"position"` | Fired when [`position`](#Perceptoscope+postition) changes |
| HMD       | `"position"` | Fired when [`hmd`](#Perceptoscope+hmd) changes            |
| CONNECTED | `"position"` | Fired when pscope is connected and has initial data     |


## Types

<a name="Quaternion"></a>
### Quaternion : `object`
**Properties**

| Name | Type     |
|------|----------|
| x    | `number` |
| y    | `number` |
| z    | `number` |
| w    | `number` |

<a name="Point"></a>

### Point : `object`
**Properties**

| Name | Type     |
|------|----------|
| x    | `number` |
| y    | `number` |
| z    | `number` |

<a name="HMD"></a>

### HMD : `object`
**Properties**

| Name  | Type                          |
|-------|-------------------------------|
| fov   | [`FieldOfView`](#FieldOfView) |
| left  | [`Eye`](#Eye)                 |
| right | [`Eye`](#Eye)                 |

<a name="FieldOfView"></a>
### FieldOfView : `object`
**Properties**

| Name | Type |
| --- | --- |
| upDegrees | `number` |
| rightDegrees | `number` |
| downDegrees | `number` |
| leftDegrees | `number` |

<a name="Eye"></a>

### Eye : `object`
**Properties**

| Name | Type |
| --- | --- |
| renderRect | [`Rect`](#Rect) |
| eyeTranslation | [`Point`](#Point) |

<a name="Rect"></a>

### Rect : `object`
**Properties**

| Name | Type |
| --- | --- |
| x | `number` |
| y | `number` |
| width | `number` |
| height | `number` |

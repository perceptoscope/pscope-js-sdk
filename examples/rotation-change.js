var { Perceptoscope } = require('../');

pscope = new Perceptoscope('ws://localhost:3000');

function onRotation(rotation) {
  console.log('rotation: %s', JSON.stringify(rotation));
}

pscope.on(Perceptoscope.Events.ROTATION, onRotation);

pscope.connect().then(() => {
  console.log('Connected to Perceptoscope!');
  onRotation(pscope.rotation);
});

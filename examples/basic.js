var { Perceptoscope } = require('../');

pscope = new Perceptoscope('ws://localhost:3000');

pscope.connect().then(() => {
	console.log('Connected to Perceptoscope!');
	console.log('HMD %s', JSON.stringify(pscope.hmd, null, 4))
	console.log('position %s', JSON.stringify(pscope.position, null, 4))
	console.log('rotation %s', JSON.stringify(pscope.rotation, null, 4))
	pscope.close();
});

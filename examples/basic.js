var { Perceptoscope } = require('../');

const host = process.argv[2] || 'localhost';
const uri = `ws://${host}:3000`
pscope = new Perceptoscope(uri);

console.log(`Connecting to ${uri}`)
pscope.connect().then(() => {
	console.log(`Connected to Perceptoscope!`);
	console.log(`HMD ${JSON.stringify(pscope.hmd, null, 4)}`);
	console.log(`position ${JSON.stringify(pscope.position, null, 4)}`);
	console.log(`rotation ${JSON.stringify(pscope.rotation, null, 4)}`);
	pscope.close();
});

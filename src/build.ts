import run from 'nsmt-nslibmgr/lib/run';

(async () => {
	await run('npx nsmt-nslibmgr make clean');
	await run('npx browserify lib/index.js -o lib/bundle.js');
	await run('npx nsmt-nslibmgr lint');
	await run('npx minify lib/bundle.js >lib/min.js');
})();

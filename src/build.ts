import { exec } from 'child_process';

async function run (command: string): Promise<void> {
	return new Promise(resolve => {
		let resolved = false;
		const child = exec(command, (error, stdout, stderr) => {
			resolved = true;
			resolve();
		});
		if (child && child.stdin && child.stdout && child.stderr) {
			child.stdout.on('data', (data: Buffer) => {
				if (!resolved && data.toString('utf8').includes('Ok to proceed')) {
					child && child.stdin && child.stdin.write('y\n');
				}
			});
			child.stdout.pipe(process.stdout);
			child.stderr.pipe(process.stdout);
		}
	});
}

(async () => {
	await run("npx yarn");
	await run("tsc --module CommonJS --target ES5 --declaration --esModuleInterop --strict --outDir lib/ src/*");
	await run("npx browserify lib/index.js -o lib/bundle.js");
	await run("npx js-beautify lib/bundle.js >lib/io.js");
	await run("npx minify lib/io.js >lib/min.js");
})();

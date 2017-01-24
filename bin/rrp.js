#!/usr/bin/env node

'use strict';

const rrp = require('../lib/index.js');
const argv = require('yargs')
	.usage('Usage: $0 -p [pattern] -r [replace] [file]')
	.demandCommand(0)
	.demandOption(['p'])
	.describe('p', 'RegExp to search for.')
	.describe('r', 'The replace string. Null by default.')
	.describe(0, 'The input file. stdin by default.')
	.argv;

const options = {
	file: argv._[0] || process.stdin,
	pattern: argv.p,
	replace: argv.r || '',
};

rrp(options).then((lines) => {
	lines.forEach((line) => console.log(line));
});

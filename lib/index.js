'use strict';

const assert = require('assert');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const split = require('split');

const readFile = (file) => {
	assert(file);
	const readStream = file.pipe ? file : fs.createReadStream(file);
	readStream.pause();
	readStream.setEncoding('utf8');
	return new Promise((resolve, reject) => {
		const lines = [];
		readStream.pipe(split()).on('data', (line) => {
			lines.push(line);
		}).on('end', () => {
			resolve(lines);
		}).on('error', (err) => {
			reject(err);
		});
		readStream.resume();
	});
};

const processLines = (pattern, replacement) => {
	return (lines) => {
		return new Promise((resolve, reject) => {
			try {
				const regexp = new RegExp(pattern, 'g');
				const newLines = lines.map((line) => {
					while (regexp.test(line)) {
						line = line.replace(regexp, replacement);
					}
					return line;
				});
				resolve(newLines);
			} catch (ex) {
				reject(ex);
			}
		});
	};
};

module.exports = function (options) {
	assert(options);
	assert(options.pattern);
	assert(options.file);
	
	return new Promise((resolve, reject) => {
		readFile(options.file)
			.then(processLines(options.pattern, options.replace))
			.then(resolve)
			.catch(reject);
	});
};

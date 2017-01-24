'use strict';

const assert = require('assert');
const rrp = require('../lib/index.js');
const options = {
	file: 'fixtures/test',
	replace: '|',
};

const assertNoChange = (lines) => {
	assert.equal(lines[2], 'ornare metus pretium vel. Sed et ornare est. In id dui nec elit condimentum pulvinar.');
	assert.equal(lines[4], '  ');
	assert.equal(lines[11], '');
};

describe('rpp', () => {
	it('replaces `Lorem` with `|`', (done) => {
		options.pattern = 'Lorem';
		rrp(options).then((lines) => {
			assert.equal(lines[0], '| ipsum dolor sit amet, consectetur adipiscing elit.');
			assertNoChange(lines);
		}).then(done).catch(done);
	});
	it('replaces `Lorem([\\s]+)` with `|`', (done) => {
		options.pattern = 'Lorem[\\s]+';
		rrp(options).then((lines) => {
			assert.equal(lines[0], '|ipsum dolor sit amet, consectetur adipiscing elit.');
			assertNoChange(lines);
		}).then(done).catch(done);
	});
	it('is case sensitive', (done) => {
		options.pattern = 'lorem';
		rrp(options).then((lines) => {
			assert.equal(lines[0], 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
			assertNoChange(lines);
		}).then(done).catch(done);
	});
});

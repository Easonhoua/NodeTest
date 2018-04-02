const assert = require('chai').assert,
      answerJson = require('./answer.json'),
      testJson = require('../result.json');;

describe('Check result', function() {

  before(function() {
  });

  it('Word count match', function() {
    assert.deepEqual(testJson, answerJson, 'you count a wrong number');
  });

  after(function() {
  });

});

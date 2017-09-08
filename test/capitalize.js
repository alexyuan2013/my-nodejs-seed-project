const util = require('../lib/util')

const chai = require('chai')
const expect = chai.expect

describe('capitalize', function() {
  it('capitalizes single word', function() {
    expect(util.capitalize('express')).to.equal('Express')
    expect(util.capitalize('Cat')).to.equal('Cat')
  })

  it('leave empty strings alone', function() {
    expect(util.capitalize('')).to.equal('')
  })

})
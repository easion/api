import 'should'
import response from '../../app/helpers/response'

describe('helpers/response', function() {
  before(function() {
    this.document = {
      toObject: () => ({
        example: 'hello world'
      })
    }
  })

  it('creates collection responses', function() {
    response.collection( [this.document] ).should.eql({
      success: true,
      data: [ this.document.toObject() ]
    })
  })

  it('creates single responses', function() {
    response.single(this.document).should.eql({
      success: true,
      data: this.document.toObject()
    })
  })

  it('creates token responses', function() {
    response.token('thisisatoken').should.eql({
      success: true,
      data: { token: 'thisisatoken' }
    })
  })

  it('creates created responses', function() {
    response.created(this.document).should.eql({
      success: true,
      data: this.document.toObject()
    })
  })

  it('creates authentication failed responses', function() {
    response.authenticationFailed().should.eql({
      success: false,
      type: 'AuthenticationFailed',
      message: 'Authentication failed',
      errors: []
    })
  })

  it('creates not found responses', function() {
    response.notFound().should.eql({
      success: false,
      type: 'NotFound',
      message: 'Resource not found',
      errors: []
    })
  })

  it('creates forbidden responses', function() {
    response.forbidden().should.eql({
      success: false,
      type: 'Forbidden',
      message: 'Permission denied for resource',
      errors: []
    })
  })

  it('creates validationerror responses', function() {
    const err = {
      message: 'This is an error',
      errors: {
        one: { message: 'one' },
        two: { message: 'two' }
      }
    }

    response.validationError(err).should.eql({
      success: false,
      type: 'ValidationError',
      message: 'This is an error',
      errors: ['one', 'two']
    })
  })

  it('creates error responses', function() {
    const err = { message: 'This is an error' }

    response.error(err).should.eql({
      success: false,
      type: 'Error',
      message: 'This is an error',
      errors: []
    })
  })
})

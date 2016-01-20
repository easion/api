import 'should'
import sinon from 'sinon'
import errorHandler from '../../app/helpers/error-handler'

describe('helpers/error-handler', function() {
  beforeEach(function() {
    this.res = {
      status: sinon.stub().returns({
        json: sinon.spy()
      })
    }

    this.next = sinon.spy()
  })

  it('handles standard errors', function() {
    const err = new Error('message')

    errorHandler(err, {}, this.res, this.next)

    this.res.status.calledWith(500).should.be.true()
    this.res.status().json.calledOnce.should.be.true()
    this.next.calledWith(err.stack)
  })

  it('handles validation errors', function() {
    const err = {
      name: 'ValidationError',
      stack: []
    }

    errorHandler(err, {}, this.res, this.next)

    this.res.status.calledWith(400).should.be.true()
    this.res.status().json.calledOnce.should.be.true()
    this.next.calledWith(err.stack)
  })
})

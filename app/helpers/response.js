import { values, pluck } from 'ramda'

export default {
  /**
   * An item collection repsonse
   *
   * @param  {Array}  items
   * @return {Object} Response
   */
  collection: function (items) {
    return {
      success: true,
      data: items.map(item => item)
    }
  },

  /**
   * A single item response
   *
   * @param  {Object} item
   * @return {Object} Response
   */
  single: function (item) {
    return {
      success: true,
      data: item
    }
  },

  /**
   * Auth token response
   *
   * @param  {String} token JWT
   * @return {Object}       Response
   */
  token: function (token) {
    return {
      success: true,
      data: { token }
    }
  },

  /**
   * A created item response
   *
   * @param  {Object} item
   * @return {Object} Response
   */
  created: function (item) {
    return {
      success: true,
      data: item
    }
  },

  /**
   * A resource failed authentication
   *
   * @return {Object} Response
   */
  authenticationFailed: function () {
    return {
      success: false,
      type: 'AuthenticationFailed',
      message: 'Authentication failed',
      errors: []
    }
  },

  /**
   * A resource not found response
   *
   * @return {Object} Response
   */
  notFound: function () {
    return {
      success: false,
      type: 'NotFound',
      message: 'Resource not found',
      errors: []
    }
  },

  forbidden: function () {
    return {
      success: false,
      type: 'Forbidden',
      message: 'Permission denied for resource',
      errors: []
    }
  },

  /**
   * A validation error response
   *
   * @param  {Error} err Validation error
   * @return {Object}    Reponse
   */
  validationError: function (err) {
    return {
      success: false,
      type: 'ValidationError',
      message: err.message,
      errors: pluck('message', values(err.errors))
    }
  },

  /**
   * A basic error response
   *
   * @param  {Error} err Error
   * @return {Object}    Response
   */
  error: function (err) {
    return {
      success: false,
      type: 'Error',
      message: err.message,
      errors: []
    }
  }
}

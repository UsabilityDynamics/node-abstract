/**
 * Mocha Test for basic
 *
 *  * mocha basic --reporter list --ui exports --watch
 *
 * @author potanin@UD
 * @date 7/7/13
 * @type {Object}
 */

require( '../basic' )

module.exports = {

  /**
   * Prepare Environment
   *
   */
  'before': function() {

    // Dependancies
    require( 'mocha' );
    require( 'should' );

    // Test Configuration
    module.settings = {};

  },

  'basic': {

    /**
     *
     */
    'prototype': function() {
    },

    'instance': {

      /**
       * -
       *
       */
      'test1': function() {
      },

      /**
       * -
       *
       */
      'test2': function() {
      }

    }

  },

  /**
   * Destroy Environment
   *
   */
  'after': function() {
  }

};
/**
 * Core Tests
 *
 * mocha core --reporter list --ui exports --watch
 *
 * @type {*}
 */

var Abstract = require( 'abstract' );

module.exports = {

  "before": function() {
    require( 'mocha' );
    require( 'should' );
  },

  "log": {

    "config can be set via method properties.": function() {
      Abstract.log.config.depth = 2;
      Abstract.log( 'one' );
    },

    "is chainable.": function() {
      Abstract.log( 'one' ).log( 'two' );
    }

  }

};

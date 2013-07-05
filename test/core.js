/**
 * Core Tests
 *
 * mocha core --reporter list --ui exports --watch
 *
 * @type {*}
 */
module.exports = {

  "before": function() {
    require( 'should' );
  },

  "log": {

    "config can be set via method properties.": function() {
      var Abstract = require( 'abstract' );

      Abstract.log.config.depth = 2;
      Abstract.log( 'one' );
    },

    "is chainable.": function() {
      var Abstract = require( 'abstract' );

      Abstract.log( 'one' ).log( 'two' );
    }

  }

};

/**
 * Test Eventification
 *
 * clear && mocha eventify --reporter list --ui exports --watch
 *
 * @type {*}
 */

var Abstract = require( 'abstract' );

module.exports = {

  "before": function() {
    require( 'mocha' );
    require( 'should' );
  },

  "eventify": function() {

    // Create request object w/ defaults
    var request = require( 'request' ).defaults({
      'json': true
    });

    // Convert all Object's Method to Events
    Abstract.Eventify( request );

    // Post Method called via emit
    Abstract.emit( 'post', 'http://google.com', console.log );
    Abstract.emit( 'post', 'http://yahoo.com', console.log );
    Abstract.emit( 'post', 'http://aws.amazon.com', console.log );

    //@todo Add items to queue and drain when all have executed.

    //Abstract.on( 'request:post:error', console.log );
    //Abstract.on( 'request:post:complete', console.log );

    //Abstract.log( eventified );

  }

};

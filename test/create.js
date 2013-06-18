/**
 * Test Eventification
 *
 * clear && mocha eventify --reporter list --ui exports --watch
 *
 * @type {*}
 */

var Abstract = require( 'abstract' );

module.exports = {

  "eventify": function() {

    var eventified = new Abstract({


    });

    Abstract.log( eventified );

  }

};

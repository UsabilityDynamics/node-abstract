/**
 * Mocha Test for modeling
 *
 * mocha modeling --reporter list --ui exports --watch
 *
 * @author potanin@UD
 * @date 7/6/13
 * @type {Object}
 */
module.exports = {

  'Abstract Modeling': {

    'can create a class and model': function() {

      var Abstract = require( '../' );
      
      var Vehicle = Abstract.Model( function Vehicle() {

        // Define Prototypal Properties
        this.properties( this.prototype, {
          sell: function sell() {},
          stop: function stop() {},
          enable: function enable() {},
          disable: function disable() {}
        });

      });

      new Vehicle();
      // console.log( Vehicle );

    }

  }

};
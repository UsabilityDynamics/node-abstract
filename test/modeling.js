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
      
      var Vehicle = Abstract.context( function Vehicle() {

        // Predefine Default property descriptions
        this.meta.set( 'defaults', {
          configurable: true,
          enumerable: true
        });

        // Define Constructor Properties
        this.properties({ cache: {} });

        // Define Prototypal Properties
        this.properties( this.prototype, {
          enable: function enable() {},
          disable: function disable() {}
        });

        this.Model( function BMW() {
          console.log( this.name, 'constructor' );
        });

        this.Model( function Chevy() {
          console.log( this.name, 'constructor' );
        });

      });

      // console.log( Vehicle );

      new Vehicle.BMW( function() {
        // console.log( this.name, 'Instantiated' );
      });

    }

  }

};
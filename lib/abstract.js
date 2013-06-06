/**
 * Abstract Resources.
 *
 *
 * @version 0.0.1
 * @class Abstract
 * @constractor
 */
function Abstract() {
  return Abstract;
}

/**
 * Prototypal Properties
 *
 */
Object.defineProperties( Abstract.prototype, {
  "eventify": {
    /**
     * Add Event Handlers to a Method or Object
     *
     * @method eventify
     */
    "value": function() {},
    "enumerable": true
  }
});

/**
 * Constructor Properties
 *
 */
Object.defineProperties( module.exports = Abstract, {
  "log": {
    /**
     * @example
     *      Abstract.log( data )
     */
    "value": function() {
      if( arguments[0] instanceof Object ) {
        console.log( require('util' ).inspect( arguments[0], { showHidden: true, depth: 3, colors: true } ))
      } else {
        console.log.apply( console, arguments );
      }
    },
    "enumerable": true
  }
});




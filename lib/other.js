/**
 * -
 *
 * -
 *
 * @author potanin
 * @date 7/6/13
 */
module.exports = {
  _create: {
    /**
     * Instantiate Children.
     *
     */
    value: function create( fn ) {

      // Create new Abstract Instance as a base
      //var child = Object.create( Abstract.prototype );
      //var child = new Abstract;
      var child = new Abstract;

      // Set Constructor
      Object.defineProperty( child, 'constructor', {
        value: fn,
        configurable: true,
        enumerable: false
      })

      // Add this to the child's chain, allowing the child
      Abstract.addPrototype( child, this );

      if( this._meta.initialization ) {
        this._meta.initialization.call( child );
      }

      // Call Constructor, pass in some arguments maybe
      if( 'function' === typeof fn ) {
        fn.call( child, child, Abstract );
      }

      return child;

    },
    configurable: true,
    enumerable: false,
    writable: true
  },
  identity: {
    get: function() {
      var path = Abstract.utility.get_constructors( this ).reverse();
      return {
        id: this._meta.id,
        type: path[ ( path.length - 1 ) ],
        path: path.join( '.' )
      }
    },
    configurable: true,
    enumerable: false
  },
  spawn: {
    /**
     * Start Context in another Worker
     *
     * @experimental
     */
    value: function spawn() {},
    configurable: true,
    enumerable: true,
    writable: true
  },
  build: {
    /**
     * Generate Standalone JavaScript for browser integration
     *
     * The result is not cached and is expected that the rendering engine does the caching.
     *
     * @param options
     * @returns {String}
     */
    value: function build( options ) {
      var script = '';
      // read this file
      // include dependencies
      // minify
      return script;
    },
    configurable: true,
    enumerable: false,
    writable: true
  },
  addPrototype: {
    /**
     * Allow Prototype useage method to be ran in custom context for static calls
     *
     * @returns {Function}
     */
    get: function() {
      return function( context, proto ) {
        return Abstract.prototype.use.call( context, proto );
      }
    },
    configurable: false,
    enumerable: true
  }
}

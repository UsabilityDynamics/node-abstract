/**
 * Create custom objects and methods by aggregating and abstracting esources.
 *
 * @version 0.0.1
 * @class Abstract
 * @constractor
 */
function Abstract( settings ) {
  var context = this;
  var constructor = arguments.callee;
  var prototype = arguments.callee.prototype;

  // Detect non-standard instantiation - not using "new", recover prototpe object
  if( !Object.getPrototypeOf( context ).observe || !( context instanceof constructor ) ) {

    Object.getOwnPropertyNames( prototype ).forEach( function( name ) {
      if( !context.hasOwnProperty( name ) ) { Object.defineProperty( context, name, Object.getOwnPropertyDescriptor( prototype, name ) ); }
    });
  }

  // Create Instance Properties
  Object.defineProperties( context, {
    _settings: {
      value: settings || {},
      enumerable: false,
      writable: true
    }
  });

  Object.keys( context._settings ).forEach( function( key ) {
    context.make( key, context._settings[ key ], result );
  });

  // @todo Enable EventEmitter

  return context;

}

/**
 * Prototypal Properties
 *
 */
Object.defineProperties( Abstract.prototype, {
  get: {
    /**
     *
     * @param target
     * @param path
     * @returns {*}
     */
    value: function get( target, path ) {

      try {
        return !path ? target : path.split( '.' ).reduce( function(o, x) {  return o[x]; }, target );
      } catch( error ) { return null; }
    },
    enumerable: true
  },
  make: {
    /**
     *
     * @param string
     * @param value
     * @param hash
     * @param seperator
     * @returns {*}
     */
    value: function ( string, value, hash, seperator ) {
      hash = hash || {};
      seperator = seperator || '.';
      var parts = string.split( seperator );
      var refHash = hash;
      var depth = 0;

      parts.forEach( function( part ) {

        if( depth == parts.length - 1 ) { refHash[part] = value; } else {
          if( refHash[part] == null ) { refHash[part] = {}; }
          refHash = refHash[part];
        }

        depth++;

      });

      return hash;
    },
    enumerable: true
  },
  callback: {
    /**
     * Callback Fallback
     *
     * @method callback
     * @returns {Object} this
     * @chainable
     */
    value: function() {
      return this;
    },
    enumerable: true
  }
});

/**
 * Constructor Properties
 *
 */
Object.defineProperties( module.exports = Abstract, {
  create: {
    /**
     * Create new Instance
     *
     */
    get: function create( settings ) {
      return new Abstract( settings );
    },
    configurable: true,
    enumerable: true,
    writable: true
  },

  logger: {
    /**
     * Define Logger
     *
     */
    value: {
      log: function log() {},
      info: function info() {},
      error: console.error,
      debug: require( 'debug' )( 'abstract' )
    },
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
      var script;
      // read this file
      // include dependencies
      // minify
      return script;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }
});





/**
 * Create custom objects and methods by aggregating and abstracting esources.
 *
 * @version 0.0.1
 * @class Abstract
 * @constractor
 */
function Abstract( proto, properties ) {

  // Prevent from being called in the wrong context; route to Abstract.create()
  if( !( this instanceof Abstract ) ) {
    return Abstract.create.apply( Abstract, arguments );;
  }

  // Set Defaults

  // Create Instance from context
  Object.defineProperties( this, {
    _id: {
      value: /* name || */ this.constructor.name || undefined,
      configurable: true,
      writable: true,
      enumerable: false
    },
    _model: {
      value: this.constructor.name || arguments.callee.name, // The constructor has priority.
      configurable: true,
      writable: true,
      enumerable: false
    },
    _schema: {
      value: {},
      writable: true,
      enumerable: false
    }
  });

  // Inject Prototype
  proto = proto || Object.prototype;

  // Extend Properties
  Abstract.defineProperties( this, properties || {} );

  return this;

}

/**
 * Prototypal Properties
 *
 */
Object.defineProperties( Abstract.prototype, {
  extend: {
    get: function() {
      console.log( 'extending', this.name );
      return function() { console.log( this ); return this; }.bind( this );
    }
  },
  channel: {
    get: function() { return Abstract.utility.get_constructors( Object.getPrototypeOf( this ), { delimiter: '.' } ); }
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
     * Creates a new object with the specified prototype object and properties.
     * Copy the functions from the superclass prototype to the subclass prototype.
     *
     * @param proto {Object|null} Superclass to use as prototype for new object.
     */
    value: function create( proto, properties ) {

      // Use Abstract constructor to generate to Instance using the provided proto
      return new Abstract( proto, properties );

    },
    configurable: true,
    enumerable: true
  },
  defineProperties: {
    value: function defineProperties( obj, props ) {

      // Apply Defaults
      Object.keys( props ).forEach( function( key ) {
        Abstract.defineProperty( obj, key, props[ key ] );
      });

      return obj;

    },
    configurable: true,
    enumerable: true
  },
  defineProperty: {
    value: function defineProperty( obj, key, prop ) {

      // Set Defaults
      Abstract.utility.extend( prop, Abstract.defaults() );

      // Store in Schema
      obj.__schema__

      // Add to Object
      Object.defineProperty( obj, key, prop );

      return obj;
    },
    configurable: true,
    enumerable: true
  },
  utility: {
    value: require( './utility' ),
    configurable: true,
    enumerable: false,
    writable: true
  },
  defaults: {
    value: function defaults( data ) {
      return data ? Abstract._data.defaults = data : Abstract._data.defaults = Abstract._data.defaults || {};
    },
    configurable: true,
    enumerable: false,
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
    enumerable: false,
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
    enumerable: false,
    writable: true
  },
  _data: {
    value: {},
    writable: true,
    enumerable: false
  }
});





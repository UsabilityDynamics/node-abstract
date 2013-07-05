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

  // Create Instance from context
  Object.defineProperties( this, {
    _meta: {
      value: {
        _id: Abstract.utility.generate_hash( null, { random: true }),
        _type: this.constructor.name || arguments.callee.name,
        schema: {}
      },
      configurable: true,
      writable: true,
      enumerable: false
    }
  });

  this.injectPrototype( proto );

  //console.log( '__proto__ 1', Object.keys( this.__proto__ ) );
  //console.log( '__proto__ 2', Object.keys( this.__proto__.__proto__ ) );
  //console.log( '__proto__ 3', Object.keys( this.__proto__.__proto__ ) );

  // Extend Properties
  Abstract.defineProperties( this, properties || {} );

  return this;

}

/**
 * Prototypal Properties
 *
 */
Object.defineProperties( Abstract.prototype, {
  _id: {
    get: function() { return function( value ) { this._meta._id = value; } },
    configurable: true,
    enumerable: false
  },
  _type: {
    get: function() { return function( value ) { this._meta._type = value; } },
    configurable: true,
    enumerable: false
  },
  _schema: {
    get: function() { return function( schema ) { this._meta.schema = schema; } },
    enumerable: false
  },
  _path: {
    get: function() { return Abstract.utility.get_constructors( Object.getPrototypeOf( this ), { delimiter: '.' } ); }
  },
  injectPrototype: {
    value: function injectPrototype( proto ) {
      proto = proto || {};

      // Prototype requires instantiation
      if( 'function' === typeof proto ) {
        //proto = proto.call( this );
      }

      // Move current immediate prototype object into new protototype object
      proto.__proto__ = this.__proto__;

      // Insert new prototype into chain.
      this.__proto__ = proto;

      // Ensure there is a constructor
      if( !this.__proto__.constructor ) {
        this.__proto__.constructor = function() {}
      }

      return this;

    },
    configurable: true,
    enumerable: true
  },
  extend: {
    get: function() {
      console.log( 'extending', this.name );
      return function() { console.log( this ); return this; }.bind( this );
    }
  },
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

      // General Descriptors for basic data
      if( 'object' !== typeof prop || ( !prop.value && !prop.get ) ) {
        prop = { value: prop, configurable: true, writable: true, type: typeof prop }
      }

      // Apply Defaults
      Abstract.utility.extend( prop, Abstract.defaults() );

      // Store in Schema and add to Object actual
      Object.defineProperty( obj, key, obj._meta.schema[ key ] = prop );

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





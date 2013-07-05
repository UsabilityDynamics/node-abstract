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
    get: function() { return Abstract.injectPrototype.bind( Abstract, this ); },
    configurable: true,
    enumerable: true
  },
  create: {
    /**
     * Instantiate Children.
     *
     */
    value: function create( id, properties ) {
      var Instance = Object.create( this );

      // Sexy.
      Instance._id( id );

      // Properties is most liekly just basic data.
      Abstract.defineProperties( Instance, properties );

      return Instance;
    },
    enumerable: true
  },
  extend: {
    value: function extend() {
      console.log( 'extending', this.name );
      return function() { console.log( this ); return this; }.bind( this );
    },
    enumerable: true
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

      if( arguments.length === 1 ) {
        return new Abstract( null, arguments[0] );
      }

      if( arguments.length === 2 ) {
        return new Abstract( arguments[0], arguments[1] );
      }

    },
    configurable: true,
    writable: false,
    enumerable: true
  },
  defineProperties: {
    value: function defineProperties( obj, props ) {
      Object.keys( props ).forEach( function( key ) { Abstract.defineProperty( obj, key, props[ key ] ); });
      return obj;
    },
    configurable: true,
    enumerable: true,
    writable: true
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

      // Monitor a Property.
      if( prop.hasOwnProperty( 'watch' ) ) {
        // Abstract.utility.watch( prop, this.watcher ); // @todo Not sure which function to pipeline to.
      }

      // Wrap the property into a getter and setter
      if( prop.hasOwnProperty( 'wrap' ) ) {
        // @todo
      }

      // Add Properties to (presumably) constructor.
      if( prop.hasOwnProperty( 'properties' ) ) {

        Abstract.utility.each( prop.properties, function( fn, key, array ) {
          if( 'function' === typeof prop.value ) {
            Object.defineProperty( prop.value, key, {
              value: fn,
              configurable: true,
              enumerable: true
            });
            //Abstract.injectPrototype( fn, obj );
          }
        });
      }

      return obj;

    },
    configurable: true,
    enumerable: true
  },
  injectPrototype: {
    value: function injectPrototype( target, proto ) {
      proto = proto || {};

      // Prototype requires instantiation
      if( 'function' === typeof proto ) {
        //proto = proto.call( this );
      }

      // Move current immediate prototype object into new protototype object
      proto.__proto__ = target.__proto__;

      // Insert new prototype into chain.
      target.__proto__ = proto;

      // Ensure there is a constructor
      if( !target.__proto__.constructor ) {
        target.__proto__.constructor = function() {}
      }

      return target;

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





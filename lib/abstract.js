/**
 * Create custom objects and methods by aggregating and abstracting esources.
 *
 * @version 0.0.1
 * @class Abstract
 * @constractor
 */
function Abstract() {

  // Ensure we are in a new context, or reload method in new context
  if( !( this instanceof Abstract ) ) {
    return Abstract.apply( Abstract, arguments );
  }

  // Extend context with instance-specific data
  Object.defineProperty( this, '_meta', {
    value: {
      id: Abstract.utility.generate_hash( null, { random: true }),
      schema: {}
    },
    configurable: true,
    writable: true,
    enumerable: false
  });

  // Bind Basic Settings to Meta.
  require( 'configurable' )( this._meta );

  // Enable get/set/enable/disable. Data stored in this.settings
  this.use( require( 'async' ) );

  // Return for context
  return this;

}

/**
 * Prototypal Properties
 *
 */
Object.defineProperties( Abstract.prototype, {
  Model: {
    /**
     * Start Context in another Worker
     *
     * @experimental
     */
    value: function Model( fn, schema ) {

      var Instance = new Abstract;

      // Add to Core
      this[ fn.name ] = function() {
        // console.log( fn.name, 'Initialized' );
      };

      // Initialize Constructor
      if( 'function' === typeof fn ) {
        // fn.call( Instance, Instance, this )
      }

      return this;

    },
    configurable: true,
    enumerable: true,
    writable: true
  },
  meta: {
    get: function() { return this._meta || null; },
    configurable: true,
    enumerable: false
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
  schema: {
    /**
     * Get / Set Schema
     *
     * @returns {Function}
     */
    get: function() { return function( schema ) { return this._meta.schema = schema || this._meta.schema; } },
    enumerable: false
  },
  use: {
    /**
     * Inserts an object/prototype into a target object.
     *
     * @param target
     * @param proto
     * @returns {*}
     */
    value: function use( proto ) {
      proto = proto || {};

      try {

        // Move current immediate prototype object into new protototype object
        proto.__proto__ = this.__proto__; // HACK

        // Insert new prototype into chain.
        this.__proto__ = proto.prototype || proto;

      } catch( error ) { console.error( error.message ); }

      return this;

    },
    configurable: true,
    enumerable: true
  },
  properties: {
    /**
     * Get / Set Properties
     *
     * @returns {Function}
     */
    get: function() {
      return function( target, properties ) {
        if( arguments.length === 1 ) {
          return Abstract.defineProperties( this, arguments[0] );
        } else {
          arguments[0] = arguments[0] || {};
          return Abstract.defineProperties( arguments[0], arguments[1] );
        }
      }
    },
    configurable: true,
    enumerable: false
  },
  implement: {
    value: function implement() {},
    configurable: true,
    enumerable: true,
    writable: true
  },
  plugin: {
    value: function plugin() {},
    configurable: true,
    enumerable: true,
    writable: true
  },
  module: {
    value: function module( module ) {

      // Do Stuff
      this._meta.filename = module.filename;

      // Save reference
      module.context = this;

      // Trigger Completion
      module.exports = this;

      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  },
  create: {
    /**
     * Instantiate Children.
     *
     */
    value: function create( id, properties ) {
      var Instance = Object.create( this );

      // Sexy.
      Instance.set( 'id', id );

      // Properties is most liekly just basic data.
      Abstract.defineProperties( Instance, properties );

      return Instance;
    },
    configurable: true,
    enumerable: true,
    writable: true
  },
  instance: {
    /**
     * Instantiate Children.
     *
     */
    value: function instance( fn ) {

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

      // Call Constructor, pass in some arguments maybe
      if( 'function' === typeof fn ) {
        fn.call( child, child, Abstract );
      }

      return child;

    },
    configurable: true,
    enumerable: true,
    writable: true
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
  }
});

/**
 * Constructor Properties
 *
 */
Object.defineProperties( module.exports = Abstract, {
  context: {
    /**
     * Creates Context for a Module
     *
     * @param name
     * @param fn
     */
    value: function context( fn ) {

      // Create new Abstract Instance as a base
      var self = new Abstract;

      // Set Constructor
      Object.defineProperty( self, 'constructor', {
        value: fn,
        configurable: true,
        enumerable: false
      });

      // Call Constructor, pass in some arguments maybe
      if( 'function' === typeof fn ) {
        fn.call( self, self, Abstract );
      }

      // Return for chaining
      return self;

    },
    configurable: true,
    writable: false,
    enumerable: true
  },
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
    /**
     * Configure multiple object properties.
     *
     * @param obj
     * @param props
     * @returns {*}
     */
    value: function defineProperties( target, props ) {
      Object.keys( props ).forEach( function( key ) { Abstract.defineProperty( target, key, props[ key ] ); });
      return target;
    },
    configurable: true,
    enumerable: true,
    writable: true
  },
  defineProperty: {
    /**
     * Configure single object property.
     *
     * @param obj
     * @param key
     * @param prop
     * @returns {*}
     */
    value: function defineProperty( obj, key, prop ) {

      // General Descriptors for basic data
      if( 'object' !== typeof prop || ( !prop.set && !prop.value ) ) {

        if( prop.value ) { prop = prop.value; }

        prop = {
          value: prop,
          configurable: true,
          writable: true,
          type: typeof prop,
          enumerable: true
        }

      }

      // Apply Defaults
      Abstract.utility.extend( prop, this.meta ? this.meta.get( 'defaults' ) : {} );

      // Store in Schema and add to Object actual
      Object.defineProperty( obj, key, prop );

      if( obj._meta && obj._meta.schema ) {
        obj._meta.schema[ key ] = prop;
      }

      // Handle constructor property
      if( key === 'constructor' ) {}

      // Handle prototypal properties
      if( key === 'prototype' ) {}

      // Handle __proto__ property
      if( key === '__proto__' ) {}

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
            //Abstract.use( fn, obj );
          }
        });
      }

      return obj;

    },
    configurable: true,
    enumerable: true
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
  },
  getPrototypeOf: {
    /**
     * Cross Browser Compatible prototype getter.
     *
     * @param obj
     */
    value: function getPrototypeOf( obj ) {
      if( Object.getPrototypeOf ) {
        return Object.getPrototypeOf( obj ) || undefined;
      } else if( obj.__proto__ ) {
        return obj.__proto__ || undefined;
      } else if( obj.constructor.prototype ) {
        return constructor.prototype || undefined;
      } else {
        return undefined;
      }
    },
    configurable: true,
    enumerable: true,
    writable: true
  },
  setPrototypeOf: {
    /**
     * Basic Wrapper - will be more fault-tolerant in future.
     *
     * @param obj
     * @param proto
     */
    value: function setPrototypeOf( obj, proto ) {
      if( Object.setPrototypeOf ) {
        Object.setPrototypeOf( obj, proto );
      } else if( obj.__proto__ ) {
        obj.__proto__ = obj;
      }
      return obj;
    },
    configurable: true,
    enumerable: true,
    writable: true
  },
  utility: {
    value: require( './utility' ),
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
      var script = '';
      // read this file
      // include dependencies
      // minify
      return script;
    },
    configurable: true,
    enumerable: false,
    writable: true
  }
});






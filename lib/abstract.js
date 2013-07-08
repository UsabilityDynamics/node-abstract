/**
 * Create custom objects and methods by aggregating and abstracting esources.
 *
 * @version 0.0.1
 * @class Abstract
 * @constractor
 */
function Abstract() {

  // Create Model Builder context
  if( 'function' === typeof arguments[0] ) {
    return Abstract.createModel( arguments[0] );
  }

  // Create Plain object
  if( 'object' === typeof arguments[0] ) {
    return Abstract.create( arguments[0], arguments[1] );
  }

  // Return for context
  return this;

}

/**
 * Constructor Properties
 *
 * The following properties are available within the constructor factory or by
 * referencing the constructor.
 *
 */
Object.defineProperties( module.exports = Abstract, {
  get: {
    /**
     * Get a key from current context's _meta
     *
     * @todo Migrate to use object-settings once Abstract core is ready.
     * @temp
     * @param key
     * @returns {string}
     */
    get: function() {
      return function get( key ) {
        return require( 'object-settings' ).prototype ? require( 'object-settings' ).prototype.get.call( Abstract, key ) : Abstract.utility.noop();
      }
    },
    configurable: true,
    enumerable: false
  },
  set: {
    /**
     * Set a key and value to current's context's _meta
     *
     * @todo Migrate to use object-settings once Abstract core is ready.
     * @temp
     * @param key
     * @param value
     * @returns {string}
     */
    get: function() {
      return function set( key, value ) {
        return require( 'object-settings' ).prototype ? require( 'object-settings' ).prototype.set.call( Abstract, key, value ) : Abstract.utility.noop();
      }
    },
    configurable: true,
    enumerable: false
  },
  mixin: {
    /**
     *
     * @returns {Function}
     */
    get: function() {
      return function mixin( target ) {
        return Abstract.prototype.mixin( Abstract, target );
      }
    },
    configurable: true,
    enumerable: false
  },
  createModel: {
    /**
     * Create Model Environment
     *
     * This method expects a function to be passed to be used as the Model Builder.
     * Within the context of the Model Builder new methods become available.
     *
     * Removed for now:
     * Abstract.copyProperties( Model.create, Model );
     * Abstract.addPrototype( Model.create, Model );
     *
     */
    value: function createModel( Model ) {

      // Call Constructor, pass in some arguments maybe
      if( 'function' !== typeof Model ) {
        return new Error( 'Abstract.createModel() requires a callable method as the first argument.' );
      }

      // If Instantiator already bound
      if( 'function' === typeof Model.create && model.create.name === 'Instantiator' ) {
        return Model.create;
      }

      // Create dynamically-created Model Constructor context
      Abstract.defineProperties( Model, {
        use: Abstract.prototype.use.bind( Model ),
        get: Abstract.prototype.get.bind( Model ),
        set: Abstract.prototype.set.bind( Model ),
        properties: Abstract.prototype.properties.bind( Model ),
        defineInstance: Abstract.defineInstance.bind( Abstract, Model ),
        defineProperties: Abstract.defineProperties.bind( Abstract, Model ),
        defineProperty: Abstract.defineProperty.bind( Abstract, Model )
      });

      // Create Instance Prototype from Abstract Prototype
      Model.prototype = Object.create( Abstract.prototype );

      // Run Builder in Model context
      Model.call( Model, Model, Model.prototype );

      /**
       * Constructed constructor
       *
       * This is the method that is ran when a new instance is created.
       *
       */
      Model.create = function Instantiator() {

        // Set Model Name (calling it earlier will cause issues since object-settings depends on abstract
        Model.set({
          model: Model.name || 'Model'
        });

        // Create the instance
        var Instance = Object.create( Model.prototype )

        // Set instance ID and Schema scaffolding
        Instance.set({
          id: Abstract.utility.generate_hash( null, { random: true }),
          schema: {
            id: Instance.get( 'id' ),
            type: 'object',
            properties: {}
          }
        });

        // Call Instantiator
        if( 'function' === typeof this.instantiator ) {
          this.instantiator.apply( Instance, arguments );
        }

        return Instance;

      };

      // Return constructor function
      return Model;

    },
    configurable: true,
    enumerable: true,
    writable: true
  },
  create: {
    /**
     * Creates a new object with the specified prototype object and properties.
     * Copy the functions from the superclass prototype to the subclass prototype.
     *
     * @param proto {Object|null} Superclass to use as prototype for new object.
     */
    value: function create( proto, properties ) {

      var Model = Object.create( Abstract.prototype, {
        create: {
          value: function create() {

          },
          enumerable: true,
          writable: true,
          configurable: true
        }
      });

      // Return for context
      return Model;

    },
    configurable: true,
    writable: false,
    enumerable: true
  },
  copyProperties: {
    /**
     * Iterate through target's properties and reference them into the source object
     *
     * @param target {Object}
     * @param source {Object}
     * @returns {Object} Target object.
     */
    value: function referenceProperties( target, source ) {

      Object.getOwnPropertyNames( source ).forEach( function( key ) {
        var descriptor = Object.getOwnPropertyDescriptor( source, key );

        if( descriptor.enumerable ) {
          Object.defineProperty( target, key, {
            enumerable: true,
            value: source[ key ],
            writable: descriptor.writable,
            configurable: descriptor.configurable
          });
        }

      });

      return target;

    },
    configurable: true,
    enumerable: false,
    writable: true
  },
  defineInstance: {
    /**
     * Bind Instantiator to Context
     *
     * @param fn
     */
    value: function defineInstance( target, fn ) {

      return Object.defineProperty( target, 'instantiator', {
        value: 'function' === typeof fn ? fn : Abstract.utility.noop,
        configurable: false,
        enumerable: false,
        writable: false
      });

    },
    configurable: true,
    enumerable: false,
    writable: true
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

      if( !prop ) {
        prop = {};
      }

      if( !obj ) {
        obj = {};
      }

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
    enumerable: false
  },
  extendPrototype: {
    /**
     * Allow Prototype useage method to be ran in custom context for static calls
     *
     * @returns {Function}
     */
    value: function extendPrototype() {
      var result = {};
      var list = arguments;

      Object.keys( arguments ).forEach( function( index ) {
        //Abstract.utility.extend( result, list[index] );
        //Abstract.utility.extend( result, Object.create( list[index] ) );

        if( index == 0 ) {
          result.__proto__ = list[index];
        } else {
          var depth = result;

          for( i=1; i<=index; i++ ) {
            depth = depth.__proto__;
          }

          depth.__proto__ = list[index];

        }

      });

      // Get immediate prototype
      return Abstract.getPrototypeOf( result );

    },
    configurable: false,
    enumerable: false,
    writable: true
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
    enumerable: false,
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
    enumerable: false,
    writable: true
  },
  utility: {
    value: require( './utility' ),
    configurable: true,
    enumerable: false,
    writable: true
  }
});

/**
 * Instance Properties
 *
 * The follow properties are available to each instance created from a constructor.
 * Some of the Abstract Static methods reference the prototypal methods.
 * Prototyal methods all work with the existing context.
 *
 */
Object.defineProperties( Abstract.prototype, {
  mixin: {
    /**
     * Mixin current prototype into target object
     *
     * Honors property descriptor settings, if available.
     *
     * @param target
     * @param source
     */
    value: require( './utility' ).mixin,
    configurable: true,
    writable: true,
    enumerable: false
  },
  get: {
    /**
     * Get a key from current context's _meta
     *
     * @todo Migrate to use object-settings once Abstract core is ready.
     * @temp
     * @param key
     * @returns {string}
     */
    get: function() {
      return function get( key ) {
        return require( 'object-settings' ).prototype ? require( 'object-settings' ).prototype.get( key ) : Abstract.utility.noop();
      }
    },
    configurable: true,
    enumerable: true
  },
  set: {
    /**
     * Set a key and value to current's context's _meta
     *
     * @todo Migrate to use object-settings once Abstract core is ready.
     * @temp
     * @param key
     * @param value
     * @returns {string}
     */
    get: function() {
      return function set( key, value ) {
        return require( 'object-settings' ).prototype ? require( 'object-settings' ).prototype.set( key, value ) : Abstract.utility.noop();
      }
    },
    configurable: true,
    enumerable: true
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
    enumerable: true,
    writable: true
  },
  properties: {
    /**
     * Get / Set Properties
     *
     * @returns {Function}
     */
    get: function() {
      return function( properties ) {
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
  }
});




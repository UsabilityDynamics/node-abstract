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
    get: function wrapper() {
      return function( key ) { return Abstract.prototype.get.call( Abstract, key ) }
    },
    configurable: false,
    enumerable: true
  },
  set: {
    get: function wrapper() {
      return function( key, value ) { return Abstract.prototype.set.call( Abstract, key, value ) }
    },
    configurable: false,
    enumerable: true
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

      // Create Model Builder context
      Abstract.defineProperties( Model, {
        use: Abstract.prototype.use.bind( Model ),
        module: Abstract.prototype.module.bind( Model ),
        get: Abstract.prototype.get.bind( Model ),
        set: Abstract.prototype.set.bind( Model ),
        defineInstance: Abstract.defineInstance.bind( Model ),
        defineProperties: Abstract.defineProperties.bind( Model ),
        defineProperty: Abstract.defineProperty.bind( Model )
      });

      Model.set( 'model', Model.name );

      // Create Instance Prototype from Abstract Prototype
      Model.prototype = Object.create( Abstract.prototype );

      // Run Builder in Model context
      Model.call( Model, Model, Abstract );

      /**
       * Constructed constructor
       *
       * This is the method that is ran when a new instance is created.
       *
       */
      Model.create = function Instantiator() {

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
    enumerable: true,
    writable: true
  },
  defineInstance: {
    /**
     * Bind Instantiator to Context
     *
     * @param fn
     */
    value: function defineInstance( fn ) {
      this.instantiator = fn;
    },
    configurable: true,
    enumerable: true,
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
    enumerable: true
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

        if( index == 0 ) { result.__proto__ = list[index]; } else
        if( index == 1 ) { result.__proto__.__proto__ = list[index]; } else
        if( index == 2 ) { result.__proto__.__proto__.__proto__ = list[index]; } else
        if( index == 3 ) { result.__proto__.__proto__.__proto__.__proto__ = list[index]; } else
        if( index == 4 ) { result.__proto__.__proto__.__proto__.__proto__.__proto__ = list[index]; }

      });

      // Get immediate prototype
      return Abstract.getPrototypeOf( result );

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
  get: {
    /**
     * Get a key from current context's _meta
     *
     * @todo Migrate to use object-settings once Abstract core is ready.
     * @temp
     * @param key
     * @returns {string}
     */
    value: function( key ) {
      this._meta = this._meta || {};
      return this._meta[ key ] || null;
    },
    //value: require( 'object-settings' ).get,
    configurable: true,
    enumerable: true,
    writable: true
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
    value: function( key, value ) {

      this._meta = this._meta || {};

      if( 'object' === typeof key ) {
        Abstract.utility.extend( this._meta, key );
      } else {
        this._meta[ key ] = value;
      }
    },
    // value: require( 'object-settings' ).set,
    configurable: true,
    enumerable: true,
    writable: true
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
  }
});




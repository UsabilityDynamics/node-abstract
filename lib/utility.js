/**
 * Helper Utility for Abstract
 *
 * @author potanin@UD
 * @date 6/17/13
 */
var Utility = Object.defineProperties( module.exports, {
  noop: {
    /**
     * Not a function, that's for sure.
     * This method does not accept any arguments.
     */
    value: function noop() {},
    configurable: false,
    enumerable: true,
    writable: true
  },
  apply: {
    /**
     * Creates a continuation function with some arguments already applied.
     *
     * @uses async
     */
    value: require( 'async' ).apply,
    configurable: true,
    enumerable: true,
    writable: true
  },
  defaults: {
    /**
     * Configure Defaults for an Object
     *
     * @returns {Object}
     */
    value: function defaults( target, defaults ) {

      // If no arguments, return empty object
      if( !target && !defaults ) {
        return {};
      }

      // Ensure target is an object
      target = Object.keys( target || {} ).length ? target : {};

      // Lodash-it
      return require( 'lodash' ).defaults.apply( {}, arguments );

    },
    configurable: true,
    enumerable: true,
    writable: true
  },
  watch: {
    /**
     * Watch a Single Property
     *
     * @param {Object} prop
     * @param {callback} handler
     *
     * @method watch
     * @for ObjectExtender
     *
     * @chainable
     *
     * @return {Object} newval
     */
    value: function watch( prop, handler ) {
      var oldval = this[prop];
      var newval = oldval;
      var description = Object.getOwnPropertyDescriptor( this, prop );

      // Delete original property and replace with getter/setter if possible
      if( description.configurable === false || !( delete this[ prop ] ) ) {
        return this;
      }

      return Object.defineProperty( this, prop, {
        get: function get() {
          return newval;
        },
        set: function set( val ) {
          oldval = newval;
          return newval = handler.call( this, prop, oldval, val );
        },
        enumerable: description.enumerable,
        configurable: true
      });

    },
    configurable: true,
    enumerable: true,
    writable: true
  },
  unwatch: {
    /**
     * Unwatch a Single Property
     *
     * @param {Object} prop
     *
     * @method unwatch
     * @for ObjectExtender
     *
     * @return null
     */
    value: function unwatch( prop ) {
      var val = this[prop];
      var description = Object.getOwnPropertyDescriptor( this, prop );

      // Shouldn't happen, but just in case.
      if( description.configurable === false || !( delete this[ prop ] ) ) {
        return this;
      }

      this[prop] = val;

      return this;

    },
    configurable: true,
    enumerable: true,
    writable: true
  },
  set_schema: {
    /**
     * Set Schema for an Object
     *
     * The set schema is not writable nor enumerable.
     *
     * @param {Object} obj
     * @param {json} schema
     *
     * @property {array} __schema__
     * @property {array} is_valid
     *
     * @method set_schema
     *
     * @chainable
     *
     * @return {Object} The target object.
     */
    value: function set_schema( obj, schema ) {

      return Object.defineProperties( obj, {
        '__schema__': {
          enumerable: false,
          configurable: true,
          writable: true,
          value: schema || obj.__schema__ || null
        }
      });

    },
    enumerable: false,
    configurable: true,
    writable: true
  },
  extend: {
    /**
     * Deep Merge Another Object into Current
     *
     * Can do it in two ways:
     * - with help of _.extend(). if exists
     * - or this.deepExtend, otherwise.
     *
     * @param {Object} arguments*
     *
     * @method extend
     * @for ObjectExtender
     *
     * @uses _.extend()
     * @uses Object.deepExtend()
     *
     * @chainable
     *
     * @return {Object}
     */
    value: function extend( destination, source ) {

      for (var property in source) {
        if (source[property] && source[property].constructor &&
          source[property].constructor === Object) {
          destination[property] = destination[property] || {};
          arguments.callee(destination[property], source[property]);
        } else {
          destination[property] = source[property];
        }
      }

      return destination;

    },
    configurable: true,
    enumerable: true,
    writable: true
  },
  query: {
    /**
     * Get property value using a dot notation path.
     *
     * @param obj
     * @param str
     * @returns {*}
     */
    value: function query( obj, str ) {

      if( !str ) {
        return obj;
      }

      if( 'object' === typeof str ) {
        // @todo Convert Object to dot notation, using the first full dot notation path.
      }

      try {
        return str.split( '.' ).reduce( function( o, x ) {
          return o[x]
        }, obj);

      } catch( error ) {
        return null;
      }

    },
    configurable: true,
    enumerable: true,
    writable: true
  },
  unwrap: {
    /**
     * Unwrap dot notation string to nested Object
     *
     * @param string
     * @param value
     * @param hash
     * @param seperator
     * @return {*}
     */
    value: function unwrap( string, value, hash, seperator ) {
      if( hash == null ) { hash = {}; }
      if( seperator == null ) { seperator = '.'; }
      var parts = string.split( seperator );
      var refHash = hash;
      var depth = 0;

      parts.forEach( function( part ) {
        if( depth == parts.length - 1 ) {
          refHash[part] = value;
        } else {
          if( refHash[part] == null ) { refHash[part] = {}; }
          refHash = refHash[part];
        }

        depth++;

      });

      return hash;

    },
    configurable: true,
    enumerable: true,
    writable: true
  },
  inherit: {
    /**
     * Carefully Inherit Properties
     *
     * @param target {Object} Object to add properties to.
     * @param target {Object} Source object.
     * @returns {Object} Extended target.
     */
    value: function inherit( target, source ) {
      target = target || {};
      source = source || {};

      //if( target instanceof source ) {}

      Object.getOwnPropertyNames( source ).forEach( function( key ) {
        if( !target.hasOwnProperty( key ) ) { Object.defineProperty( target, key, Object.getOwnPropertyDescriptor( source, key ) ); }
      });

      return target;

    },
    enumerable: true
  },
  flatten: {
    /**
     * Flatten Array
     *
     */
    value: function flatten( data, options ) {
      data = data || [];
      options = options || { delimiter: '.' };
      var result = [];

      // Flatten Channel Name with Delimiter
      if( data instanceof Array ) {
        data.forEach( function( value ) {
          if( 'string' === typeof value || 'number' === typeof value ) {
            result.push( value );
          }
        });
      }

      result = result.join( options.delimiter );

      // Lowercase
      return result.toLowerCase()

    },
    enumerable: true
  },
  inherit_full: {
    /**
     * Inherit the prototype methods from one constructor into another.
     *
     * Copy of the Node.js util.inherits method.
     *
     * @param {function} target Constructor function which needs to inherit the prototype.
     * @param {function} constructor Constructor function to inherit prototype from.
     */
    value: function inherit_prototype( target, constructor ) {

      target.super_ = constructor;

      target.prototype = Object.create( constructor.prototype, {
        constructor: {
          value: constructor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });

    },
    configurable: true,
    enumerable: true,
    writable: true
  },
  get_constructors: {
    /**
     * Walk up the prototype chain, creating a JSON-Schema-esque structure
     *
     * @param context {Object} The object to walk through.
     * @return {Object} JSON Schema-esque constructor chain.
     */
    value: function get_constructors( context, options ) {
      context = context || {};
      options = options || {};

      var matches = {};
      var path = [];

      do {

        path.push( context.constructor.name );

        Object.defineProperty( matches, context.constructor.name, {
          enumerable: true,
          writable: true,
          value: {
            name: context.constructor.name,
            properties: {
              constructor: {
                type: typeof context.constructor,
                properties: Object.getOwnPropertyNames( context.constructor )
              },
              prototype: {
                type: typeof context.constructor.prototype,
                properties: Object.keys( context.constructor.prototype )
              }
            }
          }
        });

      } while ( context = Object.getPrototypeOf( context ) );


      if( options.format === 'schema' ) {
        return matches || {};
      }

      if( options.delimiter ) {
        return path.join( options.delimiter );;
      }

    },
    configurable: true,
    enumerable: true,
    writable: true
  },
  console_json: {
    /**
     * Prety Print complex objects
     *
     * @param data
     * @param depth
     *
     * @requires lodash
     * @method console_json
     * @return {Object} The first argument.
     */
    value: function console_json( data, depth ) {

      try {

        if( 'string' === typeof data && ( 'object' === typeof depth || 'function' === typeof depth ) ) {
          console.log( "\n" + '===============' + data + ' Properties===============' );
          data = depth;
          depth = arguments[2] || 1
        }

        var output = require( 'util' ).inspect( data, false, 'number' === typeof depth ? ( depth - 1 ) : 1, true );

        console.log( output );

      } catch( error ) { console.error( 'Error with console.json()', error ); }

      return arguments[0];

    },
    configurable: true,
    enumerable: true,
    writable: true
  },
  console_methods: {
    /**
     * Pretty Print and Object's Methods
     *
     * @param data
     * @param object
     *
     * @requires lodash
     * @method console_methods
     * @return {Object} The first argument.
     */
    value: function console_methods( data, object ) {

      try {

        if( 'string' === typeof data && ( 'object' === typeof object || 'function' === typeof object ) ) {
          console.log( "\n" + '===============' + data + ' Methods===============' );
          data = object;
        }

        module.exports.json( _.methods( data ) );

      } catch( error ) { console.error( 'Error with console.methods()', error ); }

      return arguments[0];

    },
    configurable: true,
    enumerable: true,
    writable: true
  },
  generate_hash: {
    /**
     * Generate a unique hash for an Object, using md5 on default.
     *
     * @example
     *
     *    var _hash = Utility.generate_hash({ type: 'some_object', name: 'Bob'});
     *
     *    console.log( _hash ); // -> 147ce3e2ccb7db6b928b303ce42bdafa
     *
     * @param obj {Object} Object to generate a hash for.
     * @param options {Object} options for hash generation.
     * @param options {String} options.type Type of hash to generate, defaulting to md5.
     * @param options {String} options.silent_fail Do not throw errors, return empty string if there was an error when true.
     *
     */
    value: function generate_hash( obj ) {

      var result;
      var string = JSON.stringify( arguments[0] || {} );
      var options = Utility.defaults( arguments[1], {
        type: 'md5',
        silent_fail: true
      });

      try {
        result = require( 'crypto' ).createHash( options.type.toLowerCase() ).update( string ).digest( 'hex' );
      } catch ( error ) {
        result = options.silent_fail ? '' : error;
      }

      return result;

    },
    configurable: true,
    enumerable: true,
    writable: true
  },
  methods: { value: require( 'lodash' ).methods },
  values: { value: require( 'lodash' ).values },
  each: { value: require( 'lodash' ).each },
  toArray: { value: require( 'lodash' ).toArray },
  extend: { value: require( 'lodash' ).extend },
  where: { value: require( 'lodash' ).where },
  if: {
    value: {
      "PlainObject": require( 'lodash' ).isPlainObject,
      "Function": require( 'lodash' ).isFunction,
      "Object": require( 'lodash' ).isObject,
      "String": require( 'lodash' ).isString,
    },
    enumerable: true
  },
  log: {
    /**
     * Output variables to console log.
     *
     * Settings can be configured like so:
     *    abstract.log.config.depth = 2;
     *    abstract.log.config.colors = true;
     *
     * @param {Object|String} data A config object
     * @example
     *      Abstract.log( data )
     *
     * method log
     * @return {Object} Abstract constructor.
     * @chainable
     */
    value: Object.defineProperties( function() {

      var output = {};

      // Capture Event Name
      if( this.event ) {
        output.event = this.event;
      }

      Utility.each( arguments, function( item, key ) {

        if( Utility.if.PlainObject( item ) ) {}

        output[ 'format' ] = typeof item;

        if( key === 0 ) {
          output[ 'data' ] = item;
        } else {
          output[ key ] = item;
        }

      });

      console.log( require( 'util' ).inspect( output, ( Utility ).log.config ) );

      return this;
    }, { "config": { value: { "showHidden": true, "depth": 2, "colors": true }, "writable": true } }),
    enumerable: true
  }
});
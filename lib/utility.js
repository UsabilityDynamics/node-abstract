/**
 * Helper Utility for Abstract
 *
 * @example
 *
 *    // Select specific methods to load
 *    Utility( 'extend', 'unwatch', 'watch' );
 *
 *
 *  Concat will always result in an Array that can be safely joined
 *  [].concat( [ maybe_array ] ).join( '.' );
 *  [].concat( [ maybe_array, 'blah' ] ).join( '.' );
 *
 * @author potanin@UD
 * @date 6/17/13
 */
function Utility() {
  return Object.keys( arguments ) ? require( 'lodash' ).pick.apply( null, [ Utility, Array.prototype.slice.call( arguments ) ] ) : Utility;
}

Object.defineProperties( module.exports = Utility, {
  json: {
    value: {
      /**
       * Safely parse JSON
       *
       * @method parse
       * @for Json
       *
       * @param json
       * @return {parsed|json}
       */
      parse: function( json ) {

        if( Buffer && json instanceof Buffer ) {
          json = json.toString()
        }

        var parsed = false;
        try { parsed = JSON.parse( json ); } catch (e) { parsed = false; }
        return parsed ? parsed : json;
      }
    },
    configurable: false,
    enumerable: true,
    writable: true
  },
  console: {
    value: {
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
      json: function json( data, depth ) {

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
      method: function method( data, object ) {

        try {

          if( 'string' === typeof data && ( 'object' === typeof object || 'function' === typeof object ) ) {
            console.log( "\n" + '===============' + data + ' Methods===============' );
            data = object;
          }

          module.exports.json( _.methods( data ) );

        } catch( error ) { console.error( 'Error with console.methods()', error ); }

        return arguments[0];

      },
      /**
       * Get all Object Keys
       *
       * @param data
       *
       * @method console_keys
       * @return {Object} The first argument.
       */
      keys: function keys( data ) {

        function Iterate( target ) {
          var result = [];
          for( var key in target ) {
            result.push( key );
          }
          return result;
        }

        console.log([ Object.keys( data ) + Object.getOwnPropertyNames( data ) + Iterate( data ) ]);
        return data;
      }
    },
    configurable: false,
    enumerable: true,
    writable: true
  },
  noop: {
    /**
     * Not a function, that's for sure.
     * This method does not accept any arguments.
     */
    value: function noop() {
      console.log( arguments )
    },
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
  mixin: {
    /**
     * Mixin current prototype into target object
     *
     * Honors property descriptor settings, if available.
     *
     * @param source
     * @param target
     */
    value: function mixin( source, target ) {
      source = this.prototype || arguments[0] || {};
      target = arguments.length == 2 ? arguments[1] : arguments[1] || {};

      for( var key in source ) {

        try {
          Object.defineProperty( target, key, Object.getOwnPropertyDescriptor( source, key ) || {
            value: source[key],
            enumerable: false,
            writable: true,
            configurable: true
          });
        } catch( error ) { console.error( error ); }

      }

      return target;

    },
    configurable: true,
    writable: true,
    enumerable: false
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
  constructors: {
    /**
     * Walk up the prototype chain, creating a JSON-Schema-esque structure
     *
     * @param context {Object} The object to walk through.
     * @return {Object} JSON Schema-esque constructor chain.
     */
    value: function constructors( context, options ) {
      context = context || {};
      options = options || {};

      var matches = {};
      var path = [];

      do {

        if( context.constructor ) {
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

        }

      } while ( context = Object.getPrototypeOf( context ) );

      if( options.format === 'schema' ) {
        return matches || {};
      }

      if( options.delimiter ) {
        return path.join( options.delimiter );
      }

      return path;

    },
    configurable: true,
    enumerable: true,
    writable: true
  },
  hash: {
    /**
     * Generate a unique hash for an Object, using md5 on default.
     *
     * @example
     *
     *    var _hash = Utility.hash({ type: 'some_object', name: 'Bob'});
     *
     *    console.log( _hash ); // -> 147ce3e2ccb7db6b928b303ce42bdafa
     *
     * @param obj {Object} Object to generate a hash for.
     * @param options {Object} options for hash generation.
     * @param options {String} options.type Type of hash to generate, defaulting to md5.
     * @param options {String} options.silent_fail Do not throw errors, return empty string if there was an error when true.
     *
     */
    value: function hash( obj ) {

      var result;
      var string = JSON.stringify( arguments[0] || {} );
      var options = Utility.defaults( arguments[1], {
        type: 'md5',
        silent_fail: true,
        random: false
      });

      try {

        if( options.random ) {
          string = Math.random().toString();
        }

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
  auto: { value: require( 'async' ).auto },
  queue: { value: require( 'async' ).queue },
  times: { value: require( 'async' ).times },
  extend: { value: require( 'lodash' ).extend },
  values: { value: require( 'lodash' ).values },
  each: { value: require( 'lodash' ).each },
  toArray: { value: require( 'lodash' ).toArray },
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
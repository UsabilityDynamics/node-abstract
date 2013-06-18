/**
 * Create custom objects and methods by aggregating and abstracting esources.
 *
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
    get: function create( settings ) { return new Abstract( settings ); },
    enumerable: true
  },
  logger: {
    /**
     * Define Logger
     *
     */
    value: {
      log: function log() {},
      error: console.error,
      info: function info() {},
      debug: require( 'debug' )( 'observe' )
    },
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
  absorb: {
    /**
     * Absorb all Properties into Context Object
     *
     * @method merge
     * @chainable
     */
    value: function( object ) {

      for( var key in object ) {
        if( !this[key] ) {
          Object.defineProperty( this, key, { 'value': object[ key ] });
        }
      }

      return this;

    },
    enumerable: true
  },
  Eventify: {
    /**
     * Add Event Handlers to an Object
     *
     * @method eventify
     * @chainable
     */
    value: function( target ) {

      // Enable EventEmitter
      Abstract.absorb( new ( require( 'eventemitter2' ).EventEmitter2)({
        'wildcard': true,
        'delimeter': ':'
      }));

      // Trigger Method on Event
      Abstract.each( Abstract.methods( target ), function( method ) {
        Abstract.on( method, target[ method ] );
      });

      return this;

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

      if( this.event ) {
        output.event = this.event;
      }

      Abstract.each( arguments, function( item, key ) {

        if( Abstract.if.PlainObject( item ) ) {}

        output[ 'format' ] = typeof item;

        if( key === 0 ) {
          output[ 'data' ] = item;
        } else {
          output[ key ] = item;
        }

      })

      console.log( require( 'util' ).inspect( output, ( Abstract ).log.config ) );

      return this;
    }, { "config": { value: { "showHidden": true, "depth": 2, "colors": true }, "writable": true } }),
    enumerable: true
  }
});





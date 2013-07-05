/**
 * Core Tests
 *
 * mocha core --reporter list --ui exports --watch
 *
 * @type {*}
 */
module.exports = {

  "before": function() {
    module.exports.Abstract = require( 'abstract' );
    require( 'should' );
  },

  "Abstract": {

    "can set and store default settings": function() {
      var Abstract = module.exports.Abstract;

      // Set Module Defaults
      Abstract.defaults({
        enumerable: true,
        inheritable: true,
        writable: true,
        configurable: true,
        watched: false,       // User.age is watched.
        delayed: false
      });

      Abstract.defaults().should.have.property( 'configurable', true );

    },

    "can create() new Objects": function() {
      var Abstract = module.exports.Abstract;

      // Create New Object
      var User = Abstract.create( null, {
        name: {
          value: 'User',
          description: 'Model for generating Users.',
          watched: true
        },
        meta: {
          value: {
            age: undefined,
            sex: undefined,
            key: undefined
          },
          description: 'Used for storing majority of user information.'
        },
        identify: {
          value: function identify( say ) { return [ say, this._id, this._type, this._path ]; },
          inheritable: false
        }
      });

      User.should.have.property( '_meta' );
      User.should.have.property( '_id' );
      User.should.have.property( '_type' );
      User.should.have.property( '_path' );
      User.should.have.property( 'identify' );

      //User.identify( 'prefix' ).toString().should.equal([ 'prefix', 'User', 'Abstract', 'Abstract' ].toString());

    },

    "can create() new Objects and inject multiple prototypes into chain.": function( done ) {
      var Abstract = module.exports.Abstract;

      // Create New Object,
      var User = Abstract.create( null, require( 'Faker' ).Helpers.createCard() );

      // Add Async and EventEmitter2
      User.injectPrototype( require( 'async' ) );
      User.injectPrototype( require( 'eventemitter2' ).EventEmitter2.prototype );

      // Set some EE Options
      User.listenerTree = {};
      User.delimiter = ':';
      User.wildcard = true;

      //User.onAny( function( data ) { console.log( this.event, data ? data : '' ); });
      //User.on( 'acquire:*', function( data ) { console.log( 'AQUISITION!', this.event ); });

      User.on( 'acquire:sugar', function() {
        setTimeout( function() { User.emit( 'have:sugar', null, true ); }, 120 );
      });

      User.on( 'acquire:milk', function() {
        setTimeout( function() { User.emit( 'have:milk', null, true ); }, 50 );
      });

      User.on( 'walk:to_car', function() {
        setTimeout( function() { User.emit( 'in:car', null, true ); }, 100 );
      });

      User.auto({
        milk: function( next ) {
          User.emit( 'acquire:milk' );
          User.once( 'have:milk', next );
        },
        sugar: function( next ) {
          User.emit( 'acquire:sugar' );
          User.once( 'have:sugar', next );
        },
        verify_groceries: [ 'milk', 'sugar', function( next ) {
          User.emit( 'walk:to_car' );
          User.once( 'in:car', next );
        }],
        done_shopping: [ 'verify_groceries', function( next ) {
          User.emit( 'shopping:complete' );
          done();
        }]
      });

    }

  }

};

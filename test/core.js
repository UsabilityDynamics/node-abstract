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
          value: function identify( say ) { return [ say, this._id, this._model, this.channel ]; },
          inheritable: false
        }
      });

      User.should.have.property( '_id' );
      User.should.have.property( '_model' );
      User.should.have.property( 'identify' );
      User.should.have.property( 'channel' );

      //User.identify( 'prefix' ).toString().should.equal([ 'prefix', 'User', 'Abstract', 'Abstract' ].toString());

    },

    "event emitter.": function() {

      var abstract = require( 'abstract' );

    }

  }

};

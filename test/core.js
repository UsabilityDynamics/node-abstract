/**
 * Core Tests
 *
 * mocha core --reporter list --ui exports --watch
 *
 * @type {*}
 */

var Abstract = require( '../' );

module.exports = {

  "log": {

    "config can be set via method properties.": function() {
      //Abstract.log.config.depth = 2;
      //Abstract.log( 'one' );
    },

    "is chainable.": function() {
      //Abstract.log( 'one' ).log( 'two' );
    }

  },

  'basic': function() {

    var Abstraction = new Abstract();

    var User = {
      name: 'Andy',
      age: 20,
      sex: 'male',
      alive: true,
      education: {
        undergraduate: 'campbell university',
        graduate: 'webster',
        high_school: 'woodbury high',
        specialties: {
          business: [ 'one', 'two', 'three' ],
          accounting: [ 'advanced', 'quickbooks' ]
        }
      },
      skills: [ 'php', 'jquery' ]
    }

    var Target = Abstraction({
      name: {
        first: Abstraction.get( User, 'name' ),
        last: 'Potanin'
      },
      meta: {
        sex: Abstraction.get( User, 'sex' ),
        age: Abstraction.get( User, 'age' ),
        phone: Abstraction.get( User, 'does.not.exist.phone_number' ),
        specialties: Abstraction.get( User, 'education.specialties' ),

      },
      business: Abstraction.get( User, 'education.specialties.business' ),
      prototype: Abstraction.get( User )
    });

    Target.meta.specialties.strategy = [ 'planning', 'budgeting' ];

    // console.log( Target );
    // console.log( User );

  }
};

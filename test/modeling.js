/**
 * Mocha Test for modeling
 *
 * mocha modeling --reporter list --ui exports --watch
 *
 * @author potanin@UD
 * @date 7/6/13
 * @type {Object}
 */
module.exports = {

  'Abstract Modeling': {

    'can create a class and model': function() {
      var Abstract = require( '../' );
<<<<<<< HEAD

      // Defining the Model Constructor
      var Vehicle = Abstract.Model( function Vehicle( Model ) {

        // Constructor Cache
        Model._cache = {};

        // Constructor Method
        Model.server = function Server() {
          console.log( 'Starting Vehicle Server' );
        }

        // Define Properties to apply to Instances
        Model.properties({
=======
      
      var Vehicle = Abstract.Model( function Vehicle() {

        // Define Prototypal Properties
        this.properties( this.prototype, {
          sell: function sell() {},
          stop: function stop() {},
>>>>>>> ed08c132005b26495a122d8bb24687796f041396
          enable: function enable() {},
          disable: function disable() {}
        });

<<<<<<< HEAD
        // Configure Instances
        Model.Instance( function() {

          // Test if target context already has EE
          if( this._events ) {
            this.emit( 'some_event' );
          }

          // Set ID
          this.id = Abstract.utility.generate_hash( null, { random: true });

          // Create Task Queue nnd worker
          this.queue = require( 'async' ).queue( function( task, callback ) {
            console.log( 'Working...' + task.name);
            setTimeout( function() { callback(); }, 100 );
          }, 1 );

        });

      });

      var BMW = Vehicle.create( function BMW() {
        this.use( require( 'eventemitter2' ).EventEmitter2.prototype );
        this.use( require( 'Faker' ).Address );

        // Send some Work to the Queue
        this.queue.push({ 'name': 'one' });
        this.queue.push({ 'name': 'two' });
        this.queue.push({ 'name': 'three' });
        this.queue.push({ 'name': 'four' });

        // Task queue is free
        this.queue.drain = function() { console.log('all BMW items have been processed'); }

        // Setting Meta
        this.meta.set( 'city', this.city );

        this.should.have.property( 'identity' );
        this.identity.should.have.property( 'id' );
        this.identity.should.have.property( 'type', 'BMW' );
        this.identity.should.have.property( 'path' );
      });

      var Mini = Vehicle.create( function Mini() {
        // this.use( BMW ); // Bugs out on EM later; should probably not use the "use" method to extend?

        // Send some Work to the Queue
        this.queue.push({ 'name': 'two' });
        this.queue.push({ 'name': 'three' });
        this.queue.push({ 'name': 'four' });

        this.queue.drain = function() { console.log( 'All Mini items have been processed' ); }

      });

      var Chevy = Vehicle.create( function Chevy() {
        // Keeping it simple.
      });

      // BMW.identity.path.should.equal( 'Object.Abstract.Vehicle.BMW' ); // EM2 plugging adds an extra "Vehicle" to chain.
      Chevy.identity.path.should.equal( 'Object.Abstract.Vehicle.Chevy' );

      // EM should be available
      BMW.should.have.property( 'on' );
      BMW.should.have.property( 'emit' );

      // Meta lookup should work and match
      BMW.meta.get( 'city' ).should.equal( BMW.city );

      // EM was not used by Chevy
      Chevy.should.not.have.property( 'on' );
      Chevy.should.not.have.property( 'emit' );

=======
      });

      new Vehicle();
      // console.log( Vehicle );

>>>>>>> ed08c132005b26495a122d8bb24687796f041396
    }

  }

};
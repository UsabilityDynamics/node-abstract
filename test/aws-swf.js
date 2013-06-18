/**
 * Test Things
 *
 * clear && mocha eventify --reporter list --ui exports
 *
 * @type {*}
 */
module.exports = {

  "before": function() {
    require( 'mocha' );
    require( 'should' );
  },

  "some_test": {

    "teest": function() {

      var Abstract = require( '../' );
      var _ = require( 'lodash' );
      var AWS = new require( 'aws-sdk' );

      //Abstract.log( AWS );

      AWS.config.update({
        "accessKeyId": "",
        "secretAccessKey": "",
        "region": "us-east-1"
      });

      // This is how the default AWS SDK works.
      var SWF = new AWS.SimpleWorkflow();

      // I don't like theyr naming conventions and I don't like that numbers must be strings
      SWF.client.listWorkflowTypes( {
        "domain": "abstract.test",
        "registrationStatus": "REGISTERED"
      }, function( error, data ) {

        var name = _.find( data.typeInfos, 'workflowType' ).workflowType.name;

        if( name ) {
          name = _.random( 100, 10000 ).toString();
        }

        SWF.client.registerWorkflowType( {
          "name": name,
          "defaultTaskList": { 'name': 'list1' },
          "domain": "abstract.test",
          "version": "1.1"
        }, function( error, data ) {

          SWF.client.startWorkflowExecution( {
            "workflowType": {
              "name": name,
              "version": "1.1"
            },
            "taskList": { 'name': 'list1' },
            "executionStartToCloseTimeout": '2000',
            "taskStartToCloseTimeout": '2000',
            "input": JSON.stringify( { "saf": "asdf" } ),
            "domain": 'abstract.test',
            "childPolicy": 'TERMINATE',
            "workflowId": '10'
          }, function( error, data ) {

            // I hate using callbacks because they making the core hard to follow

            // I hate catching errors even more
            if( error ) {
              console.error( error );
            }

            // logic goes here

          } );

        } );

      } );

      // The "Abstraction" module creates a new object/module referencing other objects
      var Activity = new Abstract({
        "describe": {

          // We want this method to call the SWF.describeActivityType function
          "call": SWF.describeActivityType,

          // Container for any specific configuration, the "no_errors" is just an example and is not needed right away
          "settings": {
            "no_errors": true,
            "enumerable": true
          },

          // Here we configure the function's arguments
          "parameters": {

            // We use "options" as the firat argument, which simply maps things around and sets some default values
            "options": {
              "name": { "target": "activityType.name" },
              "version": { "target": "activityType.version", "convert": "Number" },
              "domain": { "target": "domain", "default": 'Veneer.cluster.name' } // Not sure of best way to define dynamic values
            },

            // The second argument is a callback, we want to add some rules here also
            "callback": {

              // We want to eventify the callback (see below for usage)
              "eventify": true,

              // We want to add some special rules to the arguments. Rules are applied in order.
              "parameters": {
                "error": { "transform": {} } // Ability to apply transofrmation to callback parameters. (future)
                // The second "data" argument is not mentioned, which means it should be left as is
              }

            }
          }
        },

        // Here we declare another property
        "view": {

          // We want to map "view" over to the request module
          "call": require( 'request' ),

          "parameters": {

            // We pre-configure all parameters in this case
            "options": {
              "url": "http://someapi.com/get/some/data",
              "method": "get",
              "qs": { "id": "whatever" }
            },

            // We eventify the callback but leave all the callback arguments as they are.
            // The events should either be "error" or "success", based on the standard usage of the first argument.
            "callback": {
              "eventify": true
            }

          }

        }

      });

      // The method is now accessible via a different scope and configuration is much simpler
      //Activity.describe({ "name": "Test", "version": 1.0 }).on( 'success', console.log );

      // The view method doesn't require any additional parameters for it to make a request, so its usage is even simpler
      //Activity.view().on( 'success', console.json );

      // Using Events we can setup logic like this - where we catch all errors at a later point
      //Activity.on( '**.error', console.error );


    }

  }

};

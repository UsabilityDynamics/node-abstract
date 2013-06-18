# Abstract.js
Create JavaScript objects by incorporating methods and properties from abstract resources.

  - creating virtualized objects
  - easily wrap methods with EventEmitter events for handling callbacks
  - attach listener functions to multiple events
  
## Basic Usage

        // Require Module
        Abstract = require( 'abstract' );
        
        // Our Custom Context
        var context = {
          logger: console        
        };
        
        // Create Instance with custom context
        Abstract.create( context, function() {
          
          this.data = {
            pid: this.Query( process, 'eng.pid' ),
            id: this.Query( module, 'parent.id' )
          }
          
          // Wrap "async.auto" into Event Emitter tags
          this.auto = this.Eventify( require( 'async' ).auto );
          
          // Wrap all "request" methods into Event Emitter tags            
          this.request = this.Evenity( require( 'request' ) )
        
        });
        
        // Trigger requests
        context.emit( 'request:get', 'http://google.com' ).on( 'success', console.log );
        context.emit( 'request:get', 'http://yahoo.com' ).on( 'success', console.log );
        
        // Create async.auto() method, wrapped with EE events
        context.auto({
          'step1': function() {},
          'step2': [ 'step1', function() {}
        }).on( 'error', console.error ).on( 'success', console.log );
        
        // Bind to any request 
        context.on( 'request:*:complete', function() {
          console.log( 'Request complete', this.event );
        });
        
        // Monitor all errors
        context.on( '**:error', console.error );


## License

(The MIT License)

Copyright (c) 2013 Usability Dynamics, Inc. &lt;info@usabilitydynamics.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

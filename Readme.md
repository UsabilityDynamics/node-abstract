Abstract.js
-----------
-WIP-

Basic Usage
===========

    // Require Module
    var TCP_Proxy = require( 'abstract' ).createModel( TCP_Proxy( self ) {


    });

    new TCP_Proxy( 7000, 8000, function( data ) {
      console.log( data );
    });

    new TCP_Proxy( 7000, 8000, function( data ) {
      console.log( data );
    });

Module Methods
==============

    - Abstract.createModel( [fn] ):
    - Abstract.create( prototype, properties ) adds helper methods: extend, include, destroy
    - Abstract.defineProperty( target, property, descriptor ) Add single property.
    - Abstract.defineProperties( target, properties ) Add multiple properties.
    - Abstract.addPrototype( target, prototype ) Insert prototype into chain.

Model Factory Methods
=====================

    - this.set( key, value ): Set Model setting, can be used to configure defaults since Model settings are inherited by Instances.
    - this.get( key ): Get a model setting.
    - this.defineInstance( [fn] ):

Instance Factory Methods
========================
The following methods are available for use within the Constructor method

    - this.set( key, value ):
    - this.get( key ):
    - this.module( module ): Bind the context to the module object.
    - this.use( prototype ): Inject external functionality into the context. Uses Abstract.addPrototype within context.
    - this.extend( some_object ): Extend some object into current context.

Property Descriptor Options
===========================
The following properties are available when defining a property.
All the native Object properties perform as before, functionality is only extended.
If "constructor" property exists in the description and is a function, it will be called when a module is initialized.

    - value:
    - get:
    - set:
    - configurable:
    - enumerable:
    - writable:

    - properties:
    - description:
    - inheritable:
    - watch:

## Instance Meta
Meta information regarding the instance is stored within the _meta property.

    - id: A random hash is generated.
    - model: Should be declared, otherwise will attempt to determine based on constructors.
    - path:
    - schema: Generates from description properties.

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

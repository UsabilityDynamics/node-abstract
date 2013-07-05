# Abstract.js
Simplify and abstract Module and Model creation.

## Constructor Methods

    - Abstract.create( proto, properties ) adds helper methods: extend, include, destroy
    - Abstract.defineProperty( obj, prop, descriptor )
    - Abstract.defineProperties( obj, props )

## Descriptor Properties
The following properties are available when defining a property.
All the native Object properties perform as before, functionality is only extended.
If "constructor" property exists in the description and is a function, it will be called when a module is initialized.

    - value
    - configurable
    - enumerable
    - writable
    - properties
    - description
    - inheritable
    - watch

An Object's __proto__ property may be defined via defineProperty() / defineProperties()

## Namespaces
Each Module and Instance must have a unique name which will be used to establish namespace and path. Name will be generated from constructor's name if not specified.

## Instance Meta
Meta information regarding the instance is stored within the _meta property.

    - _id - A random hash is generated.
    - _type - Should be declared, otherwise will attempt to determine based on constructors.
    - schema - Generates from description properties.

## Basic Usage

    // Require Module
    Abstract = require( 'abstract' );

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

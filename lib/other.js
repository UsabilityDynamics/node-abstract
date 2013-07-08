/**
 * -
 *
 * -
 *
 * @author potanin
 * @date 7/6/13
 */
module.exports = {
  spawn: {
    /**
     * Start Context in another Worker
     *
     * @experimental
     */
    value: function spawn() {},
    configurable: true,
    enumerable: true,
    writable: true
  },
  build: {
    /**
     * Generate Standalone JavaScript for browser integration
     *
     * The result is not cached and is expected that the rendering engine does the caching.
     *
     * @param options
     * @returns {String}
     */
    value: function build( options ) {
      var script = '';
      // read this file
      // include dependencies
      // minify
      return script;
    },
    configurable: true,
    enumerable: false,
    writable: true
  },
  addPrototype: {
    /**
     * Allow Prototype useage method to be ran in custom context for static calls
     *
     * @returns {Function}
     */
    get: function() {
      return function( context, proto ) {
        return Abstract.prototype.use.call( context, proto );
      }
    },
    configurable: false,
    enumerable: true
  }
}

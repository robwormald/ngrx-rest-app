require('core-js');
require('zone.js');

var testContext = require.context('./client', true, /\.spec\.ts/);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

var modules = requireAll(testContext);

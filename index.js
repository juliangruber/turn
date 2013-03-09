var through = require('through');
var falafel = require('falafel');

module.exports = function (file) {
  var data = '';
  var opts = {
    isKeyword: function (kw) {
      if (kw === 'import') return true;
    },
    tolerant: true
  };
  return through(write, end);

  function write (buf) { data += buf }
  function end () {
    var src = falafel(data, opts, function (node) {
      if (node.type === 'UnaryExpression' && node.operator === 'import') {
        node.update('require(' + node.argument.source() + ')');
      }
      if (node.type === 'ReturnStatement' && inRoot(node)) {
        node.update('return module.exports=' + node.argument.source() + ';');
      }
    });
    var wrapped = ';(function(){' + src + '})();'
    this.queue(wrapped);
    this.queue(null);
  }
};

function inRoot (node) {
  // add an extra level because
  // of the anonymous wrapper
  return !(node.parent.parent && node.parent.parent.parent);
}

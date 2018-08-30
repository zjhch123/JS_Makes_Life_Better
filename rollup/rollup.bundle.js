'use strict';

String.prototype.tr = function () {
  console.log(1);
};

function add(a, b) {
  return a + b;
}

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Clazz = function () {
  function Clazz() {
    _classCallCheck(this, Clazz);

    this.name = 'Clazz';
  }

  _createClass(Clazz, [{
    key: 'getName',
    value: function getName() {
      return this.name;
    }
  }]);

  return Clazz;
}();

function main () {
  console.log(add(1, 2));
}

module.exports = main;

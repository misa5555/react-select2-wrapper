'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _shallowEqualFuzzy = require('shallow-equal-fuzzy');

var _shallowEqualFuzzy2 = _interopRequireDefault(_shallowEqualFuzzy);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('select2');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var namespace = 'react-select2-wrapper';

var Select2 = function (_Component) {
  _inherits(Select2, _Component);

  function Select2(props) {
    _classCallCheck(this, Select2);

    var _this = _possibleConstructorReturn(this, (Select2.__proto__ || Object.getPrototypeOf(Select2)).call(this, props));

    _this.el = null;
    return _this;
  }

  _createClass(Select2, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initSelect2();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.el) {
        this.setValue(this.prepareValue(nextProps.value, this.props.defaultValue));
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      if (!(0, _shallowEqualFuzzy2.default)(prevProps.data, this.props.data)) {
        this.destroySelect2(false);
        this.initSelect2(false);
      } else {
        var options = this.props.options;

        if (!(0, _shallowEqualFuzzy2.default)(prevProps.options, options)) {
          this.el.select2(this.prepareOptions(options));
        }
      }

      var handlerChanged = function handlerChanged(e) {
        return prevProps[e[1]] !== _this2.props[e[1]];
      };

      if (this.props.events.some(handlerChanged)) {
        this.detachEventHandlers();
        this.attachEventHandlers();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.destroySelect2();
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      var elVal = this.props.multiple ? this.el.val() || [] : this.el.val();
      if (!(0, _shallowEqualFuzzy2.default)(elVal, value)) {
        this.el.val(value).trigger('change');
      }
    }
  }, {
    key: 'prepareValue',
    value: function prepareValue(value, defaultValue) {
      var issetValue = typeof value !== 'undefined' && value !== null;
      var issetDefaultValue = typeof defaultValue !== 'undefined';

      if (!issetValue && issetDefaultValue) {
        return defaultValue;
      }
      return value;
    }
  }, {
    key: 'prepareOptions',
    value: function prepareOptions(options) {
      var opt = options;
      if (typeof opt.dropdownParent === 'string') {
        opt.dropdownParent = (0, _jquery2.default)(opt.dropdownParent);
        if (!options.dropdownParent.length) {
          delete options.dropdownParent;
        }
      }
      return opt;
    }
  }, {
    key: 'initSelect2',
    value: function initSelect2() {
      var withCallbacks = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      if (this.el) {
        return;
      }
      var _props = this.props;
      var defaultValue = _props.defaultValue;
      var value = _props.value;
      var options = _props.options;


      this.el = (0, _jquery2.default)(_reactDom2.default.findDOMNode(this));
      this.el.select2(this.prepareOptions(options));

      if (withCallbacks) {
        this.attachEventHandlers();
      }

      if (typeof defaultValue === 'undefined' && typeof value !== 'undefined') {
        this.setValue(value);
      }
    }
  }, {
    key: 'destroySelect2',
    value: function destroySelect2() {
      var withCallbacks = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      if (!this.el) {
        return;
      }

      if (withCallbacks) {
        this.detachEventHandlers();
      }

      this.el.select2('destroy');
      this.el = null;
    }
  }, {
    key: 'attachEventHandlers',
    value: function attachEventHandlers() {
      var _this3 = this;

      this.props.events.forEach(function (event) {
        if (typeof _this3.props[event[1]] !== 'undefined') {
          _this3.el.on(event[0], _this3.props[event[1]]);
        }
      });
    }
  }, {
    key: 'detachEventHandlers',
    value: function detachEventHandlers() {
      var _this4 = this;

      this.props.events.forEach(function (event) {
        if (typeof _this4.props[event[1]] !== 'undefined') {
          _this4.el.off(event[0]);
        }
      });
    }
  }, {
    key: 'isObject',
    value: function isObject(value) {
      var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
      return type === 'function' || value && type === 'object' || false;
    }
  }, {
    key: 'makeOption',
    value: function makeOption(item, k) {
      if (this.isObject(item)) {
        var id = item.id;
        var text = item.text;

        var itemParams = _objectWithoutProperties(item, ['id', 'text']);

        return _react2.default.createElement(
          'option',
          _extends({ key: 'option-' + k, value: id }, itemParams),
          text
        );
      }

      return _react2.default.createElement(
        'option',
        { key: 'option-' + k, value: item },
        item
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _props2 = this.props;
      var data = _props2.data;
      var value = _props2.value;

      var props = _objectWithoutProperties(_props2, ['data', 'value']);

      delete props.options;
      delete props.events;
      delete props.onOpen;
      delete props.onClose;
      delete props.onSelect;
      delete props.onChange;
      delete props.onUnselect;

      return _react2.default.createElement(
        'select',
        props,
        data.map(function (item, k) {
          if (_this5.isObject(item) && _this5.isObject(item.children)) {
            var children = item.children;
            var text = item.text;

            var itemParams = _objectWithoutProperties(item, ['children', 'text']);

            return _react2.default.createElement(
              'optgroup',
              _extends({ key: 'optgroup-' + k, label: text }, itemParams),
              children.map(function (child, k2) {
                return _this5.makeOption(child, k + '-' + k2);
              })
            );
          }
          return _this5.makeOption(item, k);
        })
      );
    }
  }]);

  return Select2;
}(_react.Component);

Select2.propTypes = {
  defaultValue: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.array, _react.PropTypes.string]),
  value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.array, _react.PropTypes.string]),
  data: _react.PropTypes.array,
  events: _react.PropTypes.array,
  options: _react.PropTypes.object,
  multiple: _react.PropTypes.bool,
  onOpen: _react.PropTypes.func,
  onClose: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  onChange: _react.PropTypes.func,
  onUnselect: _react.PropTypes.func
};
Select2.defaultProps = {
  data: [],
  events: [['change.' + namespace, 'onChange'], ['select2:open.' + namespace, 'onOpen'], ['select2:close.' + namespace, 'onClose'], ['select2:select.' + namespace, 'onSelect'], ['select2:unselect.' + namespace, 'onUnselect']],
  options: {},
  multiple: false
};
exports.default = Select2;
module.exports = exports['default'];
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.BaconReactMixin=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var Bacon = window.Bacon || _dereq_('baconjs');
var _ = window._ || _dereq_('underscore');

module.exports = BaconReactMixin = function(context) {

  var values = Bacon.combineTemplate(context);

  var initialValues = null;
  values.take(1).onValue(function(_initialValues) {
    initialValues = _initialValues;
  });

  if (!initialValues) {

    var keysWithInitialValues = [];
    _.each(context, function(value, key) {
        if (value instanceof Bacon.Observable) {
          value.take(1).onValue(function() {
            keysWithInitialValues.push(key);
          });
        } else {
          keysWithInitialValues.push(key);
        }
    });

    console.warn(
      "Missing values:",
      _.difference(_.keys(context), keysWithInitialValues));
    throw "Need initial values for all properties";
  }

  return {
    getInitialState: function() {return initialValues;},
    componentDidMount: function() {
      this.unsubscribe = values.onValue(this.setState.bind(this));
    },
    componentWillUnmount: function() {
      this.unsubscribe();
    }
  };

};


},{"baconjs":"wY/X68","underscore":"ZKusGn"}]},{},[1])
(1)
});
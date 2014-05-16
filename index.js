var Bacon = require('baconjs');
var _ = require('underscore');

module.exports = BaconReactMixin = function(context) {

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

  var values = Bacon.combineTemplate(context);

  var initialValues = null;
  values.take(1).onValue(function(_initialValues) {
    var initialValues = _initialValues;
  });

  if (!initialValues) {
    console.warn(
      "Missing values:",
      _.difference(_.keys(context), keysWithInitialValues));
    throw "Need initial values for all properties";
  }

  return {
    getInitialState: function() {return initialValues;},
    componentDidMount: function() {
      this.unsubscribe = values.onValue(this.replaceState.bind(this));
    },
    componentWillUnmount: function() {
      this.unsubscribe();
    }
  };

};


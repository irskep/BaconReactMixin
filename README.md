# BaconReactMixin

`BaconReactMixin` sets component state from [Bacon.js](1) observables. It
depends on [React.js](2), [underscore.js](3), and Bacon.js.

[1]: https://github.com/baconjs/bacon.js
[2]: https://facebook.github.io/react/
[3]: http://underscorejs.org/

## Installation

`BaconReactMixin` can be installed as an npm package or with a `<script>` tag.

```sh
npm install BaconReactMixin
```

```html
  <script src="BaconReactMixin.js"></script>
```


## Usage

`BaconReactMixin({key: property})` returns a mixin that sets `state[key]`
on the component whenever `property` is updated.

You can also use streams, as long as a value is delivered to the stream before
the component is rendered.

## Example

```html
<html>
  <head><title>BaconReactMixin demo</title></head>

  <!-- component is rendered here -->
  <div id="content"></div>

  <!-- include react, underscore, and Bacon -->
  <script src="//fb.me/react-0.10.0.min.js"></script>
  <script
    src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js">
  </script>
  <script
    src="//cdnjs.cloudflare.com/ajax/libs/bacon.js/0.7.10/bacon.min.js">
  </script>
  <script src="BaconReactMixin.js"></script>

  <script>
    // update the date every second
    var date = Bacon.fromPoll(
      1000, function() { return new Date(); }).toProperty(new Date());

    // simple component that renders date's value
    var DateView = React.createClass({
      mixins: [BaconReactMixin({date: date})],
      render: function() {
        return React.DOM.div(null, "Date: " + this.state.date);
      }
    })

    // put the component in the page
    React.renderComponent(DateView(), document.getElementById("content"));
  </script>
</html>
```

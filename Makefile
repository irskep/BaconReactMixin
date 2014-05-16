# to use, first
# sudo npm install -g browserify
BaconReactMixin.js: index.js
	browserify index.js -o BaconReactMixin.js -s BaconReactMixin -x baconjs -x underscore

clean:
	rm BaconReactMixin.js

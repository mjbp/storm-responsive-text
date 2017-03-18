# Storm Responsive Text

[![Build Status](https://travis-ci.org/mjbp/storm-responsive-text.svg?branch=master)](https://travis-ci.org/mjbp/storm-responsive-text)
[![codecov.io](http://codecov.io/github/mjbp/storm--responsive-text/coverage.svg?branch=master)](http://codecov.io/github/mjbp/storm-responsive-text?branch=master)
[![npm version](https://badge.fury.io/js/storm-responsive-text.svg)](https://badge.fury.io/js/storm-responsive-text)

Sets font-size of a single word/number to fit the full width of parent container. Use with caution to avoid reflow issues.

## Example
[https://mjbp.github.io/storm-responsive-text](https://mjbp.github.io/storm-responsive-text)

## Usage
HTML
```
<span class="js-fit">...</span>
```

JS
```
npm i -S storm-responsive-text
```
either using es6 import
```
import ResponsiveText from 'storm-responsive-text';

ResponsiveText.init('.js-fit');
```
asynchronous browser loading (use the .standalone version in the /dist folder) using the global name (Storm + capitalised package name)
```
import Load from 'storm-load';

Load('{{path}}/storm-responsive-text.standalone.js')
    .then(() => {
        StormResponsiveTextinit('.js-fit');
    });
```

## Options
```
{
	fittedClassName: 'is--fitted',
	minFontSizePx: null,
	maxFontSizePx: 528
}
```

## Tests
```
npm run test
```

## Browser support
This is module has both es6 and es5 distributions. The es6 version should be used in a workflow that transpiles.

The es5 version depends unpon Object.assign, element.classList, and Promises so all evergreen browsers are supported out of the box, ie9+ is supported with polyfills. ie8+ will work with even more polyfils for Array functions and eventListeners.

## Dependencies
None

## License
MIT

## Credit
Developed from an initial fork of (BigText)[https://github.com/zachleat/BigText]
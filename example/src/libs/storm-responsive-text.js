import throttle from 'lodash.throttle';

const defaults = {
	selector: '.js-fit',
	fittedClassName: 'is--fitted',
	minFontSizePx: null,
	maxFontSizePx: 528
};


const wholeNumberFontSizeOnly = () => {
	if(!('getComputedStyle' in window)) return;
	
	let testDiv = (() => {
			let tmp = document.createElement('div');
			tmp.style = {
				position: 'absolute',
				fontSize: '14.1px'
			};
			return document.body.appendChild(tmp);
		})(),
		computedStyle = window.getComputedStyle(test[0], null);

	return (() => {
		let isWhole = computedStyle && computedStyle.getPropertyValue( 'font-size' ) === '14px'; 
		document.body.removeChild(testDiv);
		return isWhole;
	})();
};

const testLineDimensions = (element, maxWidth, property, size, interval, units, previousWidth) => {
	let width;

	previousWidth = typeof previousWidth === 'number' ? previousWidth : 0;
	element.style[property] = size + units;
	width = element.offsetWidth;
	
	if(width >= maxWidth) {
		element.style[property] = '';

		if(width === maxWidth) {
			return {
				match: 'exact',
				size: parseFloat((parseFloat(size) - 0.1).toFixed(3))
			};
		}

		let under = maxWidth - previousWidth,
			over = width - maxWidth;

		return {
			match: 'estimate',
			size: parseFloat((parseFloat(size) - (property === 'word-spacing' && previousWidth && ( over < under ) ? 0 : interval)).toFixed(3))
		};

	}

	return width;

};

const calculateSizes = (node, maxWidth, maxFontSizePx, minFontSizePx) => {
	let fontSize,
		wordSpacing = 0;
	
	node.style.float = 'left';

	let intervals = wholeNumberFontSizeOnly ? [8, 4, 1] : [8, 4, 1, 0.1],
		lineMax,
		newFontSize,
		autoGuessSubtraction = 32,
		currentFontSize = parseFloat(window.getComputedStyle(node, null)['font-size']),
		ratio = (node.clientWidth/currentFontSize ).toFixed(6);
	
	newFontSize = (parseInt(maxWidth/ratio, 10) - autoGuessSubtraction) > 2 ? (parseInt(maxWidth/ratio, 10) - autoGuessSubtraction) : 2;

	outer: 
	for(var m=0, n=intervals.length; m<n; m++) {
		inner: 
		for(var j=1, k=10; j<=k; j++) {
			if(newFontSize + j*intervals[m] > maxFontSizePx) {
				newFontSize = maxFontSizePx;
				break outer;
			}

			lineMax = testLineDimensions(node, maxWidth, 'font-size', newFontSize + j*intervals[m], intervals[m], 'px', lineMax);
			if(typeof lineMax !== 'number') {
				newFontSize = lineMax.size;

				if(lineMax.match === 'exact') {
					break outer;
				}
				break inner;
			}
		}
	}

	ratio = maxWidth / newFontSize;

	if(newFontSize > maxFontSizePx) {
		fontSize = maxFontSizePx;
	}else if(!!minFontSizePx && newFontSize < minFontSizePx) {
		fontSize = minFontSizePx;
	} else {
		fontSize = newFontSize;
	}


	let interval = 1,
		maxWordSpacing;

	node.style.fontSize = fontSize + 'px';
	
	for(m=1, n=3; m<n; m+=interval) {

		maxWordSpacing = testLineDimensions(node, maxWidth, 'word-spacing', m, interval, 'px', maxWordSpacing);
		if(typeof maxWordSpacing !== 'number') {
			wordSpacing = maxWordSpacing.size;
			break;
		}
	}

	node.style.fontSize = '';
	node.style.float = 'none';

	return {
		fontSize,
		wordSpacing,
		ratio
	};
};

const getInnerWidth = node => node.offsetWidth - (+(window.getComputedStyle(node, null)['paddingLeft']).split('px').join('') + +(window.getComputedStyle(node, null)['paddingRight']).split('px').join(''));

const StormResponsiveText = {
	init(){
		this.throttledResize = throttle(this.setSize, 16);
		window.addEventListener('resize', this.throttledResize.bind(this));
		
		this.setSize();
		return this;
	},
	setSize(){
		let sizes = calculateSizes(this.node, getInnerWidth(this.node.parentNode), this.settings.maxFontSizePx, this.settings.minFontSizePx);
		Object.assign(this.node.style, {
			whiteSpace: 'normal',
			fontSize: `${sizes.fontSize}px`,
			wordSpacing: `${sizes.wordSpacing}px`
		});
		this.node.classList.add(this.settings.fittedClassName);
	}
};

const init = (sel, opts) => {
	let els = [].slice.call(document.querySelectorAll(sel));
	
	if(!els.length) return;

	return els.map(el => {
		return Object.assign(Object.create(StormResponsiveText), {
			node: el,
			settings: Object.assign({}, defaults, opts)
		}).init();
	});
};

export default { init };
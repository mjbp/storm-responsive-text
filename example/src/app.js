import Load from 'storm-load';

const onLoadTasks = [() => {

	Load('./js/storm-responsive-text.standalone.js')
		.then(() => {
			let responseText = StormResponsiveText.init('.js-fit');
			// let wall = StormWall.init('.js-wall-row');
		});
}];

if('addEventListener' in window) window.addEventListener('load', () => { onLoadTasks.forEach((fn) => fn()); });
import should from 'should';
import 'jsdom-global/register';
import ResponsiveText from '../dist/storm-responsive-text';

const html = `<div style="width:50%;background:lightgray;padding:25px;margin:50px auto;">
		   <div class="js-fit">50%</div>
	   </div>`;

document.body.innerHTML = html;

let ResponsiveTextItem = ResponsiveText.init('.js-fit');

describe('Initialisation', () => {
  it('should return an object with the correct properties', () => {
      should(ResponsiveTextItem)
        .Array()
        .and.have.lengthOf(1);
    });
  //return array of objects

});

describe('Sets size', () => {
  //test sizes objects
  //test node style object
  //test node classList
});
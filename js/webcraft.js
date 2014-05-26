//loop tools
var Loop = org.dbyzero.tools.Loop;

//global vars
var FPS = 60;
var delay = 0; //0 = infinite
var selectorCss = '.chick';
var containerCss = '#main > header';
var maxChick = 100;
var lastUpdate = currentTime = new Date().getTime();
var dt,domChick,nbrChick,classOriented,randVar,elem;
var px,py,vx,vy,ax,ay;


//make a chick on the page
var makeChick = function() {
	nbrChick = $(selectorCss).length;
	if(nbrChick < maxChick) {
		domChick = $("<div class=\"chick\"/>");

		randVar = parseInt(Math.random() * 980);
		domChick.css('transform','translate('+parseInt(randVar)+'px,88px)');
		domChick.attr('data-px',randVar);
		domChick.attr('data-py',88);
		domChick.attr('data-vx',((randVar % 2) === 0) ? -150 : 150);
		domChick.attr('data-vy',-450);
		domChick.attr('data-ax',0);
		domChick.attr('data-ay',1000);

		classOriented = ((randVar % 2) === 0) ? 'chick-walking-left' : 'chick-walking-right';
		domChick.addClass(classOriented);

		$(containerCss).append(domChick);
	}
}

var updateChicks = function() {
	currentTime = new Date().getTime();
	dt = currentTime - lastUpdate;
	$(selectorCss).each(function(index,element){
		$elem = $(element);
		px = parseInt($elem.attr('data-px'));
		py = parseInt($elem.attr('data-py'));
		vx = parseInt($elem.attr('data-vx'));
		vy = parseInt($elem.attr('data-vy'));
		ax = parseInt($elem.attr('data-ax'));
		ay = parseInt($elem.attr('data-ay'));

		vx += parseInt((ax * dt)/1000);
		vy += parseInt((ay * dt)/1000);
		px += parseInt((vx * dt)/1000);
		py += parseInt((vy * dt)/1000);

		//touch plateforme
		if(py > 150-40-22 && px > -20 && px < 1000) {
			vy *= -0.9;
			py = 150-40-22;
		}

		//out of screen
		if(py > $(window).height() -22) {
			$elem.remove();
			return true;
		}
		if($elem.attr('offsetLeft') < 0 || $elem.attr('offsetLeft') > $(window).width() -20) {
			$elem.remove();
			return true;
		}

		$elem.attr('data-px',px);
		$elem.attr('data-py',py);
		$elem.attr('data-vx',vx);
		$elem.attr('data-vy',vy);
		$elem.attr('data-ax',ax);
		$elem.attr('data-ay',ay);

		$elem.css('transform','translate('+px+'px,'+py+'px)');

		lastUpdate = currentTime;
	});
}

//start da univerrrrrse !!!
$(document).ready(function(){

	var mainLoop = new Loop('main loop',1000/FPS,delay);
	mainLoop.start(
		function(){
			updateChicks();
			makeChick();
		}
	);
});
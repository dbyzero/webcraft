$(document).ready(function(){

	//tools 
	var Loop = org.dbyzero.tools.Loop;
	var KeyController = org.dbyzero.tools.KeyboardController;

	//parameters
	var FPS = 60;
	var delay = 0; //0 = infinite
	var chickHeight = 22;
	var chickWidth = 20;
	var chickSpeedX = 150;
	var chickSpeedY = -450;
	var gravity = 1000;
	var wind = 0;
	var chickByLoop = 6;
	var maxChick = 300;
	var chickZeroPx = 227;
	var chickZeroVx = 100;

	//domVar
	var selectorCss = '.chick';
	var containerCss = '#main > header';

	//size
	var headerHeight = $('header').height();
	var menuHeight = $('header > menu').height();
	var websiteWidth = $('#main').width();
	var windowHeight = $(window).height();

	//used in process
	var currentTime = new Date().getTime();
	var lastUpdate = currentTime;
	var dt, domChick, nbrChick, classOriented, randVar, $elem, id, i, chick;
	var chickIterator = 0;
	var listChicks = new Array();
	var invasionRunning = false;
	var $chickZero = $('.chick-zero');

	//make a chick on the page
	var makeChick = function() {
		for(i = 0; i < chickByLoop; i++) {
			nbrChick = $(selectorCss).length;
			if(nbrChick < maxChick) {
				id = chickIterator++;
				domChick = $("<div class=\"chick\" id=\"chick-"+id+"\"/>");

				randVar = parseInt(Math.random() * (websiteWidth - chickWidth));
				domChick.css('transform','translate('+parseInt(randVar)+'px,88px)');

				listChicks.push({
					'id':id,
					'px':randVar,
					'py':headerHeight-menuHeight-chickHeight,
					'vx':((randVar % 2) === 0) ? -chickSpeedX : chickSpeedX,
					'vy':chickSpeedY,
					'ax':wind,
					'ay':gravity
				})

				classOriented = ((randVar % 2) === 0) ? 'chick-walking-left' : 'chick-walking-right';
				domChick.addClass(classOriented);

				$(containerCss).append(domChick);
			}
		}
	}

	var updateChicks = function() {
		currentTime = new Date().getTime();
		dt = currentTime - lastUpdate;

		for (i in listChicks) {
			chick = listChicks[i];
			chick['vx'] += parseInt((chick['ax'] * dt)/1000);
			chick['vy'] += parseInt((chick['ay'] * dt)/1000);
			chick['px'] += parseInt((chick['vx'] * dt)/1000);
			chick['py'] += parseInt((chick['vy'] * dt)/1000);

			//touch plateforme
			if(chick['py'] > headerHeight-menuHeight-chickHeight && chick['px'] > -chickWidth && chick['px'] < websiteWidth) {
				chick['vy'] *= -0.9;
				chick['py'] = headerHeight-menuHeight-chickHeight;
			}

			//out of screen
			$elem = $('#chick-'+chick['id']);
			if(chick['py'] > windowHeight) {
				$elem.remove();
				listChicks.splice(i, 1);
				continue;
			}
			//if($elem.attr('offsetLeft') < 0 || $elem.attr('offsetLeft') > $(window).width() -chickWidth) {
			//	$elem.remove();
			//	listChicks.splice(i, 1);
			//	continue;
			//}

			$elem.css('transform','translate('+chick['px']+'px,'+chick['py']+'px)');
		};
		lastUpdate = currentTime;
	}

	//start da univerrrrrse !!!
	var chicksLoop = new Loop('main loop',1000/FPS,delay);
	var mainLoopFn = function(){
			updateChicks();
			makeChick();
	}
	var mainLoopStart = function(){
			invasionRunning = true;
			$chickZero.hide();
			$('body').css('overflow','hidden');
			chicksLoop.start(mainLoopFn);
	}
	var mainLoopStop = function(){
			chicksLoop.stop();
			invasionRunning = false;
			$chickZero.show();
			$('body').css('overflow','auto');
			$(selectorCss).remove();
	}

	KeyController.addManagedKey(KeyController.keys.SPACE);
	$(document).on('org.dbyzero.tools.KeyboardController.keyPressed.'+KeyController.keys.SPACE,function(e){
		if(invasionRunning){
			mainLoopStop();
		} else {
			mainLoopStart();
		}
		e.preventDefault();
		return false;
	})

	//Manage of the first chicken
	$chickZero.click(function(e){
		mainLoopStart();
		e.preventDefault();
	})
	var chickZeroLoop = new Loop('chick zero loop',1000/FPS,delay);
	var chickenZeroLoopFn = function(){
		if(invasionRunning === false) {
			currentTime = new Date().getTime();
			dt = currentTime - lastUpdate;
			chickZeroPx += parseInt((chickZeroVx * dt)/1000);
			if((chickZeroPx + chickWidth) > websiteWidth) {
				chickZeroPx = websiteWidth - chickWidth;
				chickZeroVx *= -1;
				$chickZero.removeClass('chick-zero-walking-right');
				$chickZero.addClass('chick-zero-walking-left');
			}
			if((chickZeroPx) < 0) {
				chickZeroPx = 0;
				chickZeroVx *= -1;
				$chickZero.removeClass('chick-zero-walking-left');
				$chickZero.addClass('chick-zero-walking-right');
			}
			$chickZero.css('transform','translate('+parseInt(chickZeroPx)+'px,'+(headerHeight-menuHeight-chickHeight)+'px)');
			lastUpdate = currentTime;
		}
	}
	chickZeroLoop.start(chickenZeroLoopFn);
});

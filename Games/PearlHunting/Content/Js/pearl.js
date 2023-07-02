// V.1.6

$( document ).ready(function() { //changed - marina 21-3-18 and fixed first time load!!!

	var curX; //added - marina 6-3-18
	var bgOffset; //added - marina 6-3-18
	var oldX =0; //added - marina 6-3-18
	var travelDistance; //added - marina 6-3-18
	//var boatCenter; // = $(".fisherman").width()/2; RESPONSIVE !!! //added - marina 6-3-18
	// var boatWidth; //changed - marina 7-3-18  RESPONSIVE !!!
	var seaWidth; // = $(".questionsPanel").width(); RESPONSIVE !!!  //added - marina 6-3-18
	var maxDistance; //added - marina 6-3-18
	var boatRightEnd; //added - marina 6-3-18
	var tsimpaei; //added - marina 9-3-18
	var fishCaught = false; //added - marina 9-3-18
	//var anyFishyScaleByH; //added - marina 12-3-18
	//var anyFishyScaleByX; //added - marina 12-3-18
	var boatLeftHasBeen=0; //added - marina 14-3-18
	var boatLeftInSpeed; //added - marina 14-3-18
	//var latestX=0; //added - marina 19-3-18 //otherway - marina 20-3-18
	var checkingMovement;
	var lastTimeMoved=0; //marina 20-3-18
	var spawnBubbles; //marina 20-3-18
	var attempt=0;
	var newLeft; //added - marina 23-3-18 (=-1?...)
	var cursorPos=0;
	var boatInterval;
	var newMaxDist; //added - marina 22-3-18
	var plusPoints; //added - marina 23-3-18
	var weHaveDinner; //added - marina 27-3-18
	var amountMovedX; //moved to top - marina 27-3-18

	//$(".fisherman").css('left','740px');

	//boatWidth = $('.fisherman').width();

	var thisLeft; //added - marina 23-3-18 (=640?)

	var bubblesArray = []; //added - marina 20-3-18
	var i; //added - marina 20-3-18

	function create_bubbles(bubbles) {
		for (i=1; i<bubbles; i++)
		{
			var oneBubble = new Image();
			bubblesArray[i]= oneBubble;
			oneBubble.src="Content/Images/bubble.png";
			//oneBubble.width=Math.floor((Math.random()*35)+10); //moved inside bubbles_move funtion - marina 21-3-18
			//oneBubble.style="margin-left:"+Math.floor((Math.random()*1280)+1)+"px; bottom:"+Math.floor((Math.random()*500)+1)+"px; display:none;";
			$('.questionBG').append(oneBubble);
		}
	} //added - marina 20-3-18

	function bubbles_move() {
		$('.questionBG').empty();
		create_bubbles(Math.floor((Math.random()*12)+3));
		$('.questionBG img').each(function() {

			$(this).css({"width":Math.floor((Math.random()*35)+10)+"px","height":"auto","margin-left":Math.floor((Math.random()*1200)+1)+"px","bottom":Math.floor((Math.random()*500)+1)+"px","display":"none"});
			//changed 1280 to 1200 to cause bubbles were exceeding background - marina 23-3-18
			//,"transform":"rotate(45deg)"
			$(this).fadeIn(800);
			$(this).addClass('infinite-spinning'+Math.floor((Math.random()*3)+1)); //added - marina 22-3-18 //added second random spinning - marina 23-3-18
			$(this).animate({bottom:'600px',opacity:0},4000,'swing');
			//,transform:'rotate(45deg)',-ms-transform:'rotate(45deg)',-webkit-transform:'rotate(45deg)'
		 });
		//console.log('bubble!');
	} //added - marina 20-3-18

	var frames1=0;
	var frames2=0;
	var frames3=0;
	var frames4=0;
	var frames5=0;

	function fish_move() {
			frames1 = 116.5 + frames1;
			$("[data-fish=1]").css("background-position",frames1 + "px");
			$("[data-fish=2]").css("background-position",frames1 + "px");

			frames2 = 134.5 + frames2;
			$("[data-fish=3]").css("background-position",frames2 + "px");
			$("[data-fish=4]").css("background-position",frames2 + "px");

			frames3 = 141.83 + frames3;
			$("[data-fish=5]").css("background-position",frames3 + "px");
			$("[data-fish=6]").css("background-position",frames3 + "px");

			frames4 = 198 + frames4;
			$("[data-fish=7]").css("background-position",frames4 + "px");
			$("[data-fish=8]").css("background-position",frames4 + "px");

			frames5 = 161.71 + frames5;
			$("[data-fish=9]").css("background-position",frames5 + "px");
			$("[data-fish=10]").css("background-position",frames5 + "px");
	}

	var fish;

	//var fish=setInterval(fish_move,120); will initiate it only when game has begun! - marina 19-3-18

	Questions=[];Original=[];

	var mod=2; //var mod=2;
	var cor=window.name.split(":");
	var timerInterval;
	if(cor[0]=="GameModule"){mod=cor[1]}

	// var scale;
		var scale=1; //set to 1 - marina 22-3-18 and fixed first time boatwidth load!!!

	var currentH=82;

	//maybenot?
	function hookPos(){
		currentH = $(".hook").height();
	}

	//console.log("fixed-init"+$(window).width()); //added - marina 7-3-18
	//console.log($('.gamesWrapper').offset().left); //added - marina 7-3-18
	//console.log("width is "+$('.gamesWrapper').width()+" left is "+$('.gamesWrapper').css('left')); //added - marina 7-3-18 HERE ALWAYS 1280 & 0 ...

	if($(window).width()<1280 || $(window).height()<960)
	{
		//alert($(window).width()+' is < 1280 or '+$(window).height()+'  is <960');
		if($(window).height()/$(window).width()>0.75)
		{
			scale=$(window).width()/1280;
			$('.gamesWrapper').css({'-webkit-transform': 'scale(' + scale + ')'});
			$('.gamesWrapper').css({'-ms-transform': 'scale(' + scale + ')'});
			$('.gamesWrapper').css({'transform': 'scale(' + scale + ')'});
			$('.gamesWrapper').css({'left': '0px'});
			$('.gamesWrapper').css({'top': ($(window).height()-(scale*960))/2+ 'px'});
			bgOffset = parseFloat($('.gamesWrapper').css("left")); //added - marina 8-3-18 // removed .offset() and used css left instead cause of scaling!!! - marina 23-3-18
			boatWidth = $('.fisherman').width()*scale; //added - marina 7-3-18
			seaWidth = $('.gamesWrapper').width()*scale; //added - marina 7-3-18
			newMaxDist = seaWidth - $('.fisherman').width()*0.8; //added - marina 22-3-18
			//console.log(seaWidth); //added - marina 7-3-18
			//console.log($(window).height()-(scale*960)/2); //added - marina 7-3-18
			//console.log("hor-init"+$(window).width()); //added - marina 7-3-18
			//console.log("A. width is "+ seaWidth +" left is "+$('.gamesWrapper').css('left')); //added - marina 7-3-18 HERE LEFT IS CHANGING, WIDTH IS NOT
			//console.log($('.gamesWrapper').offset().left); //added - marina 8-3-18
		}
		else
		{
			scale=$(window).height()/960;
			$('.gamesWrapper').css({'-webkit-transform': 'scale(' + scale + ')'});
			$('.gamesWrapper').css({'-ms-transform': 'scale(' + scale + ')'});
			$('.gamesWrapper').css({'transform': 'scale(' + scale + ')'});
			$('.gamesWrapper').css({'left': ($(window).width()-(scale*1280))/2+ 'px'});
			$('.gamesWrapper').css({'top':'0px'});
			bgOffset = parseFloat($('.gamesWrapper').css("left")); //added - marina 8-3-18 // removed .offset() and used css left instead cause of scaling!!! - marina 23-3-18
			boatWidth = $('.fisherman').width()*scale; //added - marina 7-3-18
			seaWidth = $('.gamesWrapper').width()*scale; //added - marina 7-3-18
			newMaxDist = seaWidth - $('.fisherman').width()*0.8; //added - marina 22-3-18
			//console.log(seaWidth); //added - marina 7-3-18
			//console.log(bgOffset); //added - marina 7-3-18
			//console.log("ver-init"+$(window).width()); //added - marina 7-3-18
			//console.log("B. width is "+ seaWidth +" left is "+$('.gamesWrapper').css('left')); //added - marina 7-3-18 HERE LEFT IS CHANGING, WIDTH IS NOT
			//console.log($('.gamesWrapper').offset().left); //added - marina 8-3-18
		}
		//console.log("sea-width-is-"+seaWidth+"---boat-width-is-"+boatWidth+"---off-set-is"+bgOffset); //added - marina 12
	}
	else
	{
		$('.gamesWrapper').css({'left': ($(window).width()-1280)/2+ 'px'});
		$('.gamesWrapper').css({'top': ($(window).height()-960)/2+ 'px'});
		bgOffset = parseFloat($('.gamesWrapper').css("left")); //added - marina 8-3-18 // removed .offset() and used css left instead cause of scaling!!! - marina 23-3-18
		boatWidth = $('.fisherman').width()*scale; //added - marina 7-3-18
		seaWidth = $('.gamesWrapper').width()*scale; //added - marina 7-3-18
		newMaxDist = seaWidth - $('.fisherman').width()*0.8; //added - marina 22-3-18
		//console.log(seaWidth); //added - marina 7-3-18
		//console.log("C. width is "+ seaWidth +" left is "+$('.gamesWrapper').css('left')); //added - marina 7-3-18 NEVER SAW THIS
		//console.log("sea-width-is-"+seaWidth+"---boat-width-is-"+boatWidth+"---off-set-is"+bgOffset); //added - marina 12
	}

	$(window).resize(function() {
	  if($(window).width()<1280 || $(window).height()<960)
		{
			//alert($(window).width()+' NOW is < 1280 or '+$(window).height()+'  NOW is <960');
			if($(window).height()/$(window).width()>0.75)
			{
				scale=$(window).width()/1280;
				$('.gamesWrapper').css({'-webkit-transform': 'scale(' + scale + ')'});
				$('.gamesWrapper').css({'-ms-transform': 'scale(' + scale + ')'});
				$('.gamesWrapper').css({'transform': 'scale(' + scale + ')'});
				$('.gamesWrapper').css({'left': '0px'});
				$('.gamesWrapper').css({'top': ($(window).height()-(scale*960))/2+ 'px'});
				bgOffset = parseFloat($('.gamesWrapper').css("left")); //added - marina 8-3-18 // removed .offset() and used css left instead cause of scaling!!! - marina 23-3-18
				boatWidth = $('.fisherman').width()*scale; //added - marina 7-3-18
				seaWidth = $('.gamesWrapper').width()*scale; //added - marina 7-3-18
				newMaxDist = seaWidth - $('.fisherman').width()*0.8; //added - marina 22-3-18
				//console.log(bgOffset);
				//console.log(seaWidth); //added - marina 7-3-18
				//console.log($(window).height()-(scale*960)/2); //added - marina 7-3-18
				//console.log("hor-changed-to-"+$(window).width()); //added - marina 7-3-18
				//console.log("D. width is "+ seaWidth +" left is "+$('.gamesWrapper').css('left')); //added - marina 7-3-18 HERE LEFT IS CHANGING, WIDTH IS NOT
			}
			else
			{
				scale=$(window).height()/960;
				$('.gamesWrapper').css({'-webkit-transform': 'scale(' + scale + ')'});
				$('.gamesWrapper').css({'-ms-transform': 'scale(' + scale + ')'});
				$('.gamesWrapper').css({'transform': 'scale(' + scale + ')'});
				$('.gamesWrapper').css({'left': ($(window).width()-(scale*1280))/2+ 'px'});
				$('.gamesWrapper').css({'top':'0px'});
				bgOffset = parseFloat($('.gamesWrapper').css("left")); //added - marina 8-3-18 // removed .offset() and used css left instead cause of scaling!!! - marina 23-3-18
				boatWidth = $('.fisherman').width()*scale; //added - marina 7-3-18
				seaWidth = $('.gamesWrapper').width()*scale; //added - marina 7-3-18
				newMaxDist = seaWidth - $('.fisherman').width()*0.8; //added - marina 22-3-18
				//console.log(bgOffset);
				//console.log(seaWidth); //added - marina 7-3-18
				//console.log("ver-changed-to-"+$(window).width()); //added - marina 7-3-18
				//console.log("E. width is "+ seaWidth +" left is "+$('.gamesWrapper').css('left')); //added - marina 7-3-18 HERE LEFT IS CHANGING, WIDTH IS NOT
			}
			//console.log("sea-width-is-"+seaWidth+"---boat-width-is-"+boatWidth+"---off-set-is"+bgOffset); //added - marina 12-3-18
		}
		else
		{
			$('.gamesWrapper').css({'-webkit-transform': 'scale(1)'});
			$('.gamesWrapper').css({'-ms-transform': 'scale(1)'});
			$('.gamesWrapper').css({'transform': 'scale(1)'});
			$('.gamesWrapper').css({'left': ($(window).width()-1280)/2+ 'px'});
			$('.gamesWrapper').css({'top': ($(window).height()-960)/2+ 'px'});
			bgOffset = parseFloat($('.gamesWrapper').css("left")); //added - marina 8-3-18 // removed .offset() and used css left instead cause of scaling!!! - marina 23-3-18
			boatWidth = $('.fisherman').width()*scale; //added - marina 7-3-18
			seaWidth = $('.gamesWrapper').width()*scale; //added - marina 7-3-18
			newMaxDist = seaWidth - $('.fisherman').width()*0.8; //added - marina 22-3-18
			//console.log(bgOffset);
			//console.log(seaWidth); //added - marina 7-3-18
			//console.log("no-changing-"+$(window).width()); //added - marina 7-3-18
			//console.log("F. width is "+ seaWidth +" left is "+$('.gamesWrapper').css('left')); //added - marina 7-3-18 NEVER SAW THIS
			//console.log("sea-width-is-"+seaWidth+"---boat-width-is-"+boatWidth+"---off-set-is"+bgOffset); //added - marina 12
		}
	});
  var cor=window.name.split(":");

  if(cor[0]=="GameModule"){
    mod=cor[1];
  }
	Questions=[];Original=[];
	if(mod==1){
			
		Questions[0]={Q:"A: What's this? B: _______",A1:"It's a book.",A2:"It's a notebook.",Pic:"notebook",Correct:"2",Sound:"YSA_M01_1_01",Markers:[0.134286,1.310884]};
		Questions[1]={Q:"A: What's this? B: _______",A1:"It's a tablet.",A2:"It's a computer.",Pic:"computer",Correct:"2",Sound:"YSA_M01_1_02",Markers:[0.000000,1.155420]};
		Questions[2]={Q:"A: What's that? B: _______",A1:"It's a pencil case.",A2:"It's a pen.",Pic:"pencil_case",Correct:"1",Sound:"YSA_M01_1_03",Markers:[0.000000,1.174966]};
		Questions[3]={Q:"A: Is it a desk? B: _______",A1:"Yes, it is.",A2:"No, it isn't.",Pic:"desk",Correct:"1",Sound:"YSA_M01_1_04",Markers:[0.000000,1.288776]};
		Questions[4]={Q:"A: Is it a bag? B: _______",A1:"Yes, it is.",A2:"No, it isn't.",Pic:"ruler",Correct:"2",Sound:"YSA_M01_1_05",Markers:[0.033424,1.306576]};
		Questions[5]={Q:"This is _______ umbrella.",A1:"a ",A2:"an ",Pic:"umbrella",Correct:"2",Sound:"YSA_M01_1_06",Markers:[]};
		Questions[6]={Q:"This is _______ whiteboard.",A1:"a ",A2:"an",Pic:"whiteboard",Correct:"1",Sound:"YSA_M01_1_07",Markers:[]};
		Questions[7]={Q:"_______ your book.",A1:"Close",A2:"Open",Pic:"close_your_book",Correct:"1",Sound:"YSA_M01_1_08",Markers:[]};
		Questions[8]={Q:"_______ up.",A1:"Sit",A2:"Stand",Pic:"YS3_M01_1_09",Correct:"2",Sound:"YSA_M01_1_09",Markers:[]};
		Questions[9]={Q:"Three _______ two equals five.",A1:"minus",A2:"plus",Pic:"plus",Correct:"2",Sound:"YSA_M01_1_10",Markers:[]};
		Questions[10]={Q:"Four _______ one equals three.",A1:"minus",A2:"plus",Pic:"minus",Correct:"1",Sound:"YSA_M01_1_11",Markers:[]};
		Questions[11]={Q:"A: What's that? B: _______ ",A1:"It's a rubber.",A2:"It's a cake.",Pic:"cake",Correct:"2",Sound:"YSA_M01_1_12",Markers:[0.000000,1.212585]};
		Questions[12]={Q:"A: Is it a door? B: _______",A1:"Yes, it is.",A2:"No, it isn't.",Pic:"window",Correct:"2",Sound:"YSA_M01_1_13",Markers:[0.000000,1.368707]};
		Questions[13]={Q:"This is _______ apple.",A1:"a",A2:"an",Pic:"apple",Correct:"2",Sound:"YSA_M01_1_14",Markers:[]};
		Questions[14]={Q:"A: Is it a pencil? B: _______",A1:"Yes, it is.",A2:"No, it isn't.",Pic:"pencil_case",Correct:"2",Sound:"YSA_M01_1_15",Markers:[0.000000,1.334195]};
		Questions[15]={Q:"_______? It's a book.",A1:"What's this",A2:"What's that",Pic:"YS3_M01_1_16",Correct:"1",Sound:"YSA_M01_1_16",Markers:[]};
		Questions[16]={Q:"_______? It's a notebook.",A1:"What's this",A2:"What's that",Pic:"Its-a-notebook",Correct:"2",Sound:"YSA_M01_1_17",Markers:[]};
		Questions[17]={Q:"A: Is it a desk? B: _______",A1:"Yes, it is.",A2:"No, it isn't.",Pic:"chair",Correct:"2",Sound:"YSA_M01_1_18",Markers:[0.000000,1.346054]};
		Questions[18]={Q:"Two _______ two equals four.",A1:"minus",A2:"times",Pic:"times",Correct:"2",Sound:"YSA_M01_1_19",Markers:[]};
		Questions[19]={Q:"A: What's _______? B: It's a tablet.",A1:"this",A2:"that",Pic:"tablet",Correct:"1",Sound:"YSA_M01_1_20",Markers:[1.754376,2.786667]};
	
	}
	 else if(mod==3){
	 	Questions[0]={Q:"A: Is he happy? B: _______",A1:"Yes, he is.",A2:"No, he isn't.",Pic:"YS3_M03_1_01",Correct:"1",Sound:"YSA_M03_1_01",Markers:[0.060000,1.443333]};
		Questions[1]={Q:"A: Is it small? B: _______",A1:"Yes, it is.",A2:"No, it isn't.",Pic:"big",Correct:"2",Sound:"YSA_M03_1_02",Markers:[0.000000,1.429524]};
		Questions[2]={Q:"A: Is she tall? B: _______",A1:"Yes, she is.",A2:"No, she isn't.",Pic:"tall",Correct:"1",Sound:"YSA_M03_1_03",Markers:[0.000000,1.300794]};
		Questions[3]={Q:"A: Is he sad? B: _______",A1:"Yes, he is.",A2:"No, he isn't.",Pic:"sad",Correct:"1",Sound:"YSA_M03_1_04",Markers:[0.035646,1.381293]};
		Questions[4]={Q:"A: Are they students? B: _______",A1:"Yes, they are.",A2:"No, they aren't.",Pic:"students",Correct:"1",Sound:"YSA_M03_1_05",Markers:[0.000000,1.614694]};
		Questions[5]={Q:"A: Are they pilots? B: _______",A1:"Yes, they are.",A2:"No, they aren't.",Pic:"YS3_M03_1_06",Correct:"2",Sound:"YSA_M03_1_06",Markers:[0.000000,1.626077]};
		Questions[6]={Q:"A: Are they police officers? B: _______",A1:"Yes, they are.",A2:"No, they aren't.",Pic:"firefighters",Correct:"2",Sound:"YSA_M03_1_07",Markers:[0.000000,2.164921]};
		Questions[7]={Q:"A: Are you happy? B: _______ ",A1:"Yes, I am.",A2:"No, I'm not.",Pic:"YS3_M03_1_08",Correct:"1",Sound:"YSA_M03_1_08",Markers:[0.000000,1.449796]};
		Questions[8]={Q:"I _______ swim.",A1:"can",A2:"can't",Pic:"swim",Correct:"1",Sound:"YSA_M03_1_09",Markers:[]};
		Questions[9]={Q:"It _______ fly.",A1:"can't",A2:"can",Pic:"fly",Correct:"2",Sound:"YSA_M03_1_10",Markers:[]};
		Questions[10]={Q:"He can _______.",A1:"run",A2:"climb",Pic:"climb",Correct:"2",Sound:"YSA_M03_1_11",Markers:[]};
		Questions[11]={Q:"They can _______.",A1:"run",A2:"walk",Pic:"YS3_M03_1_12",Correct:"1",Sound:"YSA_M03_1_12",Markers:[]};
		Questions[12]={Q:"A: Can you spell your name? B: _______",A1:"Yes, I can.",A2:"No, I can't.",Pic:"spell",Correct:"1",Sound:"YSA_M03_1_13",Markers:[0.000000,2.358639]};
		Questions[13]={Q:"A: Can you count to 10? B: _______",A1:"Yes, I can.",A2:"No, I can't.",Pic:"count",Correct:"2",Sound:"YSA_M03_1_14",Markers:[0.000000,1.853968]};
		Questions[14]={Q:"A: Is he a footballer? B: _______",A1:"Yes, he is.",A2:"No, he isn't.",Pic:"YS3_M03_1_15",Correct:"1",Sound:"YSA_M03_1_15",Markers:[0.000000,1.522902]};
		Questions[15]={Q:"A: Can John draw? B: _______",A1:"Yes, he can.",A2:"No, he can't.",Pic:"draw",Correct:"1",Sound:"YSA_M03_1_16",Markers:[0.000000,1.770975]};
		Questions[16]={Q:"He can _______.",A1:"hear",A2:"see",Pic:"see",Correct:"2",Sound:"YSA_M03_1_17",Markers:[]};
		Questions[17]={Q:"She can _______.",A1:"smell",A2:"taste",Pic:"smell",Correct:"1",Sound:"YSA_M03_1_18",Markers:[]};
		Questions[18]={Q:"A: Can she sing? B: _______",A1:"Yes, she can.",A2:"No, she can't.",Pic:"YS3_M03_1_19",Correct:"2",Sound:"YSA_M03_1_19",Markers:[0.000000,1.329932]};
		Questions[19]={Q:"A: Can he read? B: _______",A1:"Yes, he can.",A2:"No, he can't.",Pic:"read",Correct:"1",Sound:"YSA_M03_1_20",Markers:[0.000000,1.184127]};


	}
	 else if(mod==6){
	 	Questions[0]={Q:"There is a _______.",A1:"museum",A2:"park",Pic:"museum",Correct:"1",Sound:"YSA_M06_1_01",Markers:[]};
		Questions[1]={Q:"There are two _______.",A1:"cinemas",A2:"schools",Pic:"schools2",Correct:"2",Sound:"YSA_M06_1_02",Markers:[]};
		Questions[2]={Q:"This is my _______.",A1:"park",A2:"town",Pic:"town",Correct:"2",Sound:"YSA_M06_1_03",Markers:[]};
		Questions[3]={Q:"A: Is there a pet shop? B: _______",A1:"Yes, there is.",A2:"No, there isn't.",Pic:"petshop",Correct:"1",Sound:"YSA_M06_1_04",Markers:[0.000000,1.412857]};
		Questions[4]={Q:"A: Is there a shopping centre? B: _______",A1:"Yes, there is.",A2:"No, there isn't.",Pic:"supermarket",Correct:"2",Sound:"YSA_M06_1_05",Markers:[0.000000,1.959728]};
		Questions[5]={Q:"A: Are there two cinemas? B: _______",A1:"Yes, there are.",A2:"No, there aren't.",Pic:"2cinemas",Correct:"1",Sound:"YSA_M06_1_06",Markers:[0.000000,1.783243]};
		Questions[6]={Q:"A: Is there a clothes shop? B: _______",A1:"Yes, there is.",A2:"No, there isn't.",Pic:"toyshop",Correct:"2",Sound:"YSA_M06_1_07",Markers:[0.000000,1.612698]};
		Questions[7]={Q:"There _______ two buses in town.",A1:"aren't",A2:"are",Pic:"two-buses",Correct:"2",Sound:"YSA_M06_1_08",Markers:[]};
		Questions[8]={Q:"There are _______ in the city.",A1:"trains",A2:"taxis",Pic:"2taxis",Correct:"2",Sound:"YSA_M06_1_09",Markers:[]};
		Questions[9]={Q:"There is a _______.",A1:"plane",A2:"helicopter",Pic:"plane2",Correct:"1",Sound:"YSA_M06_1_10",Markers:[]};
		Questions[10]={Q:"A: Are there three cars? B: _______",A1:"Yes, there are.",A2:"No, there aren't.",Pic:"four-cars",Correct:"2",Sound:"YSA_M06_1_11",Markers:[0.000000,2.059524]};
		Questions[11]={Q:"A: Is there one boat? B: _______",A1:"Yes, there is.",A2:"No, there isn't.",Pic:"boat",Correct:"1",Sound:"YSA_M06_1_12",Markers:[0.000000,1.525102]};
		Questions[12]={Q:"The school is _______ the zoo and the hospital.",A1:"between",A2:"next to",Pic:"schools",Correct:"1",Sound:"YSA_M06_1_13",Markers:[]};
		Questions[13]={Q:"The taxi is _______ the bus.",A1:"between",A2:"next to",Pic:"3taxis",Correct:"2",Sound:"YSA_M06_1_14",Markers:[]};
		Questions[14]={Q:"The boat is _______ the red car and the bus.",A1:"next to",A2:"between",Pic:"boat",Correct:"2",Sound:"YSA_M06_1_15",Markers:[]};
		Questions[15]={Q:"There are three _______.",A1:"rides",A2:"bikes",Pic:"3bikes",Correct:"2",Sound:"YSA_M06_1_16",Markers:[]};
		Questions[16]={Q:"There is a _______ outside our school.",A1:"hotel",A2:"playground",Pic:"playground",Correct:"2",Sound:"YSA_M06_1_17",Markers:[]};
		Questions[17]={Q:"The restaurant is next to the _______.",A1:"toy shop",A2:"pet shop",Pic:"restaurant-next-to-toy-shop",Correct:"1",Sound:"YSA_M06_1_18",Markers:[]};
		Questions[18]={Q:"A: Is there a lorry in the town? B: _______",A1:"Yes, there is.",A2:"No, there isn't.",Pic:"lorry",Correct:"1",Sound:"YSA_M06_1_19",Markers:[0.000000,2.009184]};
		Questions[19]={Q:"A: Is it fast? B: _______",A1:"Yes, it is.",A2:"No, it isnt.",Pic:"plane",Correct:"1",Sound:"YSA_M06_1_20",Markers:[0.000000,1.436100]};


	}
	$.each(Questions, function( index, value ) {
		Original[index]=value;
	});

	function refillArray(){
		$.each(Original, function( index, value ) {
			Questions[index]=value;
		});
	}

	var click=0;
	var rand=0;
	var word;
	// fetchWord(); //moved it under function - marina 23-3-18
	var timer=0;
	var audioInterval;
	var points=0;
	var fail=0;
	var boat;
	//var pos; //initial code put in comments - marina 6-3-18
	var fishInterval;  //RANDOM FISH MOVEMENT
	//var hookInterval;  //ATTEMPT TO FISH //initial code commented - marina 12-3-18
	var hookPosInterval;  //STRETCHING POLE
	var bite=0;
	var jelly=0;



	function setBoatPosition (event) {
		curX = (event.pageX)/scale-bgOffset;

		lastTimeMoved = new Date().getTime()+800; //added otherway - marina 20-3-18 //added 250ms as delay cause of boat speed!!! - marina 22-3-18 //changed delay to 800ms - marina 26-3-18

		//console.log("boat not moving");

		//console.log(oldX+" ... "+curX);

		//oldX=curX; //once the comparison takes place, the current position becomes the old position

		//console.log("curX-"+curX+"---sea-width-is-"+seaWidth+"---boat-width-is-"+boatWidth+"---off-set-is"+bgOffset+"---travel-distance-is-"+travelDistance+"---boat-left-is-"+$(".fisherman").css('left')+"---max-distance-is-"+maxDistance+"---boat-end-is-"+boatRightEnd); //added - marina 8-3-18
		//console.log("---boat-left-is-"+$(".fisherman").css('left')); //added - marina 12-3-18
	};

	function boatPos() { //moved under setBoatPosition cause of curX - marina - 23-3-18

			// var thisLeft=parseFloat($(".fisherman").css('left'));
			thisLeft=parseFloat($(".fisherman").css('left')); //set var on top - marina 23-3-18

			//console.log(thisLeft); //added - marina 23-3-18
			//console.log(parseFloat($(".fisherman").css('left'))); //added - marina 23-3-18

			// var newLeft=thisLeft - (thisLeft+ $('.fisherman').width()/2-curX)/10;
			newLeft=thisLeft - (thisLeft+ 174-curX)/25; //set var on top - marina 23-3-18 //changed 10 steps to 25 steps - marina 26-3-18

			//console.log(newLeft); //is NaN initially!!! - marina 23-3-18

			if(newLeft<thisLeft)
			{
				$(".fisherman").css('transform', 'scaleX(1)');
			}
			else
			{
				$(".fisherman").css('transform', 'scaleX(-1)');
			}

			//console.log($('.fisherman').width()); //always 248 when not with scale - marina 22-3-18

			if(newLeft<0){//changed -35 to 0 cause splashing was exceeding background - marina 23-3-18
				//console.log(newLeft+" should be 0");
				newLeft=0;
			}
			//console.log(newLeft+"  "+seaWidth);
			if (newLeft>1022)//changed 1070 to 1032 to cause splashing was exceeding background - marina 23-3-18
			{
				newLeft=1022; //  N O T  needed scale!!!
			}

		 	//if(newLeft>maxDistance){newLeft=maxDistance-boatWidth}
			$(".fisherman").css('left',newLeft );
	}

	function checking_movement () {
		/* if((curX-latestX)>travelDistance/200 || (latestX-curX)>travelDistance/200)
		{
			if(!$('.splashes').hasClass('splashing'))
			{
				$('.splashes').css('display','block');
				$('.splashes').addClass('splashing');
				//console.log("different "+curX+"..."+latestX);
			}
		}
		else
		{
			if($('.splashes').hasClass('splashing'))
			{
				$('.splashes').css('display','none');
				$('.splashes').removeClass('splashing');
				//console.log("same "+curX+"..."+latestX);
			}
		}
		console.log("now "+latestX+"..."+curX);*/ //otherway - marina 20-3-18

		var newTimeMoved = new Date().getTime();
		if (newTimeMoved - lastTimeMoved > 100)
		{
			$('.splashes').css('display','none');
			$('.splashes').removeClass('splashing');
  	}
		else {
			$('.splashes').css('display','block');
			$('.splashes').addClass('splashing');
		} //added otherway - marina 20-3-18

	} //added for splashing effect - marina 19-3-18

	//$('#specialPearlBonus').attr("src","Content/Images/pearlWhite.png");


	function fetchWord(){ //was further below and moved it here , before it is called with click on play, marina 23-3-18

		if(Questions.length==0){
			refillArray();
		}
		var rand=randomGenerator(0,Questions.length-1);

		word=Questions[rand];
		Questions.splice(rand,1);

		$(".question,.questionAnswers,.questionSound,.questionImage").html("");
		$(".question").html(word.Q.replace("B:", "<br />B:"));
		if(word.Pic!=""){
			$(".questionImage").append("<img src='Images/"+word.Pic+".jpg'></img>");
		}
		$(".questionAnswers").append("<div class='answerA' id='answerA'><span>"+word.A1+"</span></div>");
		$(".questionAnswers").append("<div class='answerB' id='answerB'><span>"+word.A2+"</span></div>");
		if(word.A3!=null){$(".questionAnswers").append("<div class='answerC'><span>"+word.A3+"</span></div>");}
		$(".questionAnswers>div").eq(word.Correct-1).attr("data-questioncorrect","true");
		//console.log($(".questionAnswers>div").eq(word.Correct-1).attr("data-questioncorrect","true"));
		if(word.Sound!=null){
			$(".questionSound").append("<audio src=''>"+word.Sound+"</audio>");
			$(".questionSound audio").attr("src","Sounds/"+word.Sound+".mp3");
			$(".questionSound audio")[0].load();
		}
		if(word.Markers!=null){
		}
		if($(".question").is(':contains("A:")'))
		{
			$('.speaker').show();

			var sp=$(".question").html().split("<br>")[0];
			//console.log(sp);
			if (sp.indexOf("_______") != -1){$('.speaker').css("top", "80px");}
		}
		else
		{
			$('.speaker').hide();
		}
	}

	$(".play_btn").click(function() {
		$(".general-game-sound").attr("src","Content/Sounds/HI091.mp3");  //added - marina 22-3-18 // removed .prop('volume', 0.65) - marina 26-3-18
		$(".general-game-sound")[0].play();  //added - marina 22-3-18
		fishPos(); //added so we dont have to wait until the interval for the first time - marina 19-3-18
		fishInterval=setInterval(fishPos,2000); //RANDOM FISH MOVEMENT starts!!! - marina 15-3-18
		fish=setInterval(fish_move,120); //added - marina 19-3-18

		bubbles_move();  //added - marina 20-3-18
		spawnBubbles= setInterval(bubbles_move,5300);  //added - marina 20-3-18

		$('.mainPanel').hide();
		$('.questionsPanel').fadeIn(0);
		$('.questionContent').hide();
		$('.pearl').hide(); //special bonus - marina 23-3-18
		//$(".afterContainer").fadeIn(500);
		//playingTime();
		timer=0;
		timerInterval=setInterval(timerF,30);

		//$(window).load(function() {
		$(document).on( "mousemove", ".gamesWrapper", setBoatPosition); //added TO MOVE BOAT AGAIN marina 15-3-18
		//});
		boat=setInterval(boatPos,40); //initial code put in comments - marina 6-3-18  // moved under setBoatPosition cause of curX - marina - 23-3-18
		checkingMovement=setInterval(checking_movement,100); //initiating splashing effect - marina 19-3-18 //otherway - marina 20-3-18

		fetchWord(); //brought it here from top - marina 23-3-18

	});

	$(document).on("mousedown", ".play_btn", function (e) {
		$(this).addClass("play_p");
		$(this).find(".play_btn_txt").addClass("play_txt_p");
	});

	$(document).on("mouseover", ".play_btn_txt, .instr_btn_txt, .exit_btn_txt", function (e) {
		$(".key-over").attr("src","Content/Sounds/glass.mp3");
		$(".key-over")[0].play();
	});
	
	$(document).on("mouseup", function () {
		$(".play_p").removeClass("play_p");
		$(".play_txt_p").removeClass("play_txt_p");
	});

	$(".instr_btn").click(function() {
	    $('.instructionsPanel').show();
		$('.mainPanel').hide();
		setTimeout(function () {
			$('.instructionsPanel').addClass("downInstr");
			$('.instructionsContent').addClass("downInstrBox");
		}, 1000);
		setTimeout(function () {	$('.back_btn_Instr').fadeIn('fast');	}, 6000);
	});

	$(document).on("mousedown", ".instr_btn", function (e) {
		$(this).addClass("inst_p");
		$(this).find(".instr_btn_txt").addClass("inst_txt_p");
	});

	$(document).on("mouseup", function () {
		$(".inst_p").removeClass("inst_p");
		$(".inst_txt_p").removeClass("inst_txt_p");
	});

	$(".back_btn").click(function() {
    $('.mainPanel').show();
		$('.questionsPanel').hide();
		$('.instructionsPanel').hide();
		clearInterval(fishInterval); //RANDOM FISH MOVEMENT stops!!! - marina 15-3-18
		clearInterval(fish); //added to stop fish sprite animation - marina 19-3-18
		clearInterval(spawnBubbles);  //added - marina 20-3-18
		$(".general-game-sound")[0].pause();  //added - marina 22-3-18

		location.reload();
	});

	$(document).on("mousedown", ".back_btn", function (e) {
		$(this).find(".back_btn_txt").addClass("back_btn_txt_p");
	});

	$(document).on("mouseup", function () {
		$(".back_btn_txt_p").removeClass("back_btn_txt_p");
	});

	$(".back_btn_Instr").click(function() {
	    $('.mainPanel').show();
		$('.questionsPanel').hide();
		$('.instructionsPanel').hide();

		location.reload();
	});

	$(document).on("mousedown", ".back_btn_Instr", function (e) {
		$(this).find(".back_btn_Instr_txt").addClass("back_btn_Instr_txt_p");
	});

	$(document).on("mouseup", function () {
		$(".back_btn_Instr_txt_p").removeClass("back_btn_Instr_txt_p");
	});

	$(".exit_btn").click(function(){
	});

	$(document).on("click", ".exit_btn", function (){
		clearInterval(fish); //added to stop fish sprite animation - marina 19-3-18
	    window.name = '{"Type":"GA"}';
	    window.location.href = "../../MainMenu.html";
	});

	$(document).on("mousedown", ".exit_btn", function (e) {
		$(this).addClass("exit_p");
		$(this).find(".exit_btn_txt").addClass("exit_txt_p");
	});

	$(document).on("mouseup", function () {
		$(".exit_p").removeClass("exit_p");
		$(".exit_txt_p").removeClass("exit_txt_p");
	});

	$(document).on("mousemove", ".questionBG", function (e) {
	  // var amountMovedX = (e.pageX * -1 / 9); //initial code commented - marina 27-3-18
		amountMovedX = (e.pageX * -1/6 ); //made it move faster to follow boat move - marina 27-3-18
		var amountMoved = (e.pageX - 150);

	  $(".questionsPanel").css('background-position', amountMovedX + 'px 0');
		//$('.sea').css('margin-left', amountMovedX + 'px'); //added to make fish follow boat movement - marina 27-3-18 //removed, not working properly on caught fish!(marina)


		//$(".fisherman").animate({left: '+='+amountMoved}, 1000);
		//$(".fisherman").css('left', amountMoved + 'px');
		//$(".fisherman").css('left', amountMovedX*(-7.5) + 'px');
		//$(".fisherman").css('transform', 'translateX(' + amountMoved + 'px)');
		//var position = $(".fisherman").position();
		//console.log(position.left);
		//if (position.left > amountMoved){
			//$(".fisherman").css('transform', 'scaleX(-1)');
		//}
	});

	


	function tsimpise (){ //CATCHING FISH

		// if(click==1) //SINGLE CLICK - ONLY THEN THINGS HAPPEN
		// {
			$('.hook').addClass("hookDown");

			//maybenot?
			hookPosInterval=setInterval(hookPos,10); //POLE STRETCHES OUT IN HERE SO WHILE IT DOES WE DO THE CHECKING!!!
			//$(".hook").height();


			var x1 = parseInt($(".hook").offset().left);
			var hoY= $(".hook").height(); // xwris scale to height tou hook// 																			 
			//*var y1 = $(".hook").height()+parseInt($(".hook").offset().top-82);
			//var h1 = 82;
			//var w1 = 15;*/ //initial code commented - marina 12-3-18
			var y1 = $(".hook").height()*scale+parseInt($(".hook").offset().top-82*scale); //needed scale - marina 12-3-18
			var h1 = 82*scale; //needed scale - marina 12-3-18
			var w1 = 15*scale; //needed scale - marina 12-3-18
			var b1 = y1 + h1; // HOOK'S BOTTOM
			var r1 = x1 + w1; // HOOK'S RIGHT END
			var hookSleft = parseInt($(".hook").css('left')); //added - marina 16-3-18 //NOT working, always 78 on console - marina 16-3-18

			$("[data-fish]").each(function( index, value ) {
				var x2 = parseInt($(this).offset().left);
				var y2 = parseInt($(this).offset().top);
				/*var h2 = $(this).height();
				var w2 = $(this).width();*/ //initial code commented - marina 12-3-18
				var h2 = $(this).height()*scale; //needed scale - marina 12-3-18
				var w2 = $(this).width()*scale; //needed scale - marina 12-3-18
				var b2 = y2 + h2; // FISH'S TOP
				var r2 = x2 + w2; // FISH'S RIGHT END

				var onHookX=(x1-w2/2-bgOffset)/scale; // !@#*& :O
				//var onHookY=b1; * logw scale to psari den paei sto agkistri*
				var onHookY=67+hoY; // Xristina *to bottom tou hook einai: to top sta8era 67px + height tou hook* //																	   
					//console.log("aaaa");				//console.log(x1+" "+y1+" "+w2+" "+h2);
					//console.log(b1);
				// if(click==1) //initial code commented - marina 12-3-18
				// { //initial code commented - marina 12-3-18
					if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) //AS LONG AS HOOK AND FISH  D O N' T  TOUCH EACH OTHER
					{


						//console.log("meeeh.....");

						setTimeout(function () { // HOOK GOING UP after the time needed to go down!!!
							$(".hookDown").removeClass("hookDown");
							clearInterval(tsimpaei); //STOP CHECKING AFTER STRETCHING OUT ONCE & BEFORE GOING UP AGAIN
							click=0; //MUST TURN IT TO ZERO TO START COUNTING AGAIN
							//attempt = 0;

						}, 2000);
					}
					else // WHEN HOOK REACHES TARGET
					{
						console.log("tsimpiseeeeee...!!!");


						clearInterval(boat);
						clearInterval(tsimpaei); //SUCCESS SO WE STOP CHECKING!!! - this way we only catch ONE FISH
						//console.log("caught it "+click);
						click=0; //MUST TURN IT TO ZERO TO START COUNTING AGAIN
						//attempt = 0;

						fishCaught = true;
						//console.log(fishCaught+" we have a fish! "+click);

						//$('.blockPanel').show();
						$(".hook").css('height', currentH+"px");

						if(($(this).attr("data-fish") == 9 && jelly==0) || ($(this).attr("data-fish") == 10 && jelly==0))
						{
							jellyFish();
							//click=0; //MUST TURN IT TO ZERO TO START COUNTING AGAIN
							//console.log("jelly "+click);
							// setTimeout(function () {
							// 	click=0; //MUST TURN IT TO ZERO TO START COUNTING AGAIN
							// }, 3000); //added - marina 12-3-18
						}
						else // SUCCESS FISH IS HOOKED
						{
							clearTimeout(fish1Time);
							clearTimeout(fish3Time);
							clearTimeout(fish4Time);
							clearTimeout(fish6Time);
							clearTimeout(fish8Time);
							clearTimeout(fish10Time);

							//$('.questionContent').fadeIn(500); //added delay - marina 26-3-18
							//$('.pearl').fadeIn(800); //special bonus - marina 23-3-18 //moved it along with delay - marina 26-3-18
							clearInterval(fishInterval); //RANDOM FISH MOVEMENT STOPS

							//maybenot?
							clearInterval(hookPosInterval);
							$(document).off("mousemove", setBoatPosition); //STOP BOAT MOVEMENT!!!
							$('.splashes').css('display','none');  //canceling splashing effect - marina 19-3-18
							clearInterval(checkingMovement);  //canceling splashing effect - marina 19-3-18
							if($('.splashes').hasClass('splashing')) //canceling splashing effect - marina 19-3-18
								$('.splashes').removeClass('splashing'); //canceling splashing effect - marina 19-3-18

							$('.questionBG').hide();
							$(".hookDown").removeClass("hookDown");

							if(bite==0)
							{
								//biteFunction(parseInt($(this).offset().top),parseInt($(this).offset().left)); //initial code commented - marina 16-3-18
								biteFunction(onHookY,onHookX); //changed - marina 16-3-18
							}

							$(this).addClass("hooked"); // THE CAUGHT FISH!!!


							//$(this).css("transition", "none");
							// var onHookX = $(this).css('left', x1);
							// var onHookY = $(this).css('top', b1);
							$(this).css("cssText", "left:"+onHookX+"px!important; top:"+onHookY+"px!important;");
							//console.log($(this).css("left")+$(this).css("top"));
							//console.log(onHookX+"..."+onHookY+"..."+hookSleft);
							//console.log(onHookX+"..."+onHookY);

							setTimeout(function(){
								$('.questionContent').fadeIn(300);
								$('.pearl').fadeIn(700);
							},1700); //first fish on hook and then after a while comes the question box - marina 26-3-18


							/*if($(this).attr("data-fish") == 1 || $(this).attr("data-fish") == 2)
							{
								$(this).css("top", parseInt($(this).offset().top)+10+"px");
								$(this).css("left", parseInt($(this).offset().left)-60+"px")
							};*/ //initial code commented - marina 12-3-18

							//click=0; //MUST TURN IT TO ZERO TO START COUNTING AGAIN
							// setTimeout(function () {
							// 	click=0; //MUST TURN IT TO ZERO TO START COUNTING AGAIN
							// }, 3000); //added - marina 12-3-18
						}
						// setTimeout(function () {
						// 	click=0; //MUST TURN IT TO ZERO TO START COUNTING AGAIN
						// }, 3000); //added - marina 12-3-18
						return false; //NEEDED TO STOP FOREACH!!!
					}
				//} //initial code commented - marina 12-3-18
			});
			// if($(".hook").height()==82)
			// {
			// 	click=0; //MUST TURN IT TO ZERO TO START COUNTING AGAIN
			// }
		//}
	}


	$(document).on("click", ".questionBG", function () //USER WANTS TO FISH
	{
		//$('.hook').addClass("hookDown");  // initial code commented - moved it inside function tsimpise - marina 12-3-18
		//hookInterval=setInterval(hook,30); // initial code commented - marina 9-3-18
		//click=1; //initial code commented - marina 9-3-18
		//click++; //added IT STARTS COUNTING AND MUST BE SINGLE EACH TIME- marina 9-3-18


		//if(attempt=0)
		if($(".hook").height()==82) //ENSURING   O N L Y   O N E  ATTEMPT PER POLE STRETCH!!!!
		{
			click++;
			//attempt=1;
			//tsimpaei = setInterval(tsimpise,10);
			if(click==1)
			{
				/* adding special bubbles & bonuses - marina 23-3-18 _start */
				var bubbleChance = Math.floor((Math.random()*6)+1);
				if(bubbleChance==1) //white pearl
				{
					$('.pearl').css('background-image','url("Content/Images/specialBG.png")');
					$('#specialPearlBonus').attr("src","Content/Images/pearlWhite.png");
					if(!$('#specialPearlBonus').hasClass('pearlicious'))
						$('#specialPearlBonus').addClass('pearlicious');
					plusPoints=100;
				}
				else if(bubbleChance==6) //yellow pearl
				{
					$('.pearl').css('background-image','url("Content/Images/specialBG.png")');
					$('#specialPearlBonus').attr("src","Content/Images/pearlYellow.png");
					if(!$('#specialPearlBonus').hasClass('pearlicious'))
						$('#specialPearlBonus').addClass('pearlicious');
					plusPoints=200;
				}
				else {
					$('.pearl').css('background-image','');
					$('#specialPearlBonus').attr("src","");
					if($('#specialPearlBonus').hasClass('pearlicious'))
						$('#specialPearlBonus').removeClass('pearlicious');
					plusPoints=0;

				}
				//console.log(points+"...and..."+plusPoints);
				/* adding special bubbles & bonuses - marina 23-3-18 _end */
				tsimpaei = setInterval(tsimpise,10);
			}
		}

		//console.log(click); //added - marina 12-3-18

		//FOR THE DURATION  W H I L E  HOOK IS STRETCHING OUT, CHECK THE MOMENT WHEN HOOK REACHES TARGET
		// if(click==1)
		// 	tsimpaei = setInterval(tsimpise,10); //added - marina 9-3-18

		//hookPosInterval=setInterval(hookPos,30);
		//setTimeout(function () {	$(".hookDown").removeClass("hookDown");	}, 2000);
		/*if(bite==0){
			setTimeout(function () { $(".hookDown").removeClass("hookDown");	 }, 2000);
		} */
		console.log('click is: '+click+'hook height: '+$(".hook").height());
	});

	//$('.speaker').css("top", "55px");

	$(document).on("click", ".speaker", function (e) {
		$(".general-game-sound")[0].pause();  //added - marina 26-3-18
		$(".questionSound audio")[0].currentTime=word.Markers[0];
		try{clearInterval(audioInterval);}catch(err){}
		audioInterval=setInterval(checkAudioEnd, 30);
		$(".questionSound audio")[0].play();
	});

	function checkAudioEnd(){
		if($(".questionSound audio")[0].currentTime>=word.Markers[1]){
			clearInterval(audioInterval);
			$(".questionSound audio")[0].pause();
		}
		//clearInterval(audioInterval);
	}

	$(document).on("click", ".speaker_answer", function (e) {
		$(".questionSound audio")[0].currentTime=0;
		$(".questionSound audio")[0].play();
	});

	function answerSolved(){
		if(word.Pic!=""){
			$('.answerBox_answer>img').addClass("img_solved");
			$(".img_solved").attr("src","Images/"+word.Pic+".jpg");
		}
		$(".solved").html($(".question").html());

		$(".solved").html($(".solved").html().replace("_______",$("[data-questioncorrect]").html()));
	}

	//fishInterval=setInterval(fishPos,2000); //RANDOM FISH MOVEMENT not moving while not in game!!! - marina 15-3-18
	//function playingTime() {

	//fishInterval=setInterval(fishPos,2000);


	//var sprite1 = document.getElementById("fish1");

	/* var fish=setInterval(fish_move,120);
	var frames1=0;
	var frames2=0;
	var frames3=0;
	var frames4=0;
	var frames5=0;

	function fish_move() {
			frames1 = 116.5 + frames1;
			$("[data-fish=1]").css("background-position",frames1 + "px");
			$("[data-fish=2]").css("background-position",frames1 + "px");

			frames2 = 134.5 + frames2;
			$("[data-fish=3]").css("background-position",frames2 + "px");
			$("[data-fish=4]").css("background-position",frames2 + "px");

			frames3 = 141.83 + frames3;
			$("[data-fish=5]").css("background-position",frames3 + "px");
			$("[data-fish=6]").css("background-position",frames3 + "px");

			frames4 = 198 + frames4;
			$("[data-fish=7]").css("background-position",frames4 + "px");
			$("[data-fish=8]").css("background-position",frames4 + "px");

			frames5 = 161.71 + frames5;
			$("[data-fish=9]").css("background-position",frames5 + "px");
			$("[data-fish=10]").css("background-position",frames5 + "px");
	} */ /* moved on top - marina 19-3-18*/

 		/*var fish2=setInterval(fish2_move,50);
		var sprite2 = document.getElementById("fish2");
		var x2=0;
		function fish2_move() {
			x2 = 135.16 + x2;
			sprite2.style.backgroundPosition = x2 + "px";
		} */
//}

	$(document).on("click", ".questionAnswers>div", function () {  //FISH IS HOOKED AND QUESTIONS APPEAR
			$('.questionContent').hide();
			$(".general-game-sound")[0].pause();  //added - marina 26-3-18
			$('.pearl').hide(); //special bonus - marina 23-3-18
			$('.blockPanel').hide();
			//clearInterval(hookInterval); //initial code commented - marina 12-3-18
			//click=0; must not be zero because then clicks are considered valid
			//$('.blockPanel').show();
			if($(this).attr("data-questioncorrect") == "true")
			{
				$(".score audio").attr("src","Content/Sounds/wahoo.mp3");
				setTimeout(function () { $(".score audio")[0].play(); }, 150);

				//points+=100; //initial code commented - marina 23-3-18
				points=points+100+plusPoints;//set special bonus here!!! - marina 23-3-18

				document.getElementById("points").innerHTML=points;
				$(".feedback").html("Well done!");
				weHaveDinner = true; //added - marina 27-3-18
			}
			else
			{
				$(".score audio").attr("src","Content/Sounds/wrong.mp3");
				setTimeout(function () {$(".score audio")[0].play();}, 150);
				$(".feedback").html("Too bad!");
				weHaveDinner = false; //added - marina 27-3-18
			}

			// $(".hook").css('height', "82px"); //initial code commented, moved inside continue answer - marina 27-3-18

			rightAnswer();

			//$(document).on( "mousemove", ".gamesWrapper", setBoatPosition); //added TO MOVE BOAT AGAIN -8-3-18 //not yet, after continue answer - marina 27-3-18

			//fishInterval=setInterval(fishPos,2000); //RANDOM FISH MOVEMENT begins again HERE - marina 21-3-18 //not just yet, fish must get on boat first - marina 27-3-18
			checkingMovement=setInterval(checking_movement,100); //RE-initiating splashing effect - marina 19-3-18

	});



	$(document).on("click", ".plagain_btn", function() {


		$('.mainPanel').css("display","none");
		$('.questionsPanel').css({"display": "block", "z-index": "1"});
		$('.afterPanel_answer').css("display","none");
		$('.questionContent').css("display","none");
		$('.pearl').css("display","none");
		$('.questionBG').css("display","block");
		$(".hook").css('height', "82px");

		spawnBubbles= setInterval(bubbles_move,5300);
		fishPos(); //added so we dont have to wait until the interval for the first time - marina 19-3-18
		fishInterval=setInterval(fishPos,2000); //RANDOM FISH MOVEMENT starts!!! - marina 15-3-18
		fish=setInterval(fish_move,120); //added - marina 19-3-18
		bubbles_move();
		$(".general-game-sound").attr("src","Content/Sounds/HI091.mp3");  //added - marina 22-3-18 // removed .prop('volume', 0.65) - marina 26-3-18
		$(".general-game-sound")[0].play();
		$(document).on( "mousemove", ".gamesWrapper", setBoatPosition); //added TO MOVE BOAT AGAIN marina 15-3-18
		//});
		boat=setInterval(boatPos,40); //initial code put in comments - marina 6-3-18  // moved under setBoatPosition cause of curX - marina - 23-3-18
		
		checkingMovement=setInterval(checking_movement,100); //initiating splashing effect - marina 19-3-18 //otherway - marina 20-3-18

		function refillArray(){
			$.each(Original, function( index, value ) {
				Questions[index]=value;
			});
		}

		fetchWord();
		
		$('.afterPanel_winner').css("display","none");

		$('.after-game-ends').css("display","none");
		$('.exit_btn_txt').css("display","none");
		
		//clearInterval(tsimpaei);
		//clearInterval(timerInterval);

		
		// //$(".hookDown").removeClass("hookDown");
		
		click=0;
		
		timer=0;
		timerInterval=setInterval(timerF,30);
		points=0;
		document.getElementById("points").innerHTML=points;

		if($('[data-fish]').hasClass("hooked"))
			$('[data-fish]').removeClass("hooked");
		




		
	});

	$(document).on("mousedown", ".plagain_btn", function (e) {
		$(this).addClass("plagain_p");
	});

	$(document).on("mouseup", function () {
		$(".plagain_p").removeClass("plagain_p");
	});

	function rightAnswer() {
		answerSolved();
		$(".afterPanel_answer").fadeIn(0);
		//$(".afterContainer").fadeIn(500)
		//$('.questionContent').fadeOut(0);
	}

	$(document).on("click", ".continue_answer", function (){
		bite=0;
		$(".general-game-sound")[0].play();  //added - marina 26-3-18

		//$(".hooked").removeClass("hooked"); //initial code commented - marina 27-3-18

		$(".hook").css('height', "82px"); //moved it here - marina 27-3-18
		/* $(".hooked").css("top",$(".hook").height()*scale+$(".hook").offset().top-350*scale); //added to get fish on boat - working - marina 27-3-18 */

		//console.log($(".hook").height());

		/* if($(".hook").height()==82)
		{
			$(".hooked").addClass("fishyOnBoat").removeClass("hooked");
			fishInterval=setInterval(fishPos,2000); //RANDOM FISH MOVEMENT begins again HERE - marina 27-3-18
			$(document).on( "mousemove", ".gamesWrapper", setBoatPosition); //added TO MOVE BOAT AGAIN -8-3-18
			boat=setInterval(boatPos,40); //moved it here - marina 27-3-18
		} //added to wait for fish to get on boat first - marina 27-3-18 */

		/* setTimeout(function(){
			$(".hooked").addClass("fishyOnBoat").removeClass("hooked");
			fishInterval=setInterval(fishPos,2000); //RANDOM FISH MOVEMENT begins again HERE - marina 27-3-18
			$(document).on( "mousemove", ".gamesWrapper", setBoatPosition); //added TO MOVE BOAT AGAIN -8-3-18
			boat=setInterval(boatPos,40); //moved it here - marina 27-3-18
		},2000) //added to wait for fish to get on boat first - marina 27-3-18 */

		if(weHaveDinner)
		{
			//$(".hooked").css("top",$(".hook").height()*scale+$(".hook").offset().top-350*scale); //added to get fish on boat - working - marina 27-3-18
			$(".hooked").css("top","149px"); //65+82 Xristina *65 to top tou hook k 82 to height tou, mexri ekei na ftanei to psari																																				
			setTimeout(function(){
				$(".hooked").addClass("fishyOnBoat");
				if($('[data-fish]').hasClass('hooked'))
				{
					$('[data-fish]').removeClass("hooked");
					fishInterval=setInterval(fishPos,2000); //RANDOM FISH MOVEMENT begins again - marina 27-3-18
					$(document).on( "mousemove", ".gamesWrapper", setBoatPosition); //added TO MOVE BOAT AGAIN -8-3-18 //moved it here - marina 27-3-18
					boat=setInterval(boatPos,40); //moved it here - marina 27-3-18
				}
			},1400); //added to wait for fish to get on boat first - marina 27-3-18
		}
		else {
			$(".hooked").removeClass("hooked"); //moved it here - marina 27-3-18
			fishInterval=setInterval(fishPos,2000); //RANDOM FISH MOVEMENT begins again - marina 27-3-18
			setTimeout(function(){
				$(document).on( "mousemove", ".gamesWrapper", setBoatPosition); //added TO MOVE BOAT AGAIN -8-3-18 //moved it here - marina 27-3-18
				boat=setInterval(boatPos,40); //moved it here - marina 27-3-18
			},2000) //added delay so fish get the time to start moving again before new fishing attempt - marina 27-3-18
		}


		$(".img_solved").attr("src","");
		$(".img_solved").removeClass("img_solved");
		//hookInterval=setInterval(hook,30); //initial code commented - marina 9-3-18
		$('.questionBG').show();
		//boat=setInterval(boatPos,40); //initial code put in comments - marina 6-3-18
		$('.afterPanel_answer').hide();
		$('.blockPanel').hide();

		// boat=setInterval(boatPos,40); //not yet,wait for fish to get on boat first - marina 27-3-18

		//fishInterval=setInterval(fishPos,2000); //RANDOM FISH MOVEMENT begins again - marina 15-3-18
		//click=0;
		// setTimeout(function () {
		// 	click=0; //MUST TURN IT TO ZERO TO START COUNTING AGAIN
		// }, 2000); //added - marina 12-3-18
		//playingTime();

		setTimeout(function(){
			if($('[data-fish]').hasClass('fishyOnBoat'))
			{
				$('.fishyOnBoat').css('cssText','left:-300px; bottom:-300px;');
				$('[data-fish]').removeClass("fishyOnBoat");
				// $(this).css("cssText", "left:"+onHookX+"px!important; top:"+onHookY+"px!important;");
			}
		},1450); //added to clear display none on previously caught fish - marina 27-3-18

		fetchWord();
	});

	function randomGenerator(min,max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function timerF(){
		timer+=5;
		//console.log(timer);
		$(".barBlue").css("width",timer/300+"%");
		if(timer==30000){ //old 20000
			clearInterval(timerInterval);
			clearInterval(boat); //initial code commented - marina 8-3-18 //uncommented - marina 23-3-18
			$(document).off("mousemove", setBoatPosition); //added TO STOP BOAT MOVEMENT!!! - marina 8-3-18
			//clearInterval(hook); //initial code commented - marina 9-3-18
			clearInterval(checkingMovement); //canceling splashing effect - marina 19-3-18
			if($('.splashes').hasClass('splashing')) //canceling splashing effect - marina 19-3-18
				$('.splashes').removeClass('splashing'); //canceling splashing effect - marina 19-3-18
			clearInterval(tsimpaei); //changed - marina 9-3-18
			clearInterval(fish); //added to stop fish sprite animation- marina 19-3-18
			clearInterval(fishInterval); //added to stop random fish movement - marina 19-3-18
			clearInterval(spawnBubbles);  //added - marina 20-3-18
			$(".general-game-sound")[0].pause();  //added - marina 22-3-18

			gameEnd();
			$('.blockPanel').hide();
			$('.questionsPanel').hide();
			$(".afterContainer").show();
			$(".afterPanel_winner").fadeIn(500);
			console.log(timer);
		};
	}

	// function hook(){ //CATCHING FISH
	// 	hookPosInterval=setInterval(hookPos,10);
	// 	//setTimeout(function () {	$(".hookDown").removeClass("hookDown");	}, 2000);
	// 	var x1 = parseInt($(".hook").offset().left);
	// 	var y1 = $(".hook").height()+parseInt($(".hook").offset().top-82);
	// 	var h1 = 82;
	// 	var w1 = 15;
	// 	var b1 = y1 + h1; // HOOK'S BOTTOM
	// 	var r1 = x1 + w1; // HOOK'S RIGHT END
	//
	// 	$("[data-fish]").each(function( index, value ) {
	// 		var x2 = parseInt($(this).offset().left);
	// 		var y2 = parseInt($(this).offset().top);
	// 		var h2 = $(this).height();
	// 		var w2 = $(this).width();
	// 		var b2 = y2 + h2; // FISH'S TOP
	// 		var r2 = x2 + w2; // FISH'S RIGHT END
	//
	// 		if (click==1)  // USER HAS CLICKED TO CATCH A FISH
	// 		{
	// 			if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) //AS LONG AS HOOK AND FISH  D O N' T  TOUCH EACH OTHER
	// 			{
	// 				if (fail==0) // HOOK STRETCHES OUT  B U T  NOTHING HAS BEEN CAUGHT
	// 				{
	// 					setTimeout(function () { // HOOK GOES UP
	// 						$(".hookDown").removeClass("hookDown");
	// 						fail=1;
	// 						//clearInterval(hookInterval); //initial code commented - marina 9-3-18
	// 						console.log("if fail is 0");
	// 					}, 2000);
	// 				}
	// 				else //RETRY
	// 				{
	// 					hookInterval=setInterval(hook,30);
	// 					fail=0;
	// 					console.log("else fail is ?");
	// 				}
	// 			}
	// 			else // WHEN HOOK REACHES TARGET
	// 			{
	// 				//$('.blockPanel').show();
	// 				$(".hook").css('height', currentH+"px");
	// 				//console.log(value)
	// 				if(($(this).attr("data-fish") == 9 && jelly==0) || ($(this).attr("data-fish") == 10 && jelly==0))
	// 				{
	// 					jellyFish();
	// 				}
	// 				else // SUCCESS FISH IS HOOKED -marina 8-3-18
	// 				{
	// 					$('.questionContent').fadeIn(500);
	// 					clearInterval(fishInterval); //RANDOM FISH MOVEMENT STOPS
	// 					clearInterval(hookPosInterval);
	// 					//clearInterval(boat); //initial code commented - marina 8-3-18
	// 					$(document).off("mousemove", setBoatPosition); //added TO STOP BOAT MOVEMENT!!! if this doesn't stop it also keeps catching fish!!! - marina 8-3-18
	// 					$('.questionBG').hide();
	// 					$(".hookDown").removeClass("hookDown");
	//
	// 					if(bite==0)
	// 					{
	// 						biteFunction(parseInt($(this).offset().top),parseInt($(this).offset().left));
	// 					}
	//
	// 					$(this).addClass("hooked"); // THE CAUGHT FISH!!!
	//
	// 					if($(this).attr("data-fish") == 1 || $(this).attr("data-fish") == 2)
	// 					{
	// 						$(this).css("top", parseInt($(this).offset().top)+10+"px");
	// 						$(this).css("left", parseInt($(this).offset().left)-60+"px")
	// 					};
	// 				}
	// 			}
	// 		}
	// 	});
	// }

	/* -------------- hook function again marina 9-3-18 _start -----------------*/
	// moved tsimpise on top!!! - marina 19-3-18
	/* -------------- hook function again marina 9-3-18 _end -----------------*/


	function biteFunction(t,l){
		bite=1;
		$(".bite").css('top', t+"px");
		$(".bite").css('left', l+"px");
		$('.bite').show();
		$(".bite").addClass("motion");

		setTimeout(function () {
			$('.bite').hide();
		}, 800);

	}

	function jellyFish(){
		//clearInterval(fishInterval); //initial code commented - marina 9-3-18 NO NEED TO STOP FISH MOVEMENT
		//maybenot?

		$('.splashes').css('display','none');  //canceling splashing effect - marina 23-3-18
		clearInterval(checkingMovement);  //canceling splashing effect - marina 23-3-18
		if($('.splashes').hasClass('splashing')) //canceling splashing effect - marina 23-3-18
			$('.splashes').removeClass('splashing'); //canceling splashing effect - marina 19-3-18

		$(".jelly-electricity-sound").attr("src","Content/Sounds/electricity.mp3");  //added - marina 23-3-18
		$(".jelly-electricity-sound")[0].play();  //added - marina 23-3-18
		clearInterval(hookPosInterval);
		clearInterval(boat); //initial code commented - marina 8-3-18 NO NEED TO STOP BOAT MOVEMENT //uncommented - marina 23-3-18
		$(".hookDown").removeClass("hookDown");
		$('.questionBG').hide();
		jelly=1;
		$(".fisherman").addClass("lost");
		$('.hook').hide();

		setTimeout(function () {
			$('.lost').removeClass("lost");
			jelly=0;
			$('.hook').show();
			//hookPosInterval=setInterval(hookPos,10); //moved it further below - marina 12-3-18
			$('.questionBG').show();
			//boat=setInterval(boatPos,40); //initial code put in comments - marina 6-3-18
			//fishInterval=setInterval(fishPos,2000); //RANDOM FISH MOVEMENT - commented marina 9-3-18 didnt stop afterall
			//$(".hooked").removeClass("hooked");
			$(".hook").css('height', "82px");
			//maybenot?
			hookPosInterval=setInterval(hookPos,10);
			boat=setInterval(boatPos,40);
			//click=0; //added - marina 12-3-18
			checkingMovement=setInterval(checking_movement,100);  //RE-initiated splashing effect - marina 23-3-18
		}, 2000);

	}

	/* var currentH=82;
	function hookPos(){
		currentH = $(".hook").height();
	} */ //moved them on top - marina 12-3-18

	function fishPos(){
		var randT1=randomGenerator(380,720);
		var randL1=randomGenerator(200,500);

		fish1Time=setTimeout(function () {
			if (randL1 < $(".fish1").css('left').replace("px","")){
				if (randT1 > $(".fish1").css('top').replace("px","")){
					$(".fish1").css('transform', 'scaleX(-1) rotate(20deg)');
				}
				else{
					$(".fish1").css('transform', 'scaleX(-1) rotate(-20deg)');
				}
			}
			else{
				if (randT1 > $(".fish1").css('top').replace("px","")){
					$(".fish1").css('transform', 'scaleX(1) rotate(20deg)');
				}
				else{
					$(".fish1").css('transform', 'scaleX(1) rotate(-20deg)');
				}
			}
			$(".fish1").css('top', randT1);
			$(".fish1").css('left', randL1);
		}, 1000);

		var randT2=randomGenerator(380,580);
		var randL2=randomGenerator(300,630);

		if (randL2 < $(".fish2").css('left').replace("px","")){
			if (randT2 > $(".fish2").css('top').replace("px","")){
				$(".fish2").css('transform', 'scaleX(-1) rotate(20deg)');
			}
			else{
				$(".fish2").css('transform', 'scaleX(-1) rotate(-20deg)');
			}
		}
		else{
			if (randT2 > $(".fish2").css('top').replace("px","")){
				$(".fish2").css('transform', 'scaleX(1) rotate(20deg)');
			}
			else{
				$(".fish2").css('transform', 'scaleX(1) rotate(-20deg)');
			}
		}

		$(".fish2").css('top', randT2);
		$(".fish2").css('left', randL2);

		fish3Time=setTimeout(function () {
			var randT3=randomGenerator(640,840);
			var randL3=randomGenerator(0,530);
			if (randL3 < $(".fish3").css('left').replace("px","")){
				if (randT3 > $(".fish3").css('top').replace("px","")){
					$(".fish3").css('transform', 'scaleX(-1) rotate(20deg)');
				}
				else{
					$(".fish3").css('transform', 'scaleX(-1) rotate(-20deg)');
				}
			}
			else{
				if (randT3 > $(".fish3").css('top').replace("px","")){
					$(".fish3").css('transform', 'scaleX(1) rotate(20deg)');
				}
				else{
					$(".fish3").css('transform', 'scaleX(1) rotate(-20deg)');
				}
			}
			$(".fish3").css('top', randT3);
			$(".fish3").css('left', randL3);
		}, 2000);

		fish4Time=setTimeout(function () {
			var randT4=randomGenerator(490,690);
			var randL4=randomGenerator(680,980);
			if (randL4 < $(".fish4").css('left').replace("px","")){
				if (randT4 > $(".fish4").css('top').replace("px","")){
					$(".fish4").css('transform', 'scaleX(-1) rotate(20deg)');
				}
				else{
					$(".fish4").css('transform', 'scaleX(-1) rotate(-20deg)');
				}
			}
			else{
				if (randT4 > $(".fish4").css('top').replace("px","")){
					$(".fish4").css('transform', 'scaleX(1) rotate(20deg)');
				}
				else{
					$(".fish4").css('transform', 'scaleX(1) rotate(-20deg)');
				}
			}
			$(".fish4").css('top', randT4);
			$(".fish4").css('left', randL4);
		}, 500);

		var randT5=randomGenerator(520,720);
		var randL5=randomGenerator(0,350);

		if (randL5 < $(".fish5").css('left').replace("px","")){
			if (randT5 > $(".fish5").css('top').replace("px","")){
				$(".fish5").css('transform', 'scaleX(-1) rotate(20deg)');
			}
			else{
				$(".fish5").css('transform', 'scaleX(-1) rotate(-20deg)');
			}
		}
		else{
			if (randT5 > $(".fish5").css('top').replace("px","")){
				$(".fish5").css('transform', 'scaleX(1) rotate(20deg)');
			}
			else{
				$(".fish5").css('transform', 'scaleX(1) rotate(-20deg)');
			}
		}

		$(".fish5").css('top', randT5);
		$(".fish5").css('left', randL5);

		fish6Time=setTimeout(function () {
		var randT6=randomGenerator(680,880);
		var randL6=randomGenerator(600,1030);
		if (randL6 < $(".fish6").css('left').replace("px","")){
			if (randT6 > $(".fish6").css('top').replace("px","")){
				$(".fish6").css('transform', 'scaleX(-1) rotate(20deg)');
			}
			else{
				$(".fish6").css('transform', 'scaleX(-1) rotate(-20deg)');
			}
		}
		else{
			if (randT6 > $(".fish6").css('top').replace("px","")){
				$(".fish6").css('transform', 'scaleX(1) rotate(20deg)');
			}
			else{
				$(".fish6").css('transform', 'scaleX(1) rotate(-20deg)');
			}
		}
		$(".fish6").css('top', randT6);
		$(".fish6").css('left', randL6);
		}, 1000);

		var randT7=randomGenerator(450,650);
		var randL7=randomGenerator(600,1030);

		if (randL7 < $(".fish7").css('left').replace("px","")){
			if (randT7 > $(".fish7").css('top').replace("px","")){
				$(".fish7").css('transform', 'scaleX(-1) rotate(20deg)');
			}
			else{
				$(".fish7").css('transform', 'scaleX(-1) rotate(-20deg)');
			}
		}
		else{
			if (randT7 > $(".fish7").css('top').replace("px","")){
				$(".fish7").css('transform', 'scaleX(1) rotate(20deg)');
			}
			else{
				$(".fish7").css('transform', 'scaleX(1) rotate(-20deg)');
			}
		}

		$(".fish7").css('top', randT7);
		$(".fish7").css('left', randL7);

		fish8Time=setTimeout(function () {
		var randT8=randomGenerator(480,740);
		var randL8=randomGenerator(560,960);
		if (randL8 < $(".fish8").css('left').replace("px","")){
			if (randT8 > $(".fish8").css('top').replace("px","")){
				$(".fish8").css('transform', 'scaleX(-1) rotate(20deg)');
			}
			else{
				$(".fish8").css('transform', 'scaleX(-1) rotate(-20deg)');
			}
		}
		else{
			if (randT8 > $(".fish8").css('top').replace("px","")){
				$(".fish8").css('transform', 'scaleX(1) rotate(20deg)');
			}
			else{
				$(".fish8").css('transform', 'scaleX(1) rotate(-20deg)');
			}
		}
		$(".fish8").css('top', randT8);
		$(".fish8").css('left', randL8);
		}, 500);

		var randT9=randomGenerator(580,780);
		var randL9=randomGenerator(420,720);
		if (randL9 < $(".fish9").css('left').replace("px","")){
			if (randT9 > $(".fish9").css('top').replace("px","")){
				$(".fish9").css('transform', 'scaleX(-1) rotate(20deg)');
			}
			else{
				$(".fish9").css('transform', 'scaleX(-1) rotate(-20deg)');
			}
		}
		else{
			if (randT9 > $(".fish9").css('top').replace("px","")){
				$(".fish9").css('transform', 'scaleX(1) rotate(20deg)');
			}
			else{
				$(".fish9").css('transform', 'scaleX(1) rotate(-20deg)');
			}
		}
		$(".fish9").css('top', randT9);
		$(".fish9").css('left', randL9);

		fish10Time=setTimeout(function () {
		var randT10=randomGenerator(580,840);
		var randL10=randomGenerator(100,650);
		if (randL10 < $(".fish10").css('left').replace("px","")){
			if (randT10 > $(".fish10").css('top').replace("px","")){
				$(".fish10").css('transform', 'scaleX(-1) rotate(20deg)');
			}
			else{
				$(".fish10").css('transform', 'scaleX(-1) rotate(-20deg)');
			}
		}
		else{
			if (randT10 > $(".fish10").css('top').replace("px","")){
				$(".fish10").css('transform', 'scaleX(1) rotate(20deg)');
			}
			else{
				$(".fish10").css('transform', 'scaleX(1) rotate(-20deg)');
			}
		}
		$(".fish10").css('top', randT10);
		$(".fish10").css('left', randL10);
		}, 1500);
	}

	function gameEnd(){
			$(".fScore").html("<span>"+points+"</span>");
	}

});

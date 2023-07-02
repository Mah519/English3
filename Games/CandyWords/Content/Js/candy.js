// V.1.8   
$( document ).ready(function() {
  // Questions=[];Original=[];

  //$("body").append('<audio class="clickSound"><source src="../../Audio/Click.mp3" type="audio/mpeg"></audio>');//initial code commented - marina 28-3-18

  var scale=1;
  if($(window).width()<1280 || $(window).height()<960){
    if($(window).height()/$(window).width()>0.75){
      scale=$(window).width()/1280;
      $('.gamesWrapper').css({'-webkit-transform': 'scale(' + scale + ')'});
      $('.gamesWrapper').css({'-ms-transform': 'scale(' + scale + ')'});
      $('.gamesWrapper').css({'transform': 'scale(' + scale + ')'});
      $('.gamesWrapper').css({'left': '0px'});
      $('.gamesWrapper').css({'top': ($(window).height()-(scale*960))/2+ 'px'});
    }
    else{
      scale=$(window).height()/960;
      $('.gamesWrapper').css({'-webkit-transform': 'scale(' + scale + ')'});
      $('.gamesWrapper').css({'-ms-transform': 'scale(' + scale + ')'});
      $('.gamesWrapper').css({'transform': 'scale(' + scale + ')'});
      $('.gamesWrapper').css({'left': ($(window).width()-(scale*1280))/2+ 'px'});
      $('.gamesWrapper').css({'top':'0px'});
    }
  }
  else{
    $('.gamesWrapper').css({'left': ($(window).width()-1280)/2+ 'px'});
    $('.gamesWrapper').css({'top': ($(window).height()-960)/2+ 'px'});
  }

  $(window).resize(function() {
    if($(window).width()<1280 || $(window).height()<960){
      if($(window).height()/$(window).width()>0.75){
        scale=$(window).width()/1280;
        $('.gamesWrapper').css({'-webkit-transform': 'scale(' + scale + ')'});
        $('.gamesWrapper').css({'-ms-transform': 'scale(' + scale + ')'});
        $('.gamesWrapper').css({'transform': 'scale(' + scale + ')'});
        $('.gamesWrapper').css({'left': '0px'});
        $('.gamesWrapper').css({'top': ($(window).height()-(scale*960))/2+ 'px'});
      }
      else{
        scale=$(window).height()/960;
        $('.gamesWrapper').css({'-webkit-transform': 'scale(' + scale + ')'});
        $('.gamesWrapper').css({'-ms-transform': 'scale(' + scale + ')'});
        $('.gamesWrapper').css({'transform': 'scale(' + scale + ')'});
        $('.gamesWrapper').css({'left': ($(window).width()-(scale*1280))/2+ 'px'});
        $('.gamesWrapper').css({'top':'0px'});
      }
    }
    else{
      $('.gamesWrapper').css({'-webkit-transform': 'scale(1)'});
      $('.gamesWrapper').css({'-ms-transform': 'scale(1)'});
      $('.gamesWrapper').css({'transform': 'scale(1)'});
      $('.gamesWrapper').css({'left': ($(window).width()-1280)/2+ 'px'});
      $('.gamesWrapper').css({'top': ($(window).height()-960)/2+ 'px'});
    }
  });

  //moved all vars UP
  var rand = 0;
  var word;
  var timer = 0;
  var audioInterval;
  var points = 0;
  var timerInterval;
  var countInterval;
  var sec = 45;
  var qNum = 0;
  var currentWord;
  var j = 0;

  Words = [];
  Original = [];
  Questions = [];

  // var mod=7;
  var cor=window.name.split(":");

  if(cor[0]=="GameModule"){
    mod=cor[1];
  }
//content start

  if(mod==5){
    Words[0]={Q:"chicken",Pic:"YSA_M05_1_01",Sound:"YSA_M05_1_01"};
    Words[1]={Q:"sandwich",Pic:"YSA_M05_1_02",Sound:"YSA_M05_1_02"};
    Words[2]={Q:"onions",Pic:"YSA_M05_1_03",Sound:"YSA_M05_1_03"};
    Words[3]={Q:"beans",Pic:"YSA_M05_1_04",Sound:"YSA_M05_1_04"};
    Words[4]={Q:"spaghetti",Pic:"YSA_M05_1_05",Sound:"YSA_M05_1_05"};
    Words[5]={Q:"chocolate",Pic:"YSA_M05_1_06",Sound:"YSA_M05_1_06"};
    Words[6]={Q:"thirsty",Pic:"YSA_M05_1_07",Sound:"YSA_M05_1_07"};
    Words[7]={Q:"salad",Pic:"YSA_M05_1_08",Sound:"YSA_M05_1_08"};
    Words[8]={Q:"vegetables",Pic:"YSA_M05_1_09",Sound:"YSA_M05_1_09"};
    Words[9]={Q:"dinner",Pic:"YSA_M05_1_10",Sound:"YSA_M05_1_10"};
    Words[10]={Q:"breakfast",Pic:"YSA_M05_1_11",Sound:"YSA_M05_1_11"};
    Words[11]={Q:"cereal",Pic:"YSA_M05_1_12",Sound:"YSA_M05_1_12"};
    Words[12]={Q:"orange",Pic:"YSA_M05_1_13",Sound:"YSA_M05_1_13"};
    Words[13]={Q:"tomato",Pic:"YSA_M05_1_14",Sound:"YSA_M05_1_14"};
    Words[14]={Q:"bread",Pic:"YSA_M05_1_15",Sound:"YSA_M05_1_15"};
    Words[15]={Q:"crisps",Pic:"YSA_M05_1_16",Sound:"YSA_M05_1_16"};
    Words[16]={Q:"watermelon",Pic:"YSA_M05_1_17",Sound:"YSA_M05_1_17"};
    Words[17]={Q:"potato",Pic:"YSA_M05_1_18",Sound:"YSA_M05_1_18"};
    Words[18]={Q:"lemonade",Pic:"YSA_M05_1_19",Sound:"YSA_M05_1_19"};
    Words[19]={Q:"pear",Pic:"YSA_M05_1_20",Sound:"YSA_M05_1_20"};

  }
  else if(mod==8){
    Words[0]={Q:"jeans",Pic:"YSA_M08_1_01",Sound:"YSA_M08_1_01"};
    Words[1]={Q:"shorts",Pic:"YSA_M08_1_02",Sound:"YSA_M08_1_02"};
    Words[2]={Q:"jacket",Pic:"YSA_M08_1_03",Sound:"YSA_M08_1_03"};
    Words[3]={Q:"shoes",Pic:"YSA_M08_1_04",Sound:"YSA_M08_1_04"};
    Words[4]={Q:"boots",Pic:"YSA_M08_1_05",Sound:"YSA_M08_1_05"};
    Words[5]={Q:"costume",Pic:"YSA_M08_1_06",Sound:"YSA_M08_1_06"};
    Words[6]={Q:"sword",Pic:"YSA_M08_1_07",Sound:"YSA_M08_1_07"};
    Words[7]={Q:"sandals",Pic:"YSA_M08_1_08",Sound:"YSA_M08_1_08"};
    Words[8]={Q:"jumper",Pic:"YSA_M08_1_09",Sound:"YSA_M08_1_09"};
    Words[9]={Q:"king",Pic:"YSA_M08_1_10",Sound:"YSA_M08_1_10"};
    Words[10]={Q:"pyjamas",Pic:"YSA_M08_1_11",Sound:"YSA_M08_1_11"};
    Words[11]={Q:"dress",Pic:"YSA_M08_1_12",Sound:"YSA_M08_1_12"};
    Words[12]={Q:"uniform",Pic:"YSA_M08_1_13",Sound:"YSA_M08_1_13"};
    Words[13]={Q:"coat",Pic:"YSA_M08_1_14",Sound:"YSA_M08_1_14"};
    Words[14]={Q:"glasses",Pic:"YSA_M08_1_15",Sound:"YSA_M08_1_15"};
    Words[15]={Q:"skirt",Pic:"YSA_M08_1_16",Sound:"YSA_M08_1_16"};
    Words[16]={Q:"trousers",Pic:"YSA_M08_1_17",Sound:"YSA_M08_1_17"};
    Words[17]={Q:"T-shirt",Pic:"YSA_M08_1_18",Sound:"YSA_M08_1_18"};
    Words[18]={Q:"socks",Pic:"YSA_M08_1_19",Sound:"YSA_M08_1_19"};
    Words[19]={Q:"belt",Pic:"YSA_M08_1_20",Sound:"YSA_M08_1_20"};
  }
//content end

  function randomGenerator(min, max) { //moved it ON TOP
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  $.each(Words, function( index, value ) {
    Original[index]=value;
  });

  function refillArray(){
    $.each(Original, function( index, value ) {
      Words[index]=value;
    });
  }

  function fetchWord(){ //moved it UP
  	$(".wordCircles,.randomOrderLetters").html("");
  	$(".revealHint").removeClass("revealHintVisible");
  	var random=randomGenerator(0,Words.length-1);
  	currentWord=Words[random];
  	var word=currentWord.Q;
  	// console.log(word);
  	Words.splice(random,1);
  	//$(".wordSound audio")[0].load(); //initial code commented - marina 28-3-18
  	var i=0;
  	var randomOrder=[];
  	for(i=0;i<currentWord.Q.length;i++){
  		if(currentWord.Q.charAt(i)!=" "){
  			$(".wordCircles").append("<div data-findletter='"+ currentWord.Q.charAt(i) +"'></div>");
  			randomOrder.push(currentWord.Q.charAt(i));
  		}
  		else{
  			$(".wordCircles").append("<div data-findletter-space='"+ currentWord.Q.charAt(i) +"'></div>");
  		}
  		//if(word.Word.charAt(i) == " "){$(".findWord").append("<span data-findletter-space='"+ word.Word.charAt(i) +"'></span>");}
  	}
  	i=0;
  	while(randomOrder.length>=1){
  		var randomLetter=randomGenerator(0,randomOrder.length-1);
  		$(".randomOrderLetters").append("<div data-dragidwrapper="+ i +" draggable='true'><span data-dragid="+ i +" draggable='true'>"+ randomOrder[randomLetter] +"</span></div>");
  		randomOrder.splice(randomLetter,1);
  		var rand=randomGenerator(1,3);
  		$(".randomOrderLetters div").find("span").eq(i).addClass("letter"+rand);
  		i++;
  	}
  	$(".gamesNotebookOverlay").removeClass("gamesNotebookOverlayEnabled");
  	setTimeout(function(){ $(".gamesNotebookWord").html(currentWord.Q); }, 300);
  	var same=0;
  	for(i=0;i<currentWord.Q.length;i++){
  		if($("[data-dragid="+i+"]").html() == currentWord.Q.charAt(i)){
  			same+=1;
  		}
  	}
  	console.log(same);
  	console.log(currentWord.Q.length);
  	while (same == currentWord.Q.length){
  		console.log("shuffle");
  		var tempArray=[];
  		$("[data-dragidwrapper]").each(function( index, value ) {
  			tempArray.push(value);
  		});
  		$(".randomOrderLetters").html("");
  		tempArray=shuffleArray(tempArray);
  		$.each(tempArray, function( index, value ) {
  			$(".randomOrderLetters").append(value);
  		});
  		same=0;
  		for(i=0;i<currentWord.Q.length;i++){
  			if($("[data-dragid]").eq(i).html() == currentWord.Q.charAt(i)){
  				same+=1;
  			}
  		}
  		console.log(same);
  	}
  }

  fetchWord(); //moved it UNDER the function itself

  function balls(){
  	var x1 = 90;
  	var y1 = 700;

  	$("[data-dragidwrapper]").each(function( index, value ) {
  		var x2 = -($(this).offset().left/scale-$(".gamesWrapper").offset().left/scale-x1);
  		var y2 = -($(this).offset().top/scale-$(".gamesWrapper").offset().top/scale-y1);
  		console.log(x2,y2);

  		$(this).css("transform-delay","0s");
  		$(this).css("transform","translate("+ x2 +"px,"+ y2 +"px");
  		$(this).css("-webkit-transform-delay","0s");
  		$(this).css("-webkit-transform","translate("+ x2 +"px,"+ y2 +"px");
  		$(this).css("-ms-transform-delay","0s");
  		$(this).css("-ms-transform","translate("+ x2 +"px,"+ y2 +"px");
  		$(this).css("-o-transform-delay","0s");
  		$(this).css("-o-transform","translate("+ x2 +"px,"+ y2 +"px");
  		$(this).css("-moz-transform-delay","0s");
  		$(this).css("-moz-transform","translate("+ x2 +"px,"+ y2 +"px");
  	});
  	setTimeout(function(){
  		console.log(x1,y1);
      $(".candies-inc").attr("src","Content/Sounds/candies-inc.mp3");  //added - marina 28-3-18
      $(".candies-inc")[0].play();  //added - marina 28-3-18
  		for(i=0;i<currentWord.Q.length;i++){
  			//$(".randomOrderLetters div").eq(i).css("transition","all 1s linear");
  			//$(".randomOrderLetters div").eq(i).css("transform","translate(0px,0px)");
  			$(".randomOrderLetters div").eq(i).removeAttr('style');
  			$(".randomOrderLetters div").eq(i).addClass("moving");
  		}
  	}, 300);
  } //moved it BEFORE click on play


  var flag = 0; //moved it UP and out of its function

  // ----------------------- drag and drop thingy  _start -----------------------
  var whichLetter;
  var placed = false;
  var matchedSlot;
  var containerOffsetLeft = $('.gamesWrapper').offset().left;
  var containerOffsetTop = $('.gamesWrapper').offset().top;
  var movementX;
  var movementY;
  var droppakiH = $('[data-findletter]').height() * scale;
  var droppakiW = $('[data-findletter]').width() * scale;
  var itemCenterHor;
  var itemCenterVer;
  var socketed;

  function whatsXY(e) {

    if ($('.movingNow').hasClass('reversable')) //moving an item that was already placed in a drop slot
    {
      socketed = $('.movingNow').parent().index(); //where does it come from!!!!
      //console.log('letter unsocketed');
    }

    itemCenterHor = $('.movingNow').width() / 2 * scale;
    itemCenterVer = $('.movingNow').height() / 2 * scale;

    try {
      if (e.originalEvent) {
        movementY = e.originalEvent.changedTouches[0].clientY - containerOffsetTop;
        movementX = e.originalEvent.changedTouches[0].clientX - containerOffsetLeft;
      }
      else {
        movementY = e.changedTouches[0].clientY - containerOffsetTop;
        movementX = e.changedTouches[0].clientX - containerOffsetLeft;
      }
    }
    catch (err) {
      movementY = e.clientY - containerOffsetTop;
      movementX = e.clientX - containerOffsetLeft;
    }

    var newLeft = (movementX - itemCenterHor) / scale;
    var newTop = (movementY - itemCenterVer) / scale;

    $('.movingNow').css('cssText', 'left:' + newLeft + 'px; top:' + newTop + 'px;');

    $('[data-findletter]').each(function () {
      var droppakiX = $(this).offset().left - containerOffsetLeft - itemCenterHor / 2;
      var droppakiY = $(this).offset().top - containerOffsetTop - itemCenterVer / 2;
      var dropSurfaceHor = droppakiX + itemCenterHor * 3; //2
      var dropSurfaceVer = droppakiY + itemCenterVer * 3.5; //2.5
      if (movementY > droppakiY && movementY < dropSurfaceVer && movementX > droppakiX && movementX < dropSurfaceHor) {
        placed = true;
        matchedSlot = $(this).index();
        $('.movingNow').css('border-color', 'Cyan');
        if ($('.movingNow').hasClass('reversable')) //moving an item that was already placed in a drop slot
        {
          $('.movingNow').addClass('reversed'); //this will be resocketed
        }
      }
    });
  }

  function moveIt() {
    $(this).parent().removeClass('moving'); //older class for initial placement transition
    $(this).addClass('movingNow'); //current class indicating drag movement
    document.getElementsByClassName('gamesWrapper')[0].addEventListener('mousemove', whatsXY, false);
    document.getElementsByClassName('gamesWrapper')[0].addEventListener('touchmove', whatsXY, false);
  }

  function fingerOff(e) {
    //e.preventDefault(); //in this case there were issues... prevent scroll for example cant happen since it's not cancelable
    e.stopPropagation();
    if (placed) {
      $(".key-release").attr("src", "Content/Sounds/btn-release.mp3");
      $(".key-release")[0].play();
      $('.movingNow').css('border-color', '#c8c8c8');

      $('.movingNow').addClass('reversable'); //has already been placed once, can be moved again & can be resocketed

      //--------- if slot is empty OR already taken by another letter and we replace it _start ---------
      var replaced = $('.wordCircles div').eq(matchedSlot).find('.item').attr('data-dragid'); //to match it with its data-dragidwrapper when restored
      var restored = $('.wordCircles div')[matchedSlot].childNodes[0]; //the position if the drop slot which will be replaced
      var slotFilling = $('.movingNow')[0].outerHTML; //the drag item

      if ($('.wordCircles div').eq(matchedSlot).is(':empty')) // EMPTY
      {
        $('.wordCircles div')[matchedSlot].innerHTML = slotFilling;

        if ($('.movingNow').hasClass('reversed')) //if an already socketed item is moved in an empty slot
        {
          console.log('socketed item is moved in an empty slot');
          $('.wordCircles div')[socketed].innerHTML = "";
          //$('.wordCircles div').eq(matchedSlot).find('.item').removeClass('reversed').css('color', 'green'); //testing
          $('.wordCircles div').eq(matchedSlot).find('.item').removeClass('reversed');
        }
        else {
          $('.randomOrderLetters [data-dragid="' + whichLetter + '"]').parent().empty();
        }
      }
      else // TAKEN
      {
        $('.wordCircles div')[matchedSlot].innerHTML = slotFilling;
        $('.randomOrderLetters [data-dragidwrapper="' + replaced + '"]').html(restored); //previous item returns to its drag slot

        if ($('.movingNow').hasClass('reversed')) //if an already socketed item replaces another socketed item
        {
          console.log('already socketed item replaces another');
          $('.wordCircles div')[socketed].innerHTML = "";
          //$('.randomOrderLetters [data-dragidwrapper="' + replaced + '"]').find('.item').removeClass('reversed reversable').css('color', 'red'); //testing
        }
        else {
          $('.randomOrderLetters [data-dragid="' + whichLetter + '"]').parent().empty();
          //$('.randomOrderLetters [data-dragidwrapper="' + replaced + '"]').find('.item').removeClass('reversed reversable').css('color', 'blue'); //testing
        }

        $('.randomOrderLetters [data-dragidwrapper="' + replaced + '"]').find('.item').removeClass('reversed reversable'); //the item returned to its drag slot is "cleared"
      }
      //---------- if slot is empty OR already taken by another letter and we replace it _end ----------

      placed = false;
      checkResult();

      //------- In case we wanted INSTANT winning indication ------->
      //var init = $('.wordCircles div').eq(matchedSlot).find('span').html();
      //var curr = $('.wordCircles div').eq(matchedSlot).attr('data-findletter');
      //if (init == curr)
      //{
      //	if (properSlot < $('.wordCircles div').length - 1)
      //	{
      //		properSlot++;
      //		console.log(properSlot);
      //	}
      //	else
      //	{
      //		//console.log('YAAAAAYYYY...!!!!!'); //WINNING
      //		flag = 1;
      //		checkResult();
      //	}
      //}
    }

    //no longer being movable & targetable --->
    if ($('.item').hasClass('movingNow')) {
      $('.item').removeClass('movingNow');
    }
    if ($('.item').hasClass('dragged')) {
      document.getElementsByClassName('dragged')[0].removeEventListener('mousemove', moveIt, false);
      document.getElementsByClassName('dragged')[0].removeEventListener('touchmove', moveIt, false);
      $('.item').removeClass('dragged');
    }

    document.getElementsByClassName('gamesWrapper')[0].removeEventListener('mousemove', whatsXY, false);
    document.getElementsByClassName('gamesWrapper')[0].removeEventListener('touchmove', whatsXY, false);

    ////////need to be able to unsocket letter 23-7-18  ------->
    var zeItems = document.getElementsByClassName('item');
    for (var i = 0; i < zeItems.length; i++) {
      zeItems[i].addEventListener('mousedown', fingerOn, false);
      zeItems[i].addEventListener('touchstart', fingerOn, false);
    }
  }

  document.addEventListener('mouseup', fingerOff, false);
  document.addEventListener('touchend', fingerOff, false);

  function fingerOn(e) {
    e.preventDefault();
    e.stopPropagation();
    $(".key-pressed").attr("src", "Content/Sounds/btn-press.mp3");
    $(".key-pressed")[0].play();
    whichLetter = $(this).attr('data-dragid');
    $(this).addClass('dragged');
    document.getElementsByClassName('dragged')[0].addEventListener('mousemove', moveIt, false);
    document.getElementsByClassName('dragged')[0].addEventListener('touchmove', moveIt, false);
  }
  // ----------------------- drag and drop thingy  _end -----------------------


  /*$(".play_btn").click(function() {
    //$(".clickSound")[0].play(); //initial code commented - marina 28-3-18
    $(".general-game-sound").attr("src","Content/Sounds/candy-game-sound.mp3");  //added - marina 28-3-18
    $(".general-game-sound")[0].play();  //added - marina 28-3-18
    $(".key-pressed").attr("src","Content/Sounds/btn-press.mp3");  //added - marina 28-3-18
    $(".key-pressed")[0].play();  //added - marina 28-3-18
    $('.mainPanel').hide();
    $('.questionsPanel').fadeIn(0);
    $('.questionContent').hide();
    timer=0;
    timerInterval=setInterval(timerF,30);
    countInterval=setInterval(countdown,1000);
    balls();
  });*/ // -----has bow become ---->

  function playHover(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).addClass('playHover');
  }

  function playClick(e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).removeClass('playHover');

    $(".general-game-sound").attr("src", "Content/Sounds/candy-game-sound.mp3");
    $(".general-game-sound")[0].play();
    $('.mainPanel').hide();
    $('.questionsPanel').fadeIn(0);
    $('.questionContent').hide();
    timer = 0;
    timerInterval = setInterval(timerF, 30);  // comment only for TEEESTIIING !!!
    countInterval = setInterval(countdown, 1000);  // comment only for TEEESTIIING !!!
    balls();

    flag = 0;

    //added it - marina 12-7-18 _start
    $("[data-dragid]").addClass('item');
    // since there are many class items, we want a loop for all of them, jquery would do it for us, but in plain javascript we need to --->
    var zeItems = document.getElementsByClassName('item');
    for (var i = 0; i < zeItems.length; i++) {
      zeItems[i].addEventListener('mousedown', fingerOn, false);
      zeItems[i].addEventListener('touchstart', fingerOn, false);
    }
    //added it - marina 12-7-18 _end
  }

  document.getElementsByClassName('play_btn')[0].addEventListener('mousedown', playHover, false);
  document.getElementsByClassName('play_btn')[0].addEventListener('touchstart', playHover, false);
  document.getElementsByClassName('play_btn')[0].addEventListener('mouseup', playClick, false);
  document.getElementsByClassName('play_btn')[0].addEventListener('touchend', playClick, false);

  /*$(".instr_btn").click(function() {
  	//$(".clickSound")[0].play(); //initial code commented - marina 28-3-18
    $(".key-pressed").attr("src","Content/Sounds/btn-press.mp3");  //added - marina 28-3-18
    $(".key-pressed")[0].play();  //added - marina 28-3-18
    $('.instructionsPanel').show();
    $('.mainPanel').hide();
  });*/ // -----has bow become ---->

  function instrHover(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).addClass('instrHover');
  }

  function instrClick(e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).removeClass('instrHover');

    $('.instructionsPanel').show();
    $('.mainPanel').hide();
  }

  document.getElementsByClassName('instr_btn')[0].addEventListener('mousedown', instrHover, false);
  document.getElementsByClassName('instr_btn')[0].addEventListener('touchstart', instrHover, false);
  document.getElementsByClassName('instr_btn')[0].addEventListener('mouseup', instrClick, false);
  document.getElementsByClassName('instr_btn')[0].addEventListener('touchend', instrClick, false);

  /*$(".back_btn").click(function() {
  	//$(".clickSound")[0].play(); //initial code commented - marina 28-3-18
    $('.mainPanel').show();
    $('.questionsPanel').hide();
    $('.instructionsPanel').hide();
    setTimeout(function(){
      location.reload();
    },80); //delay - marina 28-3-18
    // location.reload(); // initial code commented messes up with the click - no time to trigger sound - marina 28-3-18
  });*/ // -----has bow become ---->

  function backInstrHover(e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).addClass('back_btn_InstrHover');
  }

  function backInstrClick(e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).removeClass('back_btn_InstrHover');

    $(".general-game-sound")[0].pause();
    $('.mainPanel').show();
    $('.questionsPanel').hide();
    $('.instructionsPanel').hide();

    setTimeout(function () {
      location.reload();
    }, 80);
  }

  var zeBkBtns = document.getElementsByClassName('back_btn_Instr');
  for (var i = 0; i < zeBkBtns.length; i++) {
    zeBkBtns[i].addEventListener('mousedown', backInstrHover, false);
    zeBkBtns[i].addEventListener('touchstart', backInstrHover, false);
    zeBkBtns[i].addEventListener('mouseup', backInstrClick, false);
    zeBkBtns[i].addEventListener('touchend', backInstrClick, false);
  }

  /*$(".back_btn_Instr").click(function() {
  	//$(".clickSound")[0].play(); //initial code commented - marina 28-3-18
    $(".key-pressed").attr("src","Content/Sounds/btn-press.mp3");  //added - marina 28-3-18
    $(".key-pressed")[0].play();  //added - marina 28-3-18
    $(".general-game-sound")[0].pause();  //added - marina 28-3-18
    $('.mainPanel').show();
    $('.questionsPanel').hide();
    $('.instructionsPanel').hide();
    setTimeout(function(){
      location.reload();
    },80); //delay - marina 28-3-18
    // location.reload(); // initial code commented messes up with the click - no time to trigger sound - marina 28-3-18
  });*/ // -----has bow become ---->

  function backHover(e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).addClass('back_btn_InstrHover');
  }

  function backClick(e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).removeClass('back_btn_InstrHover');

    $('.mainPanel').show();
    $('.questionsPanel').hide();
    $('.instructionsPanel').hide();
  }

  //the true back from instructions button...
  document.getElementsByClassName('true_back_btn_Instr')[0].addEventListener('mousedown', backHover, false);
  document.getElementsByClassName('true_back_btn_Instr')[0].addEventListener('touchstart', backHover, false);
  document.getElementsByClassName('true_back_btn_Instr')[0].addEventListener('mouseup', backClick, false);
  document.getElementsByClassName('true_back_btn_Instr')[0].addEventListener('touchend', backClick, false);


  /*$(document).on("click", ".exit_btn", function () {
    $(".key-pressed").attr("src","Content/Sounds/btn-press.mp3");  //added - marina 28-3-18
    $(".key-pressed")[0].play();  //added - marina 28-3-18
  	var Main={Type:"GA"};
  	window.name = "Main///"+JSON.stringify(Main);
    setTimeout(function(){
      window.location.href = "../../MainMenu.html";
    },80); //delay - marina 28-3-18
    // window.location.href = "../../MainMenu.html"; // initial code commented messes up with the click - no time to trigger sound - marina 28-3-18
  });*/ // -----has bow become ---->

  function exitHover(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).addClass('exit_btnHover');
  }

  function exitClick(e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).removeClass('exit_btnHover');

    window.name = '{"Type":"GA"}';
    window.location.href = "../../MainMenu.html";
  }

  document.getElementsByClassName('exit_btn')[0].addEventListener('mousedown', exitHover, false);
  document.getElementsByClassName('exit_btn')[0].addEventListener('touchstart', exitHover, false);
  document.getElementsByClassName('exit_btn')[0].addEventListener('mouseup', exitClick, false);
  document.getElementsByClassName('exit_btn')[0].addEventListener('touchend', exitClick, false);


  //----------------------- PREVIOUS CODE for drag and drop _start -----------------------
  /*
  $(document).on("dragover", ".wordCircles,.randomOrderLetters>div", function (e) {
  e.preventDefault();
  });

  $(document).on("drop",".wordCircles>div",function(e) {
  e.preventDefault();
  console.log(e.originalEvent.dataTransfer.getData('dragId'));
  var dragId=e.originalEvent.dataTransfer.getData('dragId');
  if($(this).children().length==1){
  $("[data-dragidwrapper="+ $(this).children().attr("data-dragid") +"]").html($(this).html());
  }
  $(this).html($("[data-dragid="+ dragId +"]"));
  $(".key-release").attr("src","Content/Sounds/btn-release.mp3"); //added - marina 28-3-18
  $(".key-release")[0].play(); //added- marina 28-3-18
  if($(this).attr("data-findletter")==$(this).children().html()){$(this).addClass("letterCorrect");}
  checkResult();
  });

  $(document).on("drop",".randomOrderLetters",function(e) {
  e.preventDefault();
  var dragId=e.originalEvent.dataTransfer.getData('dragId');
  $("[data-dragidwrapper="+ dragId +"]").html($(".wordCircles [data-dragid="+ dragId +"]").parent().html());
  //$(".wordCircles div:nth-child("+ dragId +")").html("<span class='empty'></span>");
  $(".wordCircles [data-dragid="+ dragId +"]").remove();
  });

  $(document).on("dragstart","[data-dragid]", function (e) {
  e.originalEvent.dataTransfer.setData('dragId', $(this).attr("data-dragid"));
  //$(".glass012")[0].play();
  });

  $(document).on("mousedown", "[data-dragidwrapper]", function(e) {
    $(".key-pressed").attr("src","Content/Sounds/btn-press.mp3");  //added - marina 28-3-18
    $(".key-pressed")[0].play();  //added - marina 28-3-18
  }); //added - marina 28-3-18
  */
  //----------------------- PREVIOUS CODE for drag and drop _end -----------------------


  /*$(document).on("click", ".skip_btn:not(.disabled)", function (e) {
    //$(".clickSound")[0].play(); //initial code commented - marina 28-3-18
    $(".key-pressed").attr("src","Content/Sounds/btn-press.mp3");  //added - marina 28-3-18
    $(".key-pressed")[0].play();  //added - marina 28-3-18
    $(".general-game-sound")[0].pause();  //added - marina 28-3-18
    $(this).addClass("disabled");
    //$(".score audio").attr("src","Content/Sounds/wrong.mp3");
    //setTimeout(function () {$(".score audio")[0].play();}, 150);
    $(".feedback").append("<span>Try again!</span><br/><span>This is the word:</span>");
    $(".solved").append("<span>"+currentWord.Q+"</span>");
    if(currentWord.Pic!=""){$(".img_solved").append("<img class='img_solved' src='Images/"+currentWord.Pic+".jpg'></img>"); }
    $(".questionSound").append("<audio src=''>"+currentWord.Sound+"</audio>");
    $(".questionSound audio").attr("src","Sounds/"+currentWord.Sound+".mp3");
    $(".questionSound audio")[0].load();
    $(".questions>div").eq(qNum).addClass("q_red");
    //clearInterval(timerInterval);
    try{clearInterval(timerInterval);}catch(err){}
    try{clearInterval(countInterval);}catch(err){}
    $('.questionsPanel').hide();
    $(".afterPanel_answer").show();
    timer=0;
    sec=45;
  });*/ // -----has bow become ---->

  function skipHover(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!$(this).hasClass('disabled')) {
      $(this).addClass('ctrHover');
    }
  }

  function skipClick(e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).removeClass('ctrHover');

    if (!$(this).hasClass('disabled')) {
      $(".key-pressed").attr("src", "Content/Sounds/btn-press.mp3");
      $(".key-pressed")[0].play();
      $(".general-game-sound")[0].pause();

      $(this).addClass("disabled");

      // ---------- html instead of append or else they were stacking up - marina 27-6-18 _start
      //$(".feedback").append("<span>The word is:</span>");
      //$(".solved").append("<span>" + currentWord.Q + "</span>");
      //if (currentWord.Def != "") { $(".img_solved").append("<p>" + currentWord.Def + "</p>"); }
      $(".feedback").html("<span>This is the word:</span>");
      $(".solved").html("<span>" + currentWord.Q + "</span>");
      if (currentWord.Pic != "") { $(".img_solved").append('<img class="img_solved" src="Images/' + currentWord.Pic + '.jpg"></img>'); }
      // ---------- html instead of append or else they were stacking up - marina 27-6-18 _end

      //materials come straight from amazonaws link now!!! - marina 28-6-18 _start
      $(".questionSound").append('<audio src=""></audio>');
      $('.questionSound audio').attr('src', 'Sounds/' + currentWord.Sound + '.mp3');
      $(".questionSound audio")[0].load();
      //materials come straight from amazonaws link now!!! - marina 28-6-18 _end

      $(".questions>div").eq(qNum).addClass("q_red");
      try { clearInterval(timerInterval); } catch (err) { }
      try { clearInterval(countInterval); } catch (err) { }

      $('.questionsPanel').hide();
      $(".afterPanel_answer").show();
      timer = 0;
      sec = 45;
      flag = 0;
    }
  }

  document.getElementsByClassName('skip_btn')[0].addEventListener('mousedown', skipHover, false);
  document.getElementsByClassName('skip_btn')[0].addEventListener('touchstart', skipHover, false);
  document.getElementsByClassName('skip_btn')[0].addEventListener('mouseup', skipClick, false);
  document.getElementsByClassName('skip_btn')[0].addEventListener('touchend', skipClick, false);


  function shuffleArray(array) { //moved it BEFORE click on shuffle
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  /*$(document).on("click", ".shuffle_btn:not(.disabled)", function (e) {
  	//$(".clickSound")[0].play(); //initial code commented - marina 28-3-18
    $(".shuffle").attr("src","Content/Sounds/shuffle.mp3");  //added - marina 28-3-18
    $(".shuffle")[0].play();  //added - marina 28-3-18
  	do {
  		var tempArray=[];
  		$("[data-dragidwrapper]").each(function( index, value ) {
  		tempArray.push(value);
  		});
  		$(".randomOrderLetters").html("");
  		tempArray=shuffleArray(tempArray);
  		$.each(tempArray, function( index, value ) {
  			$(".randomOrderLetters").append(value);
  		});
  		same=0;
  		for(i=0;i<currentWord.Q.length;i++){
  			if($("[data-dragid]").eq(i).html() == currentWord.Q.charAt(i)){
  				same+=1;
  			}
  		}
  	}
  	while (same == currentWord.Q.length);
  });*/ // -----has bow become ---->

  function shuffleHover(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!$(this).hasClass('disabled')) {
      $(this).addClass('shuffle_btnHover');
    }
  }

  function shuffleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).removeClass('shuffle_btnHover');

    if (!$(this).hasClass('disabled')) {
      $(".shuffle").attr("src", "Content/Sounds/shuffle.mp3");
      $(".shuffle")[0].play();

      do {
        var tempArray = [];
        $("[data-dragidwrapper]").each(function (index, value) {
          tempArray.push(value);
        });
        $(".randomOrderLetters").html("");

        tempArray = shuffleArray(tempArray);

        $.each(tempArray, function (index, value) {
          $(".randomOrderLetters").append(value);
        });
        same = 0;
        for (i = 0; i < currentWord.Q.length; i++) {
          if ($("[data-dragid]").eq(i).html() == currentWord.Q.charAt(i)) {
            same += 1;
          }
        }
      }
      while (same == currentWord.Q.length);
    }
  }

  document.getElementsByClassName('shuffle_btn')[0].addEventListener('mousedown', shuffleHover, false);
  document.getElementsByClassName('shuffle_btn')[0].addEventListener('touchstart', shuffleHover, false);
  document.getElementsByClassName('shuffle_btn')[0].addEventListener('mouseup', shuffleClick, false);
  document.getElementsByClassName('shuffle_btn')[0].addEventListener('touchend', shuffleClick, false);

  /*$(document).on("click", ".reveal_btn:not(.disabled)", function (e) {
  	//$(".clickSound")[0].play(); //initial code commented - marina 28-3-18
    $(".key-pressed").attr("src","Content/Sounds/btn-press.mp3");  //added - marina 28-3-18
    $(".key-pressed")[0].play();  //added - marina 28-3-18
    var randomR=randomGenerator(0,$(".randomOrderLetters [data-dragid]").length-1);
    $("[data-findletter]").each(function( index, value ) {
    if(!$(this).children().is("[data-dragid]")){
    if($(this).attr("data-findletter")==$(".randomOrderLetters [data-dragid]")[randomR].innerHTML){
    $(this).html($("[data-dragid="+ $(".randomOrderLetters [data-dragid]").eq(randomR).attr("data-dragid") +"]")).addClass("letterCorrect");
    return false;
    }
    }
    });
    checkResult();
    $(this).addClass("disabled");
  });*/ // -----has bow become ---->

  function revealHover(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!$(this).hasClass('disabled')) {
      $(this).addClass('ctrHover');
    }
  }

  function revealClick(e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).removeClass('ctrHover');

    if (!$(this).hasClass('disabled')) {
      $(".key-pressed").attr("src", "Content/Sounds/btn-press.mp3");
      $(".key-pressed")[0].play();

      var randomR = randomGenerator(0, $(".randomOrderLetters [data-dragid]").length - 1); //random INDEX of the helper letter to appear

      //$("[data-findletter]").each(function (index, value) {
      //	if (!$(this).children().is("[data-dragid]"))
      //	{
      //		if ($(this).attr("data-findletter") == $(".randomOrderLetters [data-dragid]")[randomR].innerHTML)
      //		{
      //			$(this).html($("[data-dragid=" + $(".randomOrderLetters [data-dragid]").eq(randomR).attr("data-dragid") + "]")).addClass("letterCorrect");
      //			//return false;
      //		}
      //	}
      //});

      var emerged = $(".randomOrderLetters [data-dragid]").eq(randomR).html();

      $("[data-findletter]").each(function (index, value) {
        if ($(this).is(':empty') && $(this).attr("data-findletter") == emerged) {
          $(this).html($(".randomOrderLetters [data-dragid]")[randomR].outerHTML).addClass("letterCorrect");
          $(".randomOrderLetters [data-dragid]").eq(randomR).parent().empty();
          return false;// if you find a letter stop iteration 
        }
      });

      checkResult();
      $(this).addClass("disabled");
    }
  }

  document.getElementsByClassName('reveal_btn')[0].addEventListener('mousedown', revealHover, false);
  document.getElementsByClassName('reveal_btn')[0].addEventListener('touchstart', revealHover, false);
  document.getElementsByClassName('reveal_btn')[0].addEventListener('mouseup', revealClick, false);
  document.getElementsByClassName('reveal_btn')[0].addEventListener('touchend', revealClick, false);

  /*$(document).on("click", ".hint_btn:not(.disabled)", function (e) {
  	//$(".clickSound")[0].play(); //initial code commented - marina 28-3-18
    $(".key-pressed").attr("src","Content/Sounds/btn-press.mp3");  //added - marina 28-3-18
    $(".key-pressed")[0].play();  //added - marina 28-3-18
    $(".revealHint").html("<img src='Images/"+currentWord.Pic+".jpg'></img>").addClass("revealHintVisible");
    $(this).addClass("disabled");
  });*/ //  -----has bow become ---->

  function hintHover(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!$(this).hasClass('disabled')) {
      $(this).addClass('ctrHover');
    }
  }

  function hintClick(e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).removeClass('ctrHover');

    if (!$(this).hasClass('disabled')) {
      $(".key-pressed").attr("src", "Content/Sounds/btn-press.mp3");
      $(".key-pressed")[0].play();
      $(".revealHint").html('<img class="img_solved" src="Images/' + currentWord.Pic + '.jpg">').addClass("revealHintVisible");

      $(this).addClass("disabled");
    }
  }

  document.getElementsByClassName('hint_btn')[0].addEventListener('mousedown', hintHover, false);
  document.getElementsByClassName('hint_btn')[0].addEventListener('touchstart', hintHover, false);
  document.getElementsByClassName('hint_btn')[0].addEventListener('mouseup', hintClick, false);
  document.getElementsByClassName('hint_btn')[0].addEventListener('touchend', hintClick, false);


  function checkEnd(){
    $(".questionsPanel").hide();
    $(".afterPanel_answer").show();
    flag = 0; //added - marina
  } //moved before checkResult where it is used

  function checkResult(){
  	var flag=1;
  	$(".wordCircles div:not([data-findletter-space]").each(function( index, value ) {
  	   if($(this).attr("data-findletter")!=$(this).children().html()){flag=0;}
  	});
  	if(flag==1){
  		//$(".score audio").attr("src","Content/Sounds/wahoo.mp3"); //initial code commented - marina 28-3-17
  		//setTimeout(function () {$(".score audio")[0].play();}, 150); //initial code commented - marina 28-3-17
  	  $(".general-game-sound")[0].pause();  //added - marina 28-3-18
  	  $(".correct").attr("src","Content/Sounds/correct.mp3");  //added - marina 28-3-18
  	  $(".correct")[0].play();  //added - marina 28-3-18
    	$(".feedback").append("<span>Well done!</span><br/><span>You found the word:</span>");
    	$(".solved").append("<span>"+currentWord.Q+"</span>");
    	if(currentWord.Pic!=""){$(".img_solved").append("<img class='img_solved' src='Images/"+currentWord.Pic+".jpg'></img>"); }
    	$(".questionSound").append("<audio src=''>"+currentWord.Sound+"</audio>");
    	$(".questionSound audio").attr("src","Sounds/"+currentWord.Sound+".mp3");
    	$(".questionSound audio")[0].load();
    	$(".questions>div").eq(qNum).addClass("q_green");
    	points=points+sec;
    	$(".points").html(points);
    	try{clearInterval(timerInterval);}catch(err){}
    	try{clearInterval(countInterval);}catch(err){}
    	checkEnd();
  	}
  	else{
  	}
  } // ----- has now become -------->

  // function checkResult() {

  //   var init = $('.wordCircles div:not([data-findletter-space])').eq(matchedSlot).find('span').html();
  //   var curr = $('.wordCircles div:not([data-findletter-space])').eq(matchedSlot).attr('data-findletter');

    
  //   if (init == curr && !$('.wordCircles div:not([data-findletter-space])').is(':empty')) {
  //     flag = 1;
  //     console.log(flag);
  //   }

  //   if (flag == 1) //set already when moving over drop
  //   {
  //     $(".general-game-sound")[0].pause();
  //     $(".correct").attr("src", "Content/Sounds/correct.mp3");
  //     $(".correct")[0].play();

  //     // ---------- html instead of append or else they were stacking up - marina 27-6-18 _start
  //     //$(".feedback").append("<span>Well done!</span><br/><span>You found the word:</span>");
  //     //$(".solved").append("<span>" + currentWord.Q + "</span>");
  //     //if (currentWord.Def != "") { $(".img_solved").append("<p>" + currentWord.Def + "</p>"); }
  //     $(".feedback").html("<span>Well done!</span><br/><span>You found the word:</span>");
  //     $(".solved").html("<span>" + currentWord.Q + "</span>");
  //     if (currentWord.Pic != "") {
  //       $(".img_solved").append('<img class="img_solved" src="Images/' + currentWord.Pic + '.jpg"></img>');
  //     }
  //     // ---------- html instead of append or else they were stacking up - marina 27-6-18 _end

  //     //materials come straight from amazonaws link now!!! - marina 28-6-18 _start
  //     $(".questionSound").append('<audio src=""></audio>');
  //     $('.questionSound audio').attr('src', 'Sounds/' + currentWord.Sound + '.mp3');
  //     $(".questionSound audio")[0].load();
  //     //materials come straight from amazonaws link now!!! - marina 28-6-18 _end

  //     $(".questions>div").eq(qNum).addClass("q_green");

  //     points = points + sec;
  //     $(".points").html(points);

  //     try { clearInterval(timerInterval); } catch (err) { }
  //     try { clearInterval(countInterval); } catch (err) { }

  //     checkEnd();
  //   }
  //   else { }
  // }


  /*$(document).on("click", ".speaker", function (e) {
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
  }*/	//there is no speaker...only speakerAnswer...

  /*$(document).on("click", ".speaker_answer", function (e) {
  $(".questionSound audio")[0].currentTime=0;
  $(".questionSound audio")[0].play();
  });*/ //  -----has bow become ---->

  function speakerAnswerHover(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).addClass('speaker_answerHover');
  }

  function speakerAnswerClick(e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).removeClass('speaker_answerHover');

    $(".questionSound audio")[0].currentTime = 0;
    $(".questionSound audio")[0].play();
  }

  document.getElementsByClassName('speaker_answer')[0].addEventListener('mousedown', speakerAnswerHover, false);
  document.getElementsByClassName('speaker_answer')[0].addEventListener('touchstart', speakerAnswerHover, false);
  document.getElementsByClassName('speaker_answer')[0].addEventListener('mouseup', speakerAnswerClick, false);
  document.getElementsByClassName('speaker_answer')[0].addEventListener('touchend', speakerAnswerClick, false);

  /*$(document).on("click", ".plagain_btn", function() {
  	//$(".clickSound")[0].play(); //initial code commented - marina 28-3-18
  $('.mainPanel').show();
  $('.questionsPanel').hide();
  $('.afterPanel_winner').hide();
  $('.instructionsPanel').hide();
  $('.afterPanel_answer').hide();
  $('.afterContainer').hide();
  setTimeout(function(){
    location.reload();
  },80); //delay - marina 28-3-18
  // location.reload(); // initial code commented messes up with the click - no time to trigger sound - marina 28-3-18
  });*/ //there is no play again button...

  /*$(document).on("click", ".continue_answer", function (){
  	//$(".clickSound")[0].play(); //initial code commented - marina 28-3-18
    $(".key-pressed").attr("src","Content/Sounds/btn-press.mp3");  //added - marina 28-3-18
    $(".key-pressed")[0].play();  //added - marina 28-3-18
    $(".general-game-sound")[0].play();  //added - marina 28-3-18
  qNum++;
  console.log(qNum);
  if(qNum == 7){
  gameEnd();
  }
  else{
  fetchWord();
  $('.afterPanel_answer').hide();
  $('.questionsPanel').show();
  balls();
  $(".feedback,.solved,.img_solved").html("");
  $(".img_solved").attr("src","");
  $(".barBlue").css("width","100%");
  $(".countdown").css("left", "588px");
  sec=45;
  timer=0;
  document.getElementById("countdown").innerHTML=45;
  timerInterval=setInterval(timerF,30);
  countInterval=setInterval(countdown,1000);
  var left=qNum+1;
  $(".qCurrent").attr("data-question",left);
  }
  });*/ //  -----has bow become ---->

  function continueAnswerHover(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).addClass('continue_answerHover');
  }

  function continueAnswerClick(e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).removeClass('continue_answerHover');

    $(".general-game-sound")[0].play();
    qNum++;
    if (qNum == 7) {
      gameEnd();
    }
    else {
      fetchWord();
      $('.afterPanel_answer').hide();
      $('.questionsPanel').show();

      balls();

      $(".feedback,.solved,.img_solved").html("");
      $(".img_solved").attr("src", "");
      $(".barBlue").css("width", "100%");
      sec = 45;
      timer = 0;
      $("#countdown span").html(sec);
      timerInterval = setInterval(timerF, 30);
      countInterval = setInterval(countdown, 1000);

      var left = qNum + 1;
      $(".qCurrent").attr("data-question", left);
    }

    flag = 0;

    //reinitiate event
    $("[data-dragid]").addClass('item');
    var zeItems = document.getElementsByClassName('item');
    for (var i = 0; i < zeItems.length; i++) {
      zeItems[i].addEventListener('mousedown', fingerOn, false);
      zeItems[i].addEventListener('touchstart', fingerOn, false);
    }
  }

  document.getElementsByClassName('continue_answer')[0].addEventListener('mousedown', continueAnswerHover, false);
  document.getElementsByClassName('continue_answer')[0].addEventListener('touchstart', continueAnswerHover, false);
  document.getElementsByClassName('continue_answer')[0].addEventListener('mouseup', continueAnswerClick, false);
  document.getElementsByClassName('continue_answer')[0].addEventListener('touchend', continueAnswerClick, false);

  function timerF(){
    timer+=1;
    //console.log(timer);
    $(".barBlue").css("width",timer/15+"%");
    if(timer>=1510){};
  }

  function countdown() {
  	sec-=1;
  	document.getElementById("countdown").innerHTML=sec;
  	if (sec < 10){$(".countdown").css("left", "602px")};
  	if(sec==0){
  		//$(".score audio").attr("src","Content/Sounds/wrong.mp3");  //initial code commented - marina 28-3-18
  		//setTimeout(function () {$(".score audio")[0].play();}, 150);  //initial code commented - marina 28-3-18
  		$(".general-game-sound")[0].pause();  //added - marina 28-3-18
  		$(".wrong").attr("src","Content/Sounds/wrong.mp3");  //added - marina 28-3-18
  		$(".wrong")[0].play();  //added - marina 28-3-18
  		$(".feedback").append("<span>Try again!</span><br/><span>This is the word:</span>");
  		$(".solved").append("<span>"+currentWord.Q+"</span>");
  		if (currentWord.Pic != "") { $(".img_solved").append('<img class="img_solved" src="Images/' + currentWord.Pic + '.jpg"></img>'); }
  		//$(".questionSound").append("<audio src=''>"+currentWord.Sound+"</audio>"); //hmmm??!...
  		$(".questionSound").append("<audio src=''></audio>");
  		$(".questionSound audio").attr('src', 'Sounds/' + currentWord.Sound + '.mp3');
  		$(".questionSound audio")[0].load();
  		$(".questions>div").eq(qNum).addClass("q_red");
  		//clearInterval(timerInterval);
  		try{clearInterval(timerInterval);}catch(err){}
  		try{clearInterval(countInterval);}catch(err){}
  		$('.questionsPanel').hide();
  		$(".afterPanel_answer").show();
  		timer=0;
  		sec=45;
  	}
  }

  var readySpriteWon = new Image();
  var readySpriteLost = new Image();
  readySpriteWon.src = "Content/Images/candy2.png";
  readySpriteLost.src = "Content/Images/tryAgain-total.png";

  readySpriteWon.onload = function() {
    $(".result1").addClass('hasWon');
  };

  readySpriteLost.onload = function() {
    $(".result2").addClass('hasLost');
  };

  function gameEnd(){
    $('.afterPanel_answer').hide();
    $('.questionsPanel').hide();
    $(".fScore").html("<span>"+points+"</span>");
    if(points>35)
    {
      $(".result2").css("display","none");
      $(".afterPanel_winner").css("cssText","background: url('Content/images/BGF.jpg') center no-repeat;");
      $(".hasWon").addClass('wellDone2');
    }
    else
    {
      $(".result1").css("display","none");
      $(".afterPanel_winner").css("cssText","background: url('Content/images/BG.jpg') center no-repeat;");
      $(".hasLost").addClass('tryAgain');
    }
    $('.afterPanel_winner').show();
  }

});

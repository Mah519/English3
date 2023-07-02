var introLock=0;
var videoInterval;
var targetSub=0;
var projectName="Young Stars 1 BR";
//version 1.0
var Subs=[






];
var subs;
var videoCurrent=1;
var scale=1;




if(window.name=="First"){
introLock=1	;

}



function coords(e,rel){
	var IWB= $(".IWB").offset();
	var click={};
	var box={};
	var str={};
	try{
		if(e.originalEvent){
			click.top=e.originalEvent.changedTouches[0].clientY;
			click.left=e.originalEvent.changedTouches[0].clientX;
		}
		else{
			click.top=e.changedTouches[0].clientY;
			click.left=e.changedTouches[0].clientX;

		}
	}
	catch(err){
		click.top=e.clientY;
		click.left=e.clientX;
	}
	box.top  = $(rel).offset().top;
	box.left = $(rel).offset().left;

	str.top=(click.top-box.top)/scale;
	str.left=(click.left-box.left)/scale;

	return str;
}


$( document ).ready(function() {
var version ="1.0"
$(".IWBVersion").append(version);

$("body").append('<audio class="clickSound"><source src="Audio/Click.mp3" type="audio/mpeg"></audio>');
$("body").append("<div class='preLoadLogo'><img src='Images/Main/logoMain2.png' /></div>");//preload 2nd logo

if($(window).width()<1280 || $(window).height()<960){
	if($(window).height()/$(window).width()>0.75){
		scale=$(window).width()/1280;
	$('.IWB').css({'-webkit-transform': 'scale(' + scale + ')'});
	$('.IWB').css({'-ms-transform': 'scale(' + scale + ')'});
	$('.IWB').css({'transform': 'scale(' + scale + ')'});
	$('.IWB').css({'left': '0px'});
	$('.IWB').css({'top': ($(window).height()-(scale*960))/2+ 'px'});

	}
	else{
		scale=$(window).height()/960;
	$('.IWB').css({'-webkit-transform': 'scale(' + scale + ')'});
	$('.IWB').css({'-ms-transform': 'scale(' + scale + ')'});
	$('.IWB').css({'transform': 'scale(' + scale + ')'});
	$('.IWB').css({'left': ($(window).width()-(scale*1280))/2+ 'px'});
	$('.IWB').css({'top':'0px'});

		}
}
else{
$('.IWB').css({'left': ($(window).width()-1280)/2+ 'px'});
$('.IWB').css({'top': ($(window).height()-960)/2+ 'px'});
}


var imgs = document.images,
    len = imgs.length,
    counter = 0;

$("img").each( function( ) {	
	$(this).on('load', incrementCounter ).on('error',incrementCounter).attr("src", $(this).attr("src")+ "?" + new Date().getTime());	
});//fix



function incrementCounter() {
    counter++;
    if ( counter === len ) {
        $(".IWB").removeClass("loading");
		try{
			if(JSON.parse(window.name)){
			var cor=JSON.parse(window.name);
				console.log(cor);
				if(cor.Module){
					showLesson(cor.Type,cor.Module);
				}
				if(cor.Type=="GA")
				{
					showLesson(cor.Type,cor.Module);
					$(".logoImg img").attr("src","Images/Main/logoMain2.png");
					$(".slideshow img").attr("src","Images/Main/main.jpg");
					$(".logoImg").css("top","1px");
					$(".logoImg").css("left","40px");
				}
			}
		}
		catch(err){}
		window.name = null;
		 if(introLock==1)
		{
			$(".intro").append("<div class='playIntroSound'>Let's start</div>");

			$(".IWB").addClass("IntroActive");





		}
    }
}



 $(document).on("click", ".playIntroSound", function (e) {
	e.stopPropagation();
	$(this).remove();
	$(".intro audio")[0].addEventListener("ended", function(){
		$(".IntroActive").removeClass("IntroActive");
	});
	$(".intro").addClass("introNext");
	$(".intro audio")[0].play();
});




$(document).on("click", ".introNext", function () {
	$(".IntroActive").removeClass("IntroActive");
	$(".intro audio")[0].pause();
});



$(document).on("click", "[data-moduletarget]", function () {
	$(".mainModules,[data-module]").fadeOut(0);
	$(".mainLessons,[data-module="+ $(this).attr("data-moduletarget") +"]").fadeIn(0);
});

$(document).on("click", ".lessonBack", function () {
	$(".mainLessons").fadeOut(0);
	$(".mainModules").fadeIn(0);
});

$(document).on("click", ".lessonBack", function () {
	$(".mainLessons").fadeOut(0);
	$(".mainModules").fadeIn(0);
});

$(document).on("click", "[data-game]", function () {

	window.name = "GameModule:"+$(this).closest("[data-gamemodule]").attr("data-gamemodule");
	window.open("Games/"+ $(this).attr("data-game") +"/"+$(this).attr("data-game")+".html",'_self')


});



$(document).on("click", ".slideshowButtonWrapper>span", function () {

	$(".slideshowButtonActive").removeClass("slideshowButtonActive");
	$(this).addClass("slideshowButtonActive");
	$(".slideshow img:first-child").css("margin-left",-$(this).index()*1280+"px")
});



$(document).on("click", "[data-extramodule]>span", function () {
	if($(this).parent().hasClass("modulesExtraExp")){
		$(".modulesExtraExp .modulesExtraSub").slideUp();
		$(".modulesExtraExp").removeClass("modulesExtraExp");
		}
	else{$(".modulesExtraExp .modulesExtraSub").slideUp();
		$(".modulesExtraExp").removeClass("modulesExtraExp");
		$(this).parent().addClass("modulesExtraExp");
		$(this).siblings(".modulesExtraSub").slideDown();

	}
});

$(document).on("click", ".modulesTrigger", function () {
	$(".modulesExtra").slideToggle();
	$(".modulesExtraExp .modulesExtraSub").slideToggle();
	$(".modulesExtraExp").removeClass("modulesExtraExp");
});

$(document).on("mousedown", "[data-game],[data-second]:not([data-second=PG]) .secondCustomTiles>div>div,.mainBtn,[data-second]:not([data-second=VW]):not([data-second=PM]) .secondButton:not(.demoButton),[data-extramodule]>span,.modulesExtraSub>span,.secondImages div,[data-secondmodule][data-gotoframe],[data-video],.demoGrammar svg,.demoButton svg,.secondBackbtn,.primaryBtns>g,.homeBtn.mainActive,.exitBtn.mainActive,.videoPlayBtn svg,.audioPause ~ .stopBtn svg,.videoPause ~ .videostopBtn svg,.closeVideo ", function (e) {
	$(".clickSound")[0].play();
	e.preventDefault();
	$(this).addClass("pressed");
});



$(document).on("mouseenter touchstart", "[data-game],[data-second]:not([data-second=PG]) .secondCustomTiles>div>div,.mainBtn,[data-second]:not([data-second=VW]):not([data-second=PM]) .secondButton:not(.demoButton),[data-extramodule]>span,.modulesExtraSub>span,.secondImages div,[data-secondmodule][data-gotoframe],[data-video],.demoGrammar svg,.demoButton svg,.secondBackbtn,.primaryBtns>g,.homeBtn.mainActive,.exitBtn.mainActive,.videoPlayBtn svg,.audioPause ~ .stopBtn svg,.videoPause ~ .videostopBtn svg,.closeVideo ", function (e) {
	e.preventDefault();
	$(this)[0].classList.add("pressed");
});

$(document).on("mouseup", function () {
	try{$(".pressed")[0].classList.remove("pressed");}catch(err){}
});
$(document).on("mouseleave touchend", "[data-game],[data-second]:not([data-second=PG]) .secondCustomTiles>div>div,.mainBtn,[data-second]:not([data-second=VW]):not([data-second=PM]) .secondButton:not(.demoButton),[data-extramodule]>span,.modulesExtraSub>span,.secondImages div,[data-secondmodule][data-gotoframe],[data-video],.demoGrammar svg,.demoButton svg,.secondBackbtn,.primaryBtns>g,.homeBtn.mainActive,.exitBtn.mainActive,.videoPlayBtn svg,.audioPause ~ .stopBtn svg,.videoPause ~ .videostopBtn svg,.closeVideo ", function (e) {
	try{$(".pressed")[0].classList.remove("pressed");}catch(err){}

});


$(document).on("click", "[data-secondtarget]", function () {
	$(".secondVisible").removeClass("secondVisible");
	$("[data-second]").fadeOut(0);
	$("[data-second="+ $(this).attr("data-secondtarget") +"],.secondButtonWrapper").fadeIn(0);
	$("[data-second="+ $(this).attr("data-secondtarget") +"]").addClass("secondVisible");
	showSecondLevel();
	$(".logoImg img").attr("src","Images/Main/logoMain2.png");
	$(".logoImg").css("top","1px");
	$(".logoImg").css("left","40px");
});

$(document).on("click", "[data-goto]", function () {

	var splitTxt=$(this).attr("data-goto").split(";");
	if(splitTxt[1]){window.name = '{"Frame":"'+splitTxt[1]+'"}';}
	setTimeout(function(){window.location.href = splitTxt[0] +".html";}, 200);
});

$(document).on("click", "[data-video]", function () {
	$(".IWB").addClass("loading");
	$(".videoWrapper source").attr("src","Video/"+ $(this).attr("data-video") +".mp4");
	$(".videoWrapper").css("display","block");
	vFlag=1;
	targetSub=$(this).attr("data-targetsub");
	$(".videoWrapper video")[0].load();
	$(".videoWrapper video")[0].play();

	videoCurrent=1;
});

$('.videoWrapper video').on('canplay', function(){
	if(vFlag==1){
	$(".playBtn").removeClass("playBtn").addClass("pauseBtn");
	$(".subsOn").addClass("subsOff");
	$(".subsSpan").html("");
	$(".subsSpan").fadeOut(0);
	$("[data-videopart]").remove();

	if(value.Parts){
		$.each(value.Parts, function( index2, value2 ) {
						var left=value2.time/1000/$(".videoWrapper video")[0].duration*289-1.5+"px";
			$(".videoBar").append("<div data-videopart="+ value2.time +" style='left:"+ left +"'>"+ (index2+1) +"</div>");
		});
	}
	if(targetSub){
		$.each(Subs, function( index, value ) {
			if(value.id==targetSub){subs=value.SubsArray;
			return false;}

		});
	};
	vFlag=0;
	videoInterval=setInterval(videoBar,20);
		$(".IWB").removeClass("loading");
}

});

$(document).on("click", ".videoPause", function () {


	$(".videoWrapper video")[0].pause();
	$(".videoPause").removeClass("videoPause");

	clearInterval(videoInterval);

});

 $(document).on("click", ".videoPlayBtn:not(.videoPause)", function () {
	$(".videoWrapper video")[0].play();
	$(this).addClass("videoPause");
	videoInterval=setInterval(videoBar,20);
});

$(document).on("click", ".closeVideo", function () {
	clearVideo();
	$(".videoWrapper").fadeOut(0);
});

$(document).on("click", ".subsOff", function () {
	$(".subsOff").removeClass("subsOff");
	$(".subsSpan").fadeIn(0);
});

$(document).on("click", ".subsOn:not(.subsOff)", function () {
	$(".subsOn").addClass("subsOff");
	$(".subsSpan").fadeOut(0);
	});

$(document).on("click", ".videobarRedW", function (e) {
	$(".subsSpan").html("");
	if(!$(e.target).is("[data-videopart]")){
    clearInterval(videoInterval);
	var left=coords(e,".videobarRedW").left;
	var percentage = (left)/$(this).width();
	var crTime=percentage*$(".videoContainer video")[0].duration*1000;
	$(".videoContainer video")[0].currentTime=percentage*$(".videoContainer video")[0].duration;
	
	$.each(subs, function( index, value ) {
		if(index==0&&value.Start>crTime){
			$(".subsSpan").html("");videoCurrent=1;return false;
			}
		try{
			if(value.Start<crTime){
				videoCurrent=index+1;
				if(value.End>crTime){
					$(".subsSpan").html(subs[videoCurrent-2].Text);
				}
				return false;
			}
		}catch(err){}
	});
	videoInterval=setInterval(videoBar,20);
	}
});

$(document).on("click", "[data-videopart]", function (e) {
	$(".subsSpan").html("");
    clearInterval(videoInterval);

	$(".videoContainer video")[0].currentTime=$(this).attr("data-videopart")/1000;
	var crTime=$(".videoContainer video")[0].currentTime;
	$.each(subs, function( index, value ) {
		if(index==0&&value.Start>crTime){$(".subsSpan").html("");videoCurrent=1;return false;}
		try{if(value.Start<crTime){videoCurrent=index+1;if(value.End>crTime){$(".subsSpan").html(subs[videoCurrent-2].Text);}return false;}
		}catch(err){}
	});
	videoInterval=setInterval(videoBar,20);
});

$(document).on("click", ".videoPause ~ .videostopBtn svg", function () {


		clearVideo();
		$(".videoPlayBtn").removeClass("videoPause");
});

$('.videoContainer video').on('ended', function() {
   clearVideo();
	$(".pauseBtn").removeClass("pauseBtn").addClass("playBtn");
	$(".videoWrapper").fadeOut(0);

});

$(document).on("click", "[data-secondmodule]:not([data-gotoframe])", function () {

		$(".secondButtonHidden").removeClass("secondButtonHidden");
		$(this).addClass("secondButtonHidden");
		$(".secondMore").html($(this).html());
		$("[data-second=CD] .secondLevelHeader span").html($(this).attr("data-secondmodule"));

		$(".secondMore").attr("data-secondtargetmodule",$(this).attr("data-secondmodule"));
		$(".secondMore").fadeIn(0);
		$(".secondButtonWrapper").fadeOut(0);


});

$(document).on("click", "[data-gotoframe]", function () {

	window.name = '{"Frame":"'+ $(this).attr("data-gotoframe")+'"}';
	var loc="CD/Frames.html";
	setTimeout(function(){window.location.href = loc;}, 200);


});

$(document).on("click", "[data-type='VC']:not([data-disabled])", function () {

	if($(this).parents("[data-extramodule]").length>0){
		window.name = '{"GlossaryMain":"'+ $(this).closest("[data-extramodule]").attr("data-extramodule")+'"}';
	}
	setTimeout(function(){window.location.href = "EX/Vocabulary.html";}, 200);
});

$(document).on("click", "[data-type='ABC']:not([data-disabled])", function () {

	setTimeout(function(){window.location.href = "EX/ABCBook.html";}, 200);
});


$(document).on("click", "[data-extra]", function () {
	showLesson($(this).attr("data-extra"),$(this).closest("[data-extramodule]").attr("data-extramodule"));

});

$(document).on("click", ".modulesExtraSub span", function () {
$(".modulesExtra").fadeOut(0);

});











$(document).on("click", ".secondBackbtn", function () {
	var inp=$(".secondVisible").attr("data-second");
	console.log(inp);
	if(inp=="GA"){$(".logoImg img").attr("src","Images/Main/logoMain.png");$(".logoImg").css("top","80px");$(".logoImg").css("left","418px");}
	else{
		if($(".secondVisible .secondMore").html().length>20){}
		else{$(".logoImg img").attr("src","Images/Main/logoMain.png");$(".logoImg").css("top","80px");$(".logoImg").css("left","418px");}
	}
	$("[data-second=CD] .secondLevelHeader span").html("Student's book");
	try
	{
		
		if($(".secondVisible .secondMore").html().length>20){
			
			$(".secondVisible .secondButtonWrapper").fadeIn(0);
			$(".secondVisible .secondMore").fadeOut(0).html("");
			$(".secondButtonHidden").removeClass("secondButtonHidden");		
		}
		else{
			
			$("[data-second]").fadeOut(0);
			showFirstLevel();
			$(".main [data-secondtarget]").each(function( index, value ) {			
				if($(this).attr("data-secondtarget")==inp){
					if($(this).closest("[data-second]").length>0){$(this).closest("[data-second]").fadeIn(0);
					showSecondLevel();}
					return false;}
			});	
		}
	}
	
	catch(err){
		$("[data-second]").fadeOut(0);
		showFirstLevel();
		$(".main [data-secondtarget]").each(function( index, value ) {		
		if($(this).attr("data-secondtarget")==inp){
			if($(this).closest("[data-second]").length>0){$(this).closest("[data-second]").fadeIn(0);
			showSecondLevel();}
			return false;
			}
	});
	}
	
	
});



$(document).on("click", ".homeBtn", function () {
	showFirstLevel();
});


function showSecondLevel(){
	$(".firstLevel").fadeOut(0);
	$(".secondLevel").fadeIn(0);

	console.log("Fade in second");
	$(".homeBtn").attr("class","homeBtn mainActive");

}

function showFirstLevel(){
	$(".secondButtonHidden").removeClass("secondButtonHidden");
	$(".secondMore").html("");
	$(".secondLevel").fadeOut(0);
	$(".firstLevel").fadeIn(0);
	$(".homeBtn").attr("class","homeBtn mainInactive");
	$(".secondVisible").removeClass("secondVisible");
}

function showLesson(second,module){
	$(".secondVisible").removeClass("secondVisible");
	$("[data-second]").fadeOut(0);
	$("[data-second="+ second +"]").fadeIn(0).addClass("secondVisible");


	var inp=$("[data-second="+ second +"] [data-secondmodule="+ module +"]>div:first-child");
	$(".secondButtonHidden").removeClass("secondButtonHidden");
	inp.parent().addClass("secondButtonHidden");
	$(".secondMore").html(inp.closest(".secondButton").html()).attr("data-secondtargetmodule",module);
	$(".secondMore").slideDown(0);
	$(".secondButtonWrapper").fadeOut(0);

	showSecondLevel();
	$(".modulesExtra").slideUp(0);
	$(".modulesExtraExp .modulesExtraSub").slideUp(0);
	$(".modulesExtraExp").removeClass("modulesExtraExp");

}

function clearVideo(){
try{
clearInterval(videoInterval);
}
	catch(err){}
$(".videoContainer video")[0].pause();
try{$(".videoContainer video")[0].currentTime=0;}catch(err){}
$(".videoPlayBtn").addClass("videoPause");
$(".videoTimer").html("00:00");
$(".videobarRed").css("width","0px");
videoCurrent=1;

}

function videoBar(){
var percentage=$(".videoContainer video")[0].currentTime/$(".videoContainer video")[0].duration;
var phrTime=$(".videoContainer video")[0].currentTime*1000;
if(percentage>1){percentage=1;}
var soundBarWidth=$(".videoBar").width();
var bWidth=percentage*(soundBarWidth-24);
$(".videoBar .videobarRed").css("width",bWidth+"px");
if ((bWidth*0.8+10)<27){$(".videoBar .videobarRed").css("height",(bWidth*0.8+10)+"px");$(".videoBar .videobarRed").css("border-radius","100%");}
else{$(".videoBar .videobarRed").css("height","26px");$(".videoBar .videobarRed").css("border-radius","20px");}

var tr = minTwoDigits(Math.floor(($(".videoContainer video")[0].currentTime + 1) / 60)) + ":" + minTwoDigits(Math.ceil($(".videoContainer video")[0].currentTime) % 60);
$(".videoTimer").html(tr);
if(subs){
	try{if(phrTime>=subs[videoCurrent-1].Start){
			$(".subsSpan").html(subs[videoCurrent-1].Text);
		}
	}catch(err){}

	try{if(phrTime>=subs[videoCurrent-1].End){
			$(".subsSpan").html("");
			videoCurrent++;
		}
	}catch(err){}
}
}

function minTwoDigits(n) {
		return (n < 10 ? '0' : '') + n;
	}



$(window).resize(function() {



  if($(window).width()<1280 || $(window).height()<960){
	if($(window).height()/$(window).width()>0.75){
		scale=$(window).width()/1280;

	$('.IWB').css({'-webkit-transform': 'scale(' + scale + ')'});
	$('.IWB').css({'-ms-transform': 'scale(' + scale + ')'});
	$('.IWB').css({'transform': 'scale(' + scale + ')'});
	$('.IWB').css({'left': '0px'});
	$('.IWB').css({'top': ($(window).height()-(scale*960))/2+ 'px'});

	}
	else{
		scale=$(window).height()/960;
	$('.IWB').css({'-webkit-transform': 'scale(' + scale + ')'});
	$('.IWB').css({'-ms-transform': 'scale(' + scale + ')'});
	$('.IWB').css({'transform': 'scale(' + scale + ')'});
	$('.IWB').css({'left': ($(window).width()-(scale*1280))/2+ 'px'});
	$('.IWB').css({'top':'0px'});

		}
}

else{
$('.IWB').css({'-webkit-transform': 'scale(1)'});
	$('.IWB').css({'-ms-transform': 'scale(1)'});
	$('.IWB').css({'transform': 'scale(1)'});
$('.IWB').css({'left': ($(window).width()-1280)/2+ 'px'});
$('.IWB').css({'top': ($(window).height()-960)/2+ 'px'});
}

});


});

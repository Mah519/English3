// V.1.4 
$( document ).ready(function() {
var mod=4;	
var cor=window.name.split(":");
if(cor[0]=="GameModule"){mod=cor[1]}

Questions=[];Original=[];


var scale;
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
  var cor=window.name.split(":");

  if(cor[0]=="GameModule"){
    mod=cor[1];
  }
//content start

if(mod==2){
	Questions[0]={Q:"A: Who's that? B: _______",A1:"It's my sister.",A2:"It's my bag.",Pic:"sister",Correct:"1",Sound:"YSA_M02_1_01",Markers:[0.147392,1.441497]};
	Questions[1]={Q:"A: What's this? B: _______",A1:"It's a rubber.",A2:"It's my mum.",Pic:"rubber",Correct:"1",Sound:"YSA_M02_1_02",Markers:[0.000000,1.180612]};
	Questions[2]={Q:"That's my _______.",A1:"grandfather",A2:"grandmother",Pic:"grandmother",Correct:"2",Sound:"YSA_M02_1_03",Markers:[]};
	Questions[3]={Q:"A: Who's that? B: _______",A1:"It's Peter. He's my cousin.",A2:"It's Anna. She's my friend.",Pic:"cousin",Correct:"1",Sound:"YSA_M02_1_04",Markers:[0.026485,1.145488]};
	Questions[4]={Q:"This is Mrs Toms. _______ my teacher.",A1:"She's",A2:"He's",Pic:"teacher",Correct:"1",Sound:"YSA_M02_1_05",Markers:[]};
	Questions[5]={Q:"This is Ken. _______ my brother.",A1:"She's",A2:"He's",Pic:"brother",Correct:"2",Sound:"YSA_M02_1_06",Markers:[]};
	Questions[6]={Q:"_______ Fred.",A1:"I am",A2:"She is",Pic:"fred",Correct:"1",Sound:"YSA_M02_1_07",Markers:[]};
	Questions[7]={Q:"_______ my friend.",A1:"I am",A2:"You are",Pic:"friends",Correct:"2",Sound:"YSA_M02_1_08",Markers:[]};
	Questions[8]={Q:"This is an umbrella. _______ my umbrella.",A1:"She's",A2:"It's",Pic:"umbrella",Correct:"2",Sound:"YSA_M02_1_09",Markers:[]};
	Questions[9]={Q:"A: What's this? B: _______",A1:"It's my bedroom.",A2:"It's my bathroom.",Pic:"bedroom",Correct:"1",Sound:"YSA_M02_1_10",Markers:[0.024717,1.057868]};
	Questions[10]={Q:"A: Where's the cat? B: _______",A1:"It's on the table.",A2:"It's under the bed.",Pic:"cat-under-the-bed",Correct:"2",Sound:"YSA_M02_1_11",Markers:[0.000000,1.243968]};
	Questions[11]={Q:"A: Where's the boy? B: _______",A1:"He's in the dining room.",A2:"He's in the kitchen.",Pic:"boy-in-kitchen",Correct:"2",Sound:"YSA_M02_1_12",Markers:[0.000000,1.498413]};
	Questions[12]={Q:"A: Where's the TV? B: _______",A1:"It's in the bookcase.",A2:"It's on the sofa.",Pic:"TV-in-bookcase",Correct:"1",Sound:"YSA_M02_1_13",Markers:[0.000000,1.548639]};
	Questions[13]={Q:"A: Where's the girl? B: _______",A1:"She's in the living room.",A2:"She's in the garden.",Pic:"girl-in-living-room",Correct:"1",Sound:"YSA_M02_1_14",Markers:[0.000000,1.325057]};
	Questions[14]={Q:"A: What's this? B: _______",A1:"It's a lamp.",A2:"It's a bookcase.",Pic:"lamp",Correct:"1",Sound:"YSA_M02_1_15",Markers:[0.000000,1.145125]};
	Questions[15]={Q:"A: Where's the cat? B: _______",A1:"It's on the bag.",A2:"It's in the bag.",Pic:"cat-in-bag",Correct:"2",Sound:"YSA_M02_1_16",Markers:[0.000000,1.325986]};
	Questions[16]={Q:"A: Who's that? B: _______",A1:"It's my father.",A2:"It's my grandfather.",Pic:"father",Correct:"1",Sound:"YSA_M02_1_17",Markers:[0.022041,1.062857]};
	Questions[17]={Q:"A: This is Maria. B: _______",A1:"He's my cousin.",A2:"She's my cousin.",Pic:"girl",Correct:"2",Sound:"YSA_M02_1_18",Markers:[0.000000,1.333424]};
	Questions[18]={Q:"A: Where's the chair? B: _______",A1:"It's on the table.",A2:"It's under the table.",Pic:"chair-under-table",Correct:"2",Sound:"YSA_M02_1_19",Markers:[0.000000,1.392857]};
	Questions[19]={Q:"I'm a _______.",A1:"boy",A2:"girl",Pic:"boy",Correct:"1",Sound:"YSA_M02_1_20",Markers:[]};
	}
  else if(mod==4){
  	Questions[0]={Q:"I have got a _______.",A1:"nose",A2:"mouth",Pic:"mouth",Correct:"2",Sound:"YSA_M04_1_01",Markers:[]};
	Questions[1]={Q:"You have got green _______.",A1:"ears",A2:"eyes",Pic:"girl",Correct:"2",Sound:"YSA_M04_1_02",Markers:[]};
	Questions[2]={Q:"He has got small _______.",A1:"ears",A2:"hair",Pic:"ears",Correct:"1",Sound:"YSA_M04_1_03",Markers:[]};
	Questions[3]={Q:"It has got two _______.",A1:"wings",A2:"tails",Pic:"wings",Correct:"1",Sound:"YSA_M04_1_04",Markers:[]};
	Questions[4]={Q:"It has got a long _______.",A1:"arm",A2:"tail",Pic:"petcat",Correct:"2",Sound:"YSA_M04_1_05",Markers:[]};
	Questions[5]={Q:"He's got a pet _______.",A1:"parrot",A2:"cat",Pic:"parrot",Correct:"1",Sound:"YSA_M04_1_06",Markers:[]};
	Questions[6]={Q:"She's got long _______.",A1:"hair",A2:"eyes",Pic:"girl-with-long-hair",Correct:"1",Sound:"YSA_M04_1_07",Markers:[]};
	Questions[7]={Q:"A: What's this? B: _______",A1:"It's a fish.",A2:"It's a bat.",Pic:"bat",Correct:"2",Sound:"YSA_M04_1_08",Markers:[0.000000,1.146621]};
	Questions[8]={Q:"They haven't got _______.",A1:"eyes",A2:"legs",Pic:"snakes",Correct:"2",Sound:"YSA_M04_1_09",Markers:[]};
	Questions[9]={Q:"A: What are these? B: _______",A1:"They're cats.",A2:"They're parrots.",Pic:"cats",Correct:"1",Sound:"YSA_M04_1_10",Markers:[0.000000,1.208934]};
	Questions[10]={Q:"Have you got a _______?",A1:"snake",A2:"rabbit",Pic:"rabbit",Correct:"2",Sound:"YSA_M04_1_11",Markers:[]};
	Questions[11]={Q:"A: Has it got a small head? B: _______",A1:"Yes, it has.",A2:"No, it hasn't.",Pic:"Titanosaur",Correct:"1",Sound:"YSA_M04_1_13",Markers:[0.000000,1.778458]};
	Questions[12]={Q:"A: Has it got six legs? B: _______",A1:"Yes, it has.",A2:"No, it hasn't.",Pic:"spider",Correct:"2",Sound:"YSA_M04_1_14",Markers:[0.000000,1.758095]};
	Questions[13]={Q:"A: Has he got brown eyes? B: _______",A1:"Yes, he has.",A2:"No, he hasn't.",Pic:"boy",Correct:"2",Sound:"YSA_M04_1_15",Markers:[0.000000,2.035374]};
	Questions[14]={Q:"It isn't _______.",A1:"beautiful",A2:"ugly",Pic:"ugly-(cat)",Correct:"1",Sound:"YSA_M04_1_16",Markers:[]};
	Questions[15]={Q:"A: What are _______? B: They're parrots.",A1:"this",A2:"these",Pic:"parrots",Correct:"2",Sound:"YSA_M04_1_17",Markers:[1.966485,3.228957]};
	Questions[16]={Q:"They've got wings. They're scary. They're _______.",A1:"snakes",A2:"bats",Pic:"bats",Correct:"2",Sound:"YSA_M04_1_18",Markers:[]};
	Questions[17]={Q:"Has she got white _______?",A1:"tooth",A2:"teeth",Pic:"girl2",Correct:"2",Sound:"YSA_M04_1_19",Markers:[]};
	Questions[18]={Q:"A: Have you got a turtle? B: _______",A1:"Yes, I have.",A2:"No, I haven't.",Pic:"turtle",Correct:"1",Sound:"YSA_M04_1_20",Markers:[0.035374,1.736871]};
}
 else if(mod==7){
 	Questions[0]={Q:"A: What day is it today? B: _______",A1:"It's Wednesday.",A2:"It's windy.",Pic:"calendar,-sign-on-Wednesday",Correct:"1",Sound:"YSA_M07_1_01",Markers:[0.189887,2.117415]};
	Questions[1]={Q:"A: What's the weather like? B: _______",A1:"It's raining.",A2:"It's snowing.",Pic:"snowing",Correct:"2",Sound:"YSA_M07_1_02",Markers:[0.000000,1.431746]};
	Questions[2]={Q:"A: What's your favourite day? B: _______",A1:"Friday.",A2:"At night.",Pic:"Friday",Correct:"1",Sound:"YSA_M07_1_03",Markers:[0.000000,1.984308]};
	Questions[3]={Q:"A: Is it raining? B: _______",A1:"No, it isn't. It's Sunday.",A2:"No, it isn't. It's sunny.",Pic:"sunny",Correct:"2",Sound:"YSA_M07_1_04",Markers:[0.000000,1.295420]};
	Questions[4]={Q:"A: What's the time? B: _______",A1:"It's nine o'clock.",A2:"It's three o'clock.",Pic:"YS3_M07_1_05",Correct:"2",Sound:"YSA_M07_1_05",Markers:[0.000000,1.241270]};
	Questions[5]={Q:"A: What time do you get up? B: _______",A1:"At seven o'clock.",A2:"At twelve o'clock.",Pic:"YS3_M07_1_06",Correct:"1",Sound:"YSA_M07_1_06",Markers:[0.000000,1.626395]};
	Questions[6]={Q:"A: What time do you go to bed? B: _______",A1:"At nine o'clock.",A2:"At eleven o'clock.",Pic:"YS3_M07_1_07",Correct:"1",Sound:"YSA_M07_1_07",Markers:[0.000000,2.166327]};
	Questions[7]={Q:"A: What time do you go to school? B: _______",A1:"At eight o'clock.",A2:"At six o'clock.",Pic:"YS3_M07_1_08",Correct:"1",Sound:"YSA_M07_1_08",Markers:[0.000000,2.193016]};
	Questions[8]={Q:"A: What's the weather like? B: _______",A1:"It's five o'clock.",A2:"It's hot.",Pic:"hot",Correct:"2",Sound:"YSA_M07_1_09",Markers:[0.020862,1.582880]};
	Questions[9]={Q:"It's Saturday. B: _______",A1:"Let's go to the circus.",A2:"Let's go to school.",Pic:"circus",Correct:"1",Sound:"YSA_M07_1_10",Markers:[]};
	Questions[10]={Q:"A: Let's go to the beach. B: _______",A1:"Let's swim.",A2:"Let's run.",Pic:"beach",Correct:"1",Sound:"YSA_M07_1_11",Markers:[0.000000,1.888435]};
	Questions[11]={Q:"A: Let's go to the forest. _______",A1:"Let's swim.",A2:"Let's walk.",Pic:"forest",Correct:"2",Sound:"YSA_M07_1_12",Markers:[0.000000,2.080680]};
	Questions[12]={Q:"A: What's the time in Sydney? B: _______",A1:"It's six in the morning.",A2:"It's nine at night.",Pic:"M07_13",Correct:"2",Sound:"YSA_M07_1_13",Markers:[0.000000,2.070612]};
	Questions[13]={Q:"A: What's the time in London? B: _______",A1:"It's twelve in the afternoon.",A2:"It's eight in the evening.",Pic:"M07_14",Correct:"1",Sound:"YSA_M07_1_14",Markers:[0.000000,2.208980]};
	Questions[14]={Q:"A: Is the water cold? B: _______",A1:"Yes, it is.",A2:"No, it isn't. ",Pic:"M07_15",Correct:"1",Sound:"YSA_M07_1_15",Markers:[0.000000,1.744807]};
	Questions[15]={Q:"A: It's Wednesday. What's the weather like? B: _______",A1:"It's cloudy.",A2:"It's raining.",Pic:"M07_16",Correct:"1",Sound:"YSA_M07_1_16",Markers:[0.000000,3.355374]};
	Questions[16]={Q:"A: It's Saturday. What's the weather like? B: _______",A1:"It's hot.",A2:"It's cold.",Pic:"M07_17",Correct:"1",Sound:"YSA_M07_1_17",Markers:[0.000000,3.349252]};
	Questions[17]={Q:"A: It's Monday. What's the weather like? B: _______",A1:"It's snowing. ",A2:"It's sunny.",Pic:"M07_18",Correct:"1",Sound:"YSA_M07_1_18",Markers:[0.000000,3.233469]};
	Questions[18]={Q:"Let's play in the _______.",A1:"sand",A2:"water",Pic:"Sand",Correct:"1",Sound:"YSA_M07_1_19",Markers:[]};
	Questions[19]={Q:"Look! This is a _______.",A1:"sun",A2:"star",Pic:"star",Correct:"2",Sound:"YSA_M07_1_20",Markers:[]};

 }
//content end




$.each(Questions, function( index, value ) {
	Original[index]=value;
});

function refillArray(){
$.each(Original, function( index, value ) {
	Questions[index]=value;
});
}



var rand=0;
var word;
fetchWord();
var audioInterval;
var ready=0;
var points=0;
var lives=3;
var qNum=0;
var hitSInterval;
var hitBInterval;
var questionInterval;
var hitAInterval;
var extraInterval;
var controlInterval;

$(".play_btn").click(function() {
    $('.questionsPanel').show();
	$('.mainPanel').hide();
	
	$('.paused').removeClass('paused');
	extraInterval = setInterval(generateStars2, 46000);
	generateStars();
	hitSInterval=setInterval(hitStars,10);
	hitBInterval=setInterval(hitBar,10);
	//hitAInterval=setInterval(hitAnswer,10);
	questionInterval=setInterval(questions,30000);
	
	controlInterval=setInterval(main, 40);
	setTimeout(function () { $(".ixos")[0].play(); }, 150);
	
});

$(".instr_btn").click(function() {
    $('.instructionsPanel').show();
	$('.mainPanel').hide();
});

$(".back_btn").click(function() {
    $('.mainPanel').show();
	$('.questionsPanel').hide();
	$('.instructionsPanel').hide();

	location.reload();
});

$(document).on("click", ".exit_btn", function ()
{
    window.name = '{"Type":"GA"}';
    window.location.href = "../../MainMenu.html";
});	



/* $(document).on("click", ".questionAnswers>div", function () {
		$('.questionContent').fadeOut(0);

	$('.blockPanel').show();
	if($(this).attr("data-questioncorrect") == "true"){
		$(".score audio").attr("src","Content/Sounds/WindBlow.mp3");
		$(".score audio")[0].play();
		points+=100;		
		document.getElementById("pointsN").innerHTML=points;	


	}
	else{
		$(".score audio").attr("src","Content/Sounds/Ntoing.mp3");
		$(".score audio")[0].play();
		lives-=1;
		if(lives==2){$("[data-life=3]").addClass("nolife")}
		if(lives==1){$("[data-life=2]").addClass("nolife")}
		
	}



	rightAnswer();

	
});
 */


function fetchWord(){
if(Questions.length==0){refillArray();}
var rand=randomGenerator(0,Questions.length-1);

word=Questions[rand];
Questions.splice(rand,1);

$(".questionAnswers,.question,.questionSound,.questionImage").html("");	
$(".question").html(word.Q.replace("B:", "<br />B:"));
if(word.Pic!=""){$(".questionImage").append("<img src='Images/"+word.Pic+".jpg'></img>");}
else{ $(".question").addClass("noImg");}
$(".questionAnswers").append("<div class='answerA answers'><span>"+word.A1+"</span></div>");
$(".questionAnswers").append("<div class='answerB answers'><span>"+word.A2+"</span></div>");
//if(word.A3!=null){$(".questionAnswers").append("<div class='answerC'><span>"+word.A3+"</span></div>");}
$(".questionAnswers>div").eq(word.Correct-1).attr("data-questioncorrect","true");
console.log($(".questionAnswers>div").eq(word.Correct-1).attr("data-questioncorrect","true"));
if(word.Sound!=null){
$(".questionSound").append("<audio src=''>"+word.Sound+"</audio>"); 
$(".questionSound audio").attr("src","Sounds/"+word.Sound+".mp3");
$(".questionSound audio")[0].load();
}

if(word.Markers!=null){

}

/* if(word.Pic==""){
	$(".question").css("margin-top", "159px !important");
} */

if($(".question").is(':contains("A:")')){
	// $('.speaker').show();
	$('.speaker').css("display","block");
	var sp=$(".question").html().split("<br>")[0];
	// console.log(sp);
	if (sp.indexOf("_______") != -1){$('.speaker').css("top", "282px");}
}
else{
	// $('.speaker').hide();
	$('.speaker').css("display","none");
}

}


$(document).on("click", ".speaker", function (e) {
$(".ixos")[0].pause();
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

var maxTop = 805;
var maxLeft = 1050;
//var maxTop = ($(window).height()-105)*scale;
//var maxLeft = ($(window).width()-220)*scale;
//var maxTop = 960;
//var maxLeft = 1280;
var Keys = {
        up: false,
        down: false,
        left: false,
        right: false
};

var hero = {
    x: 60,
    y: 375
};

var plane = document.getElementById("plane");

window.onkeydown = function(e){
         var kc = e.keyCode;
         e.preventDefault();

         if(kc === 37) Keys.left = true;
         if(kc === 38) Keys.up = true;
         if(kc === 39) Keys.right = true;
         if(kc === 40) Keys.down = true;
};

window.onkeyup = function(e){
         var kc = e.keyCode;
         e.preventDefault();

         if(kc === 37) Keys.left = false;
         if(kc === 38) Keys.up = false;
         if(kc === 39) Keys.right = false;
         if(kc === 40) Keys.down = false;
};

function main() {

        move();

};

function move(){

        if(Keys.up){
			if (hero.y > 5){
            hero.y -= 10;
            var p = hero.y;
            var t = p + 10;
            plane.style.top = p + "px";
            plane.style.bottom = t + "px";}
        }

        if(Keys.down){
			if (hero.y < maxTop){
            hero.y += 10;
            var g = hero.y;
            var q = g - 10;
            plane.style.bottom = g + "px";
            plane.style.top = q + "px";}
        }

        if(Keys.left) {
			if (hero.x > 0){
            hero.x -= 10;
            var z = hero.x;
            var q = z + 10;
            plane.style.left = z + "px";
            plane.style.right = q + "px";}
        }

        if(Keys.right){
			if (hero.x < maxLeft){
            hero.x += 10;
            var z = hero.x;
            var q = z - 10;
            plane.style.right = z + "px";
            plane.style.left = q + "px";}
        }
}


function digits(){
	if (points < 10){$(".pointsN").css("left", "80px")}
	else if (points < 100){$(".pointsN").css("left", "64px")}
	else if (points < 1000){$(".pointsN").css("left", "51px")}
	else{$(".pointsN").css("left", "29px")}
}
setInterval(digits, 10);

function hitStars(){
	var x1 = parseInt($(".plane").css("left"));
	var y1 = parseInt($(".plane").css("top"));
	var h1 = 80;
	var w1 = 185;
	var b1 = y1 + h1;
	var r1 = x1 + w1;	

	$(".extraStars").each(function( index, value ) {
		var x2 = parseInt($(this).css("left"));
		var y2 = parseInt($(this).css("top"));
		var h2 = $(this).height();
		var w2 = $(this).width();
		var b2 = y2 + h2;
		var r2 = x2 + w2;
			if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {

			}
			else{
				
				$(".bonus").css('top', parseInt($(this).css("top"))+"px");
				$(".bonus").css('left', parseInt($(this).css("left"))+"px");
				
				$(this).remove();
				if ($(this).hasClass("green")){
					points+=10;
					$(".bonus").addClass("bonusG");
					$(".score audio").attr("src","Content/Sounds/green.mp3");
					setTimeout(function () { $(".score audio")[0].play(); }, 150);
				}
				else{
					if (points > 0){points-=10;};
					$(".bonus").addClass("bonusO");
					$(".score audio").attr("src","Content/Sounds/black.mp3");
					setTimeout(function () { $(".score audio")[0].play(); }, 150);
				}
				
				document.getElementById("pointsN").innerHTML=points;
				setTimeout(function(){	$(".bonusO").removeClass("bonusO"); $(".bonusG").removeClass("bonusG"); }, 500);
			}
		
	}); 
}



function hitBar(){
	//console.log(parseInt($(".plane").offset().left));
	//console.log(parseInt($(".plane").offset().top));
	
	var x1 = parseInt($(".plane").css("left"));
	var y1 = parseInt($(".plane").css("top"));
	var h1 = 80;
	var w1 = 185;
	var b1 = y1 + h1;
	var r1 = x1 + w1;	

		var x2 = parseInt($(".bar").css("left"));
		var y2 = parseInt($(".bar").css("top"));
		var h2 = 960;
		var w2 = 65;
		var b2 = y2 + h2;
		var r2 = x2 + w2;
			if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {

			}
			else{
				setTimeout(function(){ hitAInterval=setInterval(hitAnswer,10); }, 2000);
				$('.bg1').addClass('paused');
				$('.bg2').addClass('paused');
				$('.bg3').addClass('paused');
				$(".questionContent").css("right", "40px");
				$(".bar").hide();
				clearInterval(controlInterval);
				$(".plane").addClass("fPos");
				$('.plane').removeAttr('style');
				hero = {x: 60,y: 375};
				setTimeout(function(){ 
					controlInterval=setInterval(main, 40); 
					$(".fPos").removeClass("fPos");
					
				}, 2000);
				
				//qNum+=1;
				clearInterval(hitSInterval);
				clearInterval(extraInterval);
				for(j=0;j<20;j++){
					$(".crossing"+[j+1]).removeClass("crossing"+[j+1])
				}
			}

}

function hitAnswer(){
	var x1 = parseInt($(".plane").css("left"));
	var y1 = parseInt($(".plane").css("top"));
	var h1 = 80;
	var w1 = 185;
	var b1 = y1 + h1;
	var r1 = x1 + w1;	

	$(".answers").each(function( index, value ) {
		var x2 = parseInt($(this).css("left"))+519;
		var y2 = parseInt($(this).css("top"));
		var h2 = $(this).height();
		var w2 = $(this).width();
		var b2 = y2 + h2;
		var r2 = x2 + w2;
		if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {

		}
		else{
					$('.questionContent').fadeOut(0);
						//$('.blockPanel').show();
						if($(this).attr("data-questioncorrect") == "true"){
							$(".score audio").attr("src","Content/Sounds/wahoo.mp3");
							setTimeout(function () { $(".score audio")[0].play(); }, 150);
							points+=100;		
							document.getElementById("pointsN").innerHTML=points;
							var y=qNum+1;
							$(".star"+y).addClass("right");
							

						}
						else{
							$(".score audio").attr("src","Content/Sounds/wrong.mp3");
							setTimeout(function () { $(".score audio")[0].play(); }, 150);
							lives-=1;
							if(lives==2){$("[data-life=3]").addClass("nolife")}
							if(lives==1){$("[data-life=2]").addClass("nolife")}
							
						}
						console.log(qNum,lives);
						rightAnswer();
						$(".solved").html($(".question").html());
						$(".solved").html($(".solved").html().replace("_______",$("[data-questioncorrect]").html()));
						$(".ixos")[0].pause();
						
		}
	});
}

$(document).on("click", ".continue_winner", function() {
		$('.mainPanel').show();
		$('.questionsPanel').hide();
		$('.afterPanel_winner').hide();
		$('.instructionsPanel').hide();
		$('.afterPanel_answer').hide();
		$('.afterPanel').hide();
		$(".afterContainer_winner").hide();
		location.reload();
});

function rightAnswer() {
	$(".questionContent").css("right", "-730px");
	clearInterval(questionInterval);
	clearInterval(hitAInterval);
	$(".afterPanel_answer").fadeIn(0);
	$(".afterContainer").fadeIn(500)
	
	clearInterval(controlInterval);
	$(".plane").addClass("fPos");
	$('.plane').removeAttr('style');
	
	//$(".img_solved").attr("src","images/"+word.Pic+".jpg");
}

function generateStars(){
	$(".extraP").html("<div class='green'></div><div class='black'></div><div class='green'></div><div class='black'></div><div class='green'></div><div class='black'></div><div class='green'></div><div class='black'></div><div class='green'></div><div class='black'></div><div class='green'></div><div class='black'></div><div class='green'></div><div class='black'></div><div class='green'></div><div class='black'></div><div class='green'></div><div class='black'></div><div class='green'></div><div class='black'></div>");

	var j=0;
	for(j=0;j<20;j++){
		var x=j+1;
		$(".extraP").find("div").eq(j).addClass("extraStars");
		$(".extraP").find("div").eq(j).addClass("crossing"+x);
		$(".extraP").find("div").eq(j).css("top", randomGenerator(100,700));
		
	}
}

function generateStars2(){
	$(".extraP").html("<div class='green'></div><div class='black'></div><div class='green'></div><div class='black'></div><div class='green'></div><div class='black'></div><div class='green'></div><div class='black'></div><div class='green'></div><div class='black'></div><div class='green'></div><div class='black'></div><div class='green'></div><div class='black'></div><div class='green'></div><div class='black'></div><div class='green'></div><div class='black'></div><div class='green'></div><div class='black'></div>");

	var j=0;
	for(j=0;j<20;j++){
		var x=j+1;
		$(".extraP").find("div").eq(j).addClass("extraStars");
		$(".extraP").find("div").eq(j).addClass("crossing"+x);
		$(".extraP").find("div").eq(j).css("top", randomGenerator(100,700));
		
	}
}

var mapInterval=setInterval(map,10);
var currentPosL;
var currentPosT;

function map(){
	currentPosL = (-parseInt($(".bg2").position().left))+200+parseInt($(".plane").offset().left);
	var posostoL = (currentPosL/4912);
	var dotL = (posostoL*370)+16;
	$(".dot").css("left", dotL+"px");

	currentPosT = 100+parseInt($(".plane").offset().top);
	var posostoT = (currentPosT/960);
	var dotT = (posostoT*76)+17;
	$(".dot").css("top", dotT+"px");
}



function questions(){
	$(".bar").addClass("barCross");
	
}

$(document).on("click", ".continue_answer", function (){
	$(".fPos").removeClass("fPos");
		if(lives==0 || qNum==7){
			if(lives==0){
				gameOver();
			}
			else{
				gameEnd();
			}
		}
		else{
			hero = {x: 60,y: 375};
			controlInterval=setInterval(main, 40); 
			
			hitSInterval=setInterval(hitStars,10);
			hitBInterval=setInterval(hitBar,10);
			//hitAInterval=setInterval(hitAnswer,10);
			questionInterval=setInterval(questions,30000);
			$('.questionContent').show();
			$(".bar").show();
			$('.paused').removeClass('paused');
			$(".barCross").removeClass("barCross");
			$('.afterPanel_answer').hide();
			$('.blockPanel').hide();
			generateStars();
			extraInterval = setInterval(generateStars2, 46000);
			fetchWord();
			qNum+=1;
			console.log("Q"+qNum);
			$(".ixos")[0].currentTime=0;
			$(".ixos")[0].play();
			$(".noImg").removeClass("noImg");
		}

	});

function randomGenerator(min,max){return Math.floor(Math.random() * (max - min + 1)) + min;}

function gameEnd(){

	$(".afterContainer").hide();
	$('.afterPanel_answer').hide();
	clearInterval(controlInterval);
	clearInterval(questionInterval);
	clearInterval(hitAInterval);
	clearInterval(hitBInterval);
	clearInterval(hitSInterval);
	clearInterval(extraInterval);
	$(".fPos").removeClass("fPos");
	$(".plane").addClass("landed");
	setTimeout(function(){

		$('.questionsPanel').hide();
		$('.afterPanel').hide();
		$(".afterContainer_winner").fadeIn(500);
		$(".afterPanel_winner").fadeIn(500);
		document.getElementById("fScore").innerHTML=points;
	}, 3500);
}

function gameOver(){
	$(".afterContainer").hide();
	$('.afterPanel_answer').hide();
	$('.questionsPanel').hide();
	$('.afterPanel').hide();
	$(".afterContainer_winner").fadeIn(500);
	$(".afterPanel_winner").fadeIn(500);
	document.getElementById("fScore").innerHTML=points;
	document.getElementById("gameover").innerHTML="Game Over!";
	clearInterval(controlInterval);
	clearInterval(questionInterval);
	clearInterval(hitAInterval);
	clearInterval(hitBInterval);
	clearInterval(hitSInterval);
	clearInterval(extraInterval);
}

});
















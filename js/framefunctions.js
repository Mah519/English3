$( document ).ready(function() {
	
	
var currentFrame=0;
var container=$(".container");
$(".IWB").addClass("loading");


//Αρχικοποιήσεις μεταβλητών ήχου-βίντεο
var soundInterval;
var soundButtonInterval;
var videoInterval;
var justiInterval;
var soundCurrent;
var videoCurrent;
var subs;
var scrollY;
var scrollY;
var srl={};
var tempAS;var tempAS2;


var vFlag=0;
var scale=1;
var inter;
var tlTip=1;

//'Ονομα project(Χρησιμεύει στην αποθήκευση των tools)
var projectName="Young Stars 1 KAZ";

//Click sound
$("body").append('<audio class="clickSound"><source src="../Audio/Click.mp3" type="audio/mpeg"></audio>');




//if(Infos.Book){$(".mBook").html(Infos.Book);}
if(Infos.ModuleText){$(".mModule").html(Infos.ModuleText)}else{$(".mModule").parent().fadeOut(0);}

if(Infos.Type=='Student\'s Book'){$(".tSvg path").css("fill","#0037ff")}
if(Infos.Type=='Workbook'){$(".tSvg path").css("fill","#9b27ff")}
if(Infos.Type=='Grammar Book'){$(".tSvg path").css("fill","#9bff00");$(".tSvg text").css("fill","black")}
if(Infos.Type){$(".mType").html(Infos.Type);$(".mModule").addClass("mLeft");}



$(".mainWrapper").append('<div class="mainBack"><svg width="40px" height="40px" viewBox="0 0 40 40" class="secondBackbtn ">  <circle fill="white" cx="20" cy="20" r="19.5"></circle> <path fill="gray" d="M13.372,16.936L23.407,6.901c0.526-0.526,1.378-0.526,1.904,0c0.523,0.526,0.523,1.377,0,1.904L15.056,19.062 l10.256,10.257c0.263,0.264,0.395,0.606,0.395,0.952c0,0.344-0.132,0.688-0.395,0.952c-0.525,0.525-1.377,0.525-1.903,0 L13.374,21.188l-2.08-2.126L13.372,16.936z"></path>  </svg>  </div>');



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
window.scale=scale;


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








//Corelation coming from other HMTLS
try{
if(JSON.parse(window.name)){
	
	var cor=JSON.parse(window.name);
	if(cor.Lesson){
		var exFlag=0;		
		$.each(Frame, function( index, value ) {
			if(value.Salon==false||exFlag==1){ return false;}		
			$.each(value.Lessons, function( index2, value2 ) {			
				if(value2==cor.Lesson){ 
					current=index;
					currentFrame=index;
					exFlag=1;
					return false;}			
			});
		});		
	}
	if(cor.Frame){		
		current=parseInt(cor.Frame)-1;
		currentFrame=parseInt(cor.Frame)-1;		
		if(Frame[currentFrame].Salon==false){$(".returnSallon").removeAttr("data-disabled")}
	}	
	if(cor.Image){
		$.each(Frame, function( index, value ) {
				if(value.Image==cor.Image){ 					
					current=index;
					currentFrame=index;
					return false;}					
				if(value.Salon==false){ return false;}
			});		
	}
	
}
}catch(err){}
	window.name = null;













InitialSalon(currentFrame);




function InitialSalon(current){

	$('.textTool').remove();
	$(".toolBox,#sketch").removeClass("enabled");
	
	
	 
	container.html("");
	$(".preLoad").remove();
	$("body").append('<div class="preLoad"></div>');
	clearVideo();
	subs=null;
	$(".videoWrapper,.interactivePanel,.interactiveCorrect,.interactiveWrong").fadeOut(0);
	$("#sketch").html("");
	$(".showAnswers").attr("class","showAnswers");
	$(".audioPause").removeClass("audioPause");
	try{
	clearInterval(soundInterval);}
	catch(err){}	
	
	$(".lessons").html("");
	$(".extraInfo").fadeOut(0);	
	$(".extraInfo audio source").removeAttr("src");
	soundCurrent=1;
	videoCurrent=1;
	$(".container").scrollTop(0);
	if(current==0||Frame[current].Salon!=Frame[current-1].Salon){$("[data-frame=previous]").attr("data-disabled","true")}else{$("[data-frame=previous]").removeAttr("data-disabled")}
	if(current==Frame.length-1||Frame[current].Salon!=Frame[current+1].Salon){$("[data-frame=next]").attr("data-disabled","true")}else{$("[data-frame=next]").removeAttr("data-disabled")}
	$(".scroll").fadeOut(0);
	$(".scrollHandle").css("top","0px");
	if(Infos.SalonDisabled&&Frame[current].Salon==true){$("[data-frame]").attr("data-disabled","true")}
	if(Infos.FramesDisabled){$("[data-frame],.returnSallon").attr("data-disabled","true")}
	var url = (Frame[current].Salon == true ? "Spreads" : "Frames");
	$(".salonShadow").fadeOut(0);
	
	
	var img = new Image();
	img.onload = function() {		
		
		$(".mainImg").fadeIn(0);		
		$(".IWB").addClass("mainFrame");		
		$(".main").addClass("containerExpanded");
		
		if(parseFloat(this.height)<=740){		
			$(".scroll").fadeOut(0);		
			}
		else{
			$(".scroll").fadeIn(0);	
			}
			
		if(Frame[current].Flashcard){
			$(".main").addClass("containerExpanded");
			var top=($(".container").height()-parseFloat(this.height))/2;
			var left=($(".container").width()-parseFloat(this.width))/2;				
			$(this).css({"top":top+"px","left":left+"px"});
		}
		//Set Audio
		
		if(Frame[current].Audio){
			$(".extraInfo audio source").attr("src","../Audio/"+ Frame[current].Audio +".mp3");			
			$(".extraInfo audio")[0].load();
			$(".extraInfo audio").attr("data-start",Frame[current].SoundPhrases[0]);
			$(".extraInfo audio").attr("data-end",Frame[current].SoundPhrases[Frame[current].SoundPhrases.length-1]);
			$(".extraInfo").fadeIn(0);	
		}	
		
		//Set Video
		if(Frame[current].Video){		
			$(".videoBtn").removeAttr("data-disabled");	
		}
		else{
			$(".videoBtn").attr("data-disabled","true");
		}
		
		
		
		//Set Interactive activity
		if(Frame[current].Interactive){
			if(Frame[current].Interactive.type=="multiple"){
				$.each(Frame[current].Interactive.Choices, function( index, value ) {
					var extra="";
					if(value.correct){extra="data-multiplecorrect='true'"}
					container.append("<div "+ extra +" class=\"interactive choice\" data-multiplegroup=\""+ value.group +"\" style=\"width:"+ value.width +"px;height:"+ value.height +"px;left:"+ value.left +"px;top:"+ value.top +"px;\">"+ value.text +"</div>");
				});
			}		
			else{
				$.each(Frame[current].Interactive.Choices, function( index, value ) {
					var extra="";
					if(value.correct){container.append("<div class=\"interactive dropInteractive\" data-dropint=\""+ value.correct +"\" style=\"width:"+ value.width +"px;height:"+ value.height +"px;left:"+ value.left +"px;top:"+ value.top +"px;\"></div>");}
					else{container.append("<div class=\"interactive dragInteractive\" data-dragint=\""+ value.text +"\" style=\"width:"+ value.width +"px;height:"+ value.height +"px;left:"+ value.left +"px;top:"+ value.top +"px;\">"+ value.text +"</div>");
					}				
				});			
			}
			$(".interactivePanel").fadeIn(0);
		}
		
		
		
		//Set Sound phrases
		if(Frame[current].Phrases){
			$.each(Frame[current].Phrases, function( index, value ) {
				var color="";
				if(value.color){color+= "background:"+value.color+";";}
				if(value.blending){color+= "mix-blend-mode:normal;";}
				container.append("<div data-phrase='"+ value.number +"' style='"+color+"left:"+ value.left +"px;top:"+ value.top +"px;width:"+ value.width +"px;height:"+ value.height +"px;'></div>");
			});			
		}
		
		//Auto-scrolling fixed
			if(Frame[current].ScrollTo){
				$.each(Frame[current].ScrollTo, function( index, value ) {
					var flag=0;
						$.each(Frame[current].SoundPhrases, function( index2, value2 ) {
							if(value2>value.sec){
								Frame[current].SoundPhrases.splice(index2,0,value.sec);
								Frame[current].SoundPhrases.splice(index2,0,value.sec);
								tempAS=index2;
								tempAS2=current;
								flag=index2/2+1;
								return false;
								}					
						});					
						$("[data-phrase]").each(function( index2, value2 ) {
							var inp=parseInt($(this).attr("data-phrase"));
							if(inp>=flag){$(this).attr("data-phrase",inp+1)}
						});		
						container.append("<div data-phrase='"+ flag +"' style='left:0px;top:"+ value.top +"px;width:0px;height:0px;'></div>");
	
					});			
				}

		//Set vocabulary button for lesson
		try{$.each(Infos.Vocabulary_Correlation, function( index2, value2 ) {
			if(Frame[current].Lesson==value2){
				
				$(".vocabularyBtn").attr("data-correlation",value2).removeAttr("data-disabled");
				}	
		});}catch(err){}
			
					
		
		//Set Audio Button
		if(Frame[current].Audiobtn){
			$.each(Frame[current].Audiobtn, function( index, value ) {
				container.append('<div class="audioL" style="top:'+ value.top +'px;left:'+ value.left +'px" data-alstart="'+ value.start +'" data-alend="'+ value.end +'"><svg width="19px" height="15px" viewbox="0 0 19 15"> <g fill="#010101" class="justPlayBtn">	 <path  d="M10.877,10.639c-0.143,0-0.285-0.063-0.385-0.18c-0.176-0.213-0.148-0.527,0.064-0.705 c0.711-0.594,1.117-1.451,1.117-2.354c0-0.83-0.324-1.608-0.916-2.192c-0.197-0.194-0.199-0.51-0.004-0.707 c0.193-0.196,0.51-0.199,0.707-0.004c0.783,0.773,1.213,1.805,1.213,2.903c0,1.2-0.537,2.338-1.477,3.122 C11.104,10.6,10.99,10.639,10.877,10.639z"/> <path d="M12.846,12.605c-0.137,0-0.273-0.055-0.371-0.164c-0.186-0.205-0.17-0.521,0.035-0.707 c1.229-1.109,1.934-2.689,1.934-4.334c0-1.57-0.615-3.044-1.73-4.15c-0.195-0.194-0.197-0.511-0.002-0.707 c0.195-0.196,0.512-0.198,0.707-0.003c1.307,1.295,2.025,3.021,2.025,4.86c0,1.926-0.824,3.776-2.264,5.077 C13.084,12.563,12.965,12.605,12.846,12.605z"/> <path d="M15.146,14.908c-0.133,0-0.266-0.053-0.365-0.158c-0.188-0.201-0.178-0.518,0.023-0.707 c1.867-1.746,2.895-4.105,2.895-6.643c0-2.439-0.953-4.731-2.684-6.454c-0.195-0.195-0.195-0.512-0.002-0.707 c0.195-0.196,0.512-0.196,0.707-0.002c1.922,1.912,2.979,4.456,2.979,7.163c0,2.819-1.141,5.436-3.211,7.374 C15.393,14.863,15.27,14.908,15.146,14.908z"/> <path d="M8.3,2.27c0-0.55-0.318-0.682-0.707-0.293L5.148,4.422C4.759,4.811,3.991,5.129,3.441,5.129H1.3 c-0.55,0-1,0.45-1,1v3c0,0.551,0.45,1,1,1h2.024c0.55,0,1.318,0.318,1.707,0.707l2.562,2.563C7.982,13.787,8.3,13.654,8.3,13.105 V2.27z"/>	 </g></svg></div>');
			});
		}
		
				
		//Preload Static image
		if(Frame[current].StaticImage){
			$(".txtmcBtn").removeAttr("data-disabled");
			$(".preLoad").append("<img  src='../Images/"+ url +"/"+ Frame[current].StaticImage +".jpg'/>");
		}
		


		//Set Lesson Header	
		$(".mainSvgs .mType").html("Student's Book")
		if(Frame[current].Lesson.length<2){$(".mainSvgs .mModule").html(Frame[current].ModuleText+""+Frame[current].Lesson);}
		else{$(".mainSvgs .mModule").html(Frame[current].ModuleText+" "+Frame[current].Lesson);}		
				
		$(this).addClass("backgroundImage");		
		container.append(img);
		$(".IWB").removeClass("loading");		
		
	}
	img.src = "../Images/"+ url +"/"+ Frame[current].Image +".jpg";
	
	
	try{$(".preLoad").html("<img src='../Images/"+ url +"/"+ Frame[current+1].Image +".jpg' />")}catch(err){}
	
	currentFrame=current;
	
	
}



//Video tab
$(document).on("click", "[data-video]", function () {
	clearSound();
	$(".IWB").addClass("loading");
	$(".videoWrapper").removeClass("worksheetSelect");
	$(".videoExtra").remove();
	$(".videoWrapper source").attr("src","../Video/"+ $(this).attr("data-video") +".mp4");
	$(".videoWrapper").css("display","block");	
	vFlag=1;
	var pId=$(this).attr("data-targetsubs");
	
	$.each(Frame[currentFrame].Portal, function( index, value ) {
		if(pId==value.id){
			if(value.SubsArray){		
				subs=value.SubsArray;				
			};
			if(value.TargetSub){
				$.each(Subs, function( index2, value2 ) {
					if(value2.id==value.TargetSub){subs=value2.SubsArray; return false;}
				});			
			};
		}
	});
	$(".videoWrapper video")[0].load();
	$(".videoWrapper video")[0].play();
	videoCurrent=1;
});

$(document).on("click", ".worksheetSelect", function (e) {
	if($(e.target).hasClass("worksheetSelect")){
		clearVideo();
	$(".videoWrapper").fadeOut(0);
	$(".videoExtra").remove();}
});


//Portal multiple video tabs
$(document).on("click", "[data-videotarget]", function () {
	$(".videoWrapper").prepend("<div class='videoExtra'></div>").addClass("worksheetSelect");
	if($(this).attr("data-videotarget")=="video"){
		$(".videoExtra").append("<span>Videos</span>");
		$.each(Frame[currentFrame].Portal, function( index, value ) {
			var str="";
			if(value.Video){str="data-video=\""+ value.Video +"\""}
			$(".videoExtra").append("<div "+ str +" data-targetsubs=\""+ value.id +"\"><span>"+ value.Worksheet +"</span></div>");
		});
	}
	
	else{
		$(".videoExtra").append("<span>Worksheets</span>");
		$.each(Frame[currentFrame].Portal, function( index, value ) {
			var str="";
			if(value.Video){str="data-correlation=\""+ value.Worksheet +"\" data-type=\"PO\""}
			$(".videoExtra").append("<div "+ str +" ><span>"+ value.Worksheet +"</span></div>");
		});		
	}	
	$(".videoWrapper").css("display","block");
});	


//Auto-scroll fixed
function removeAutoscroll(){
	$.each(Frame[tempAS2].ScrollTo, function( index, value ) {
		$.each(Frame[tempAS2].SoundPhrases, function( index2, value2 ) {
			if(value2 === value.sec){
				Frame[tempAS2].SoundPhrases.splice(index2,2);
				return false;
			}					
		});
	});
}





//Next-previous buttons
$(document).on("click", "[data-frame]:not([data-disabled])", function () {
	if (Frame[currentFrame].Salon==false && Frame[currentFrame].ScrollTo){removeAutoscroll();}//fix auto-scroll
	var minus=1;
	if(Infos.SalonDisabled){minus=0;}
	
	var frame;var flag=-1;	
	clearSound();
	switch($(this).attr("data-frame")) {
		case "previous":
		   InitialSalon(currentFrame-1);			
			break;
		case "next":
			InitialSalon(currentFrame+1);	
			break;
		default:
			InitialSalon($(this).attr("data-frame"));
	}	
});		




//Audio play-pause button
$(document).on("click", ".audioBtn svg", function () {
	if($("[data-phrasesound]").length==1){clearSound();}	
	$(this).parent().toggleClass("audioPause");
	if(!$(this).parent().hasClass("audioPause")){
		$(".extraInfo audio")[0].pause();
		try{
			clearInterval(soundInterval);}
		catch(err){}}		
	else{	
			try{
			if($(".extraInfo audio")[0].currentTime<Frame[currentFrame].SoundPhrases[0]){$(".extraInfo audio")[0].currentTime=Frame[currentFrame].SoundPhrases[0];$(".extraInfo audio").attr("data-start",Frame[currentFrame].SoundPhrases[0]);}
			}catch(err){$(".extraInfo audio").attr("data-start","0");}
			
			$(".extraInfo audio").attr("data-end",$(".extraInfo audio")[0].duration);
		
		$(".extraInfo audio")[0].play();		
		soundInterval=setInterval(soundPhrases,20);
	}
	
	
});	


//Audio stop button
$(document).on("click", ".stopBtn svg", function () {	
		clearSound();
});	



//Video stop button
$(document).on("click", ".videoPause ~ .videostopBtn svg", function () {	
	clearVideo();
	$(".videoPlayBtn").removeClass("videoPause");
	$(".subsSpan").html("");		
});	



//Sound phrase click trigger
$(document).on("click", "[data-phrase]", function () {	

	if(!$(this).hasClass("phraseActive")){
		clearSound();
		soundCurrent=$(this).attr("data-phrase")*2-1;	
		$(".extraInfo audio")[0].currentTime=Frame[currentFrame].SoundPhrases[soundCurrent-1];
		$(this).addClass("phraseActive");
		$(".extraInfo audio").attr("data-start",Frame[currentFrame].SoundPhrases[soundCurrent-1]);
		$(".extraInfo audio").attr("data-end",Frame[currentFrame].SoundPhrases[soundCurrent]);
		$(".extraInfo audio")[0].play();
		$(".playBtnWrapper").addClass("audioPause");	
		soundInterval=setInterval(soundPhrases,20);
	}
	else{
		clearSound();
	}
	

});



//Video trigger
$(document).on("click", ".videoBtn:not([data-disabled])", function () {
	clearSound();
	$(".IWB").addClass("loading");	
	$(".videoWrapper").removeClass("worksheetSelect");
	$(".videoExtra").remove();
	$(".videoWrapper source").attr("src","../Video/"+ Frame[currentFrame].Video +".mp4");
	$(".videoWrapper").css("display","block");	
	vFlag=1;
	$(".videoWrapper video")[0].load();
	$(".videoWrapper video")[0].play();
});	


//On video load
$('.videoWrapper video').on('canplay', function(){	
	if(vFlag==1){
	$(".playBtn").removeClass("playBtn").addClass("pauseBtn");
	$(".subsOn").addClass("subsOff");
	$(".subsSpan").html("");	
	$(".subsSpan").fadeOut(0);
	$("[data-videopart]").remove();
	if(Frame[currentFrame].Parts){
		$.each(Frame[currentFrame].Parts, function( index, value ) {
			var left=value.time/1000/$(".videoWrapper video")[0].duration*200-12.5+"px";
			$(".videoBar").append("<div data-videopart="+ value.time +" style='left:"+ left +"'>"+ String.fromCharCode((index+65)) +"</div>");
			if(value.enabled){$(".videoWrapper video")[0].currentTime=value.time/1000;}			
		});	
	}	
	if(Frame[currentFrame].SubsArray){		
		subs=Frame[currentFrame].SubsArray;			
	};	
	if(Frame[currentFrame].TargetSub){
		$.each(Subs, function( index, value ) {
			if(value.id==Frame[currentFrame].TargetSub){subs=value.SubsArray; return false;}
		});			
	};	
	vFlag=0;
	videoInterval=setInterval(videoBar,20);
		$(".IWB").removeClass("loading");
	}

});


//Video pause trigger
$(document).on("click", ".videoPause", function () {	
	$(".videoWrapper video")[0].pause();
	$(".videoPause").removeClass("videoPause");	
	clearInterval(videoInterval);	
});

//Video play trigger
 $(document).on("click", ".videoPlayBtn:not(.videoPause)", function () {	
	$(".videoWrapper video")[0].play();
	$(this).addClass("videoPause");
	videoInterval=setInterval(videoBar,20);
}); 

//Close Video
$(document).on("click", ".closeVideo", function () {	
	clearVideo();
	$("[data-videopart]").remove();
	$(".videoWrapper").fadeOut(0);
});

//Enable subtitles 
$(document).on("click", ".subsOff", function () {	
	$(".subsOff").removeClass("subsOff");
	$(".subsSpan").fadeIn(0);
});

//Disable subtitles
$(document).on("click", ".subsOn:not(.subsOff)", function () {	
	$(".subsOn").addClass("subsOff");
	$(".subsOn").addClass("subsOff");
	$(".subsSpan").fadeOut(0);
});


//Reset interactive activity
$(document).on("click", ".interactiveReset", function () {	
	$(".dropInteractive").html("");		
	$(".dragTransparent").removeClass("dragTransparent");
	$(".interactive").removeClass("selected");	
	$(".interactiveCheck").attr("class","interactiveCheck");
	$(".interactiveCorrect,.interactiveWrong").fadeOut(0);
	$(".intWrong,.intCorrect").removeClass("intWrong intCorrect");

});



//Show correct interactive values
$(document).on("click", ".interactiveShow", function () {
	$(".dropInteractive").html("");		
	$(".dragTransparent").removeClass("dragTransparent");
	$(".interactive").removeClass("selected");	
	$(".interactiveCheck").attr("class","interactiveCheck");
	$(".interactiveCorrect,.interactiveWrong").fadeOut(0);
	$(".intWrong,.intCorrect").removeClass("intWrong intCorrect");
	
	if($(".intCorrect").length==0||$(".intWrong").length>0){
	$(".dropInteractive").each( function( index, value ) {
		$(this).html($("[data-dragint=\""+ $(this).attr("data-dropint") +"\"]")[0].outerHTML);
		$(this).children().css({top:$(this).css("top"),left:$(this).css("left")});
		if(!Frame[currentFrame].Interactive.dragMore){$(".container>.dragInteractive[data-dragint=\""+ $(this).attr("data-dropint") +"\"]").addClass("dragTransparent");}	
	});	
	$("[data-multiplecorrect=\"true\"]").addClass("selected");
	
	
	$(".interactiveCheck").attr("class","interactiveCheck interactiveEnabled");
	$(".interactiveEnabled").click();
	$(".interactiveCheck").attr("class","interactiveCheck");

	$(".interactiveCorrect,.interactiveWrong").fadeOut(0);
	}
	else{
		$(".interactiveReset").click();
		
	}
	
});


//Check interactive anwers
$(document).on("click", ".interactiveEnabled", function () {	
	var correct=0;var wrong=0;
	correct+=$("[data-multiplecorrect].selected").length;
	wrong+=$("[data-multiplecorrect]:not(.selected)").length;
	$("[data-multiplecorrect].selected").addClass("intCorrect");
	$(".selected:not([data-multiplecorrect])").addClass("intWrong");
	
	$(".dragging").removeClass("dragging");
	$(".dropInteractive").each( function( index, value ) {
		if($(this).attr("data-dropint")==$(this).children("[data-dragint]").attr("data-dragint")){
			correct++;	
			$(this).children("[data-dragint]").addClass("intCorrect")
		}
		else{wrong++;
		$(this).children("[data-dragint]").addClass("intWrong")
		}
	});	
	
	$(".interactiveCorrect > span").html(correct);
	$(".interactiveWrong > span").html(wrong);
	$(".interactiveCorrect,.interactiveWrong").fadeIn(0);
});



//Drag and drop interactive mousedown trigger
$(document).on("mousedown touchstart", ".dragInteractive", function (e) {	
	$(".intWrong,.intCorrect").removeClass("intWrong intCorrect");

	$(".interactiveCorrect,.interactiveWrong").fadeOut(0);
	$(".dragging").removeClass("dragging");
	
	$(this).addClass("dragging");
	
	$(".container").append($(this)[0].outerHTML);
	
	if(!Frame[currentFrame].Interactive.dragMore){$(".dragging").eq(0).addClass("dragTransparent");}	

	$(".dragging").eq(0).removeClass("dragging");
	if($(this).closest(".dropInteractive").length>0){$(this).remove();}
	
	inter=coords(e,".dragging");
	$(document).on("mousemove touchmove", onInteractive);
	$(document).on("mouseup touchend", onInteractiveUp);
});


//On drag interactivetrigger
var onInteractive = function(e) {	
	var dim=coords(e,".container");
	
	$(".dragging").css({'left': (dim.left-inter.left) +'px','top': (dim.top-inter.top) +'px'});

};


//On mouse up interactive trigger
var onInteractiveUp = function(e) {
	e.preventDefault;
	var dim=coords(e,".container");
	var flag=0;var inp;
	$(".dropInteractive").each( function( index, value ) {
		var left = parseFloat($(this).css("left").replace("px"));
		var top = parseFloat($(this).css("top").replace("px"));
		if(dim.left>left&&dim.left<(left+$(this).width())&&dim.top>top&&dim.top<(top+$(this).height())){			
			if($(this).children().length==1){
				$(".container>[data-dragint=\""+ $(this).children().attr("data-dragint") +"\"]").removeClass("dragTransparent");
				$(this).html("");
			}	
			$(this).append($(".dragging")[0].outerHTML);
			inp=$(this);flag=1;			
			
		}
		
		if(!Frame[currentFrame].Interactive.dragMore){try{$(".container>[data-dragint=\""+ $(this).children().attr("data-dragint") +"\"]").addClass("dragTransparent");}catch(err){}
}					
	});
	
	if(flag==0){$(".container>[data-dragint=\""+ $(".container>.dragging").attr("data-dragint") +"\"]").removeClass("dragTransparent");
		}	
	$(".container>.dragging").remove();
	
		
	if($(".dropInteractive .dragInteractive").length==$(".dropInteractive").length){
		$(".interactiveCheck").attr("class","interactiveCheck interactiveEnabled");		
	}
	else{
		$(".interactiveCheck").attr("class","interactiveCheck");	
		
	}	
	$(document).off("mousemove touchmove", onInteractive);
	$(document).off("mouseup touchend", onInteractiveUp);
};


//Go to vocabulary
$(document).on("click", "[data-type='VC']:not([data-disabled])", function () {	
	var glCor=$(this).attr("data-correlation").toUpperCase();var type="SB";
	if(Infos.Module=="Hello"){glCor="Hello";}
	if(Infos.Workbook_Correlation.length==0&&Infos.Studentsbook_Correlation.length>0){glCor+=" WB";type="WB"}
	
	if($(this).attr("data-correlation")){
		window.name = '{"GlossaryModule":"'+ Infos.Module +'","GlossaryLesson":"'+glCor+'","Type":"'+type+'","Return":"'+(parseInt(currentFrame)+1)+'"}'		
	}		
	setTimeout(function(){ window.location.href = "../EX/Vocabulary.html";}, 200);	
});




//Portal to correlation
$(document).on("click", "[data-type='PO']", function () {
	
	window.name = '{"Lesson":"'+$(this).attr("data-correlation")+'"}';
	var url = $(this).attr("data-type");
	setTimeout(function(){window.location.href = "../EX/Portal"+ Infos.Module +".html";	}, 200);
});	



$(document).on("click", ".mainBack", function () {
	
	var str=window.location.href;
	var type=str.substring(str.lastIndexOf("\/")-2,str.lastIndexOf("\/"));
	if(Infos.MainBack){type=Infos.MainBack;}	
	var Main={Module:Infos.Module,Type:type};
	window.name = '{"Module":"'+Infos.Module+'","Type":"'+type+'"}';
	
	setTimeout(function(){window.location.href = "../MainMenu.html";}, 200);
	
	
});	



//Sound bar click trigger
$(document).on("click", ".soundBar", function (e) {	
	$(".extraInfo audio")[0].pause();
	clearInterval(soundInterval);
	if($(".extraInfo audio[data-start]").length==0){
			$(".extraInfo audio").attr("data-start","0");
			$(".extraInfo audio").attr("data-end",$(".extraInfo audio")[0].duration);
		}
	var left=coords(e,".soundBar").left;
	var percentage = (left)/$(this).width();	
	var start=parseFloat($(".extraInfo audio").attr("data-start"));
	var end=parseFloat($(".extraInfo audio").attr("data-end"));
	var soundWidth = (end-start);	
	var cr=percentage*soundWidth+start;
	$(".phraseActive").removeClass("phraseActive");	
	 try{$.each(Frame[currentFrame].SoundPhrases, function( index, value ) {
		if(cr<=value){			
			soundCurrent=index+1;
			if(soundCurrent%2==0){soundCurrent--;}			
			return false;}			
	});}
	catch(err){}			
	$(".extraInfo audio")[0].currentTime=cr;
	$(".extraInfo audio")[0].play();
	$(".audioBtn").addClass("audioPause");
	
	soundInterval=setInterval(soundPhrases,20);
});	


//Videobar
$(document).on("click", ".videoBar", function (e) {
	$(".subsSpan").html("");
	if(!$(e.target).is("[data-videopart]")){
    clearInterval(videoInterval);
	var left=coords(e,".videoBar").left;
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

	
//Video part click
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

//On end of sound
$('.extraInfo audio').on('ended', function() {	
   clearSound();
});


//On end of video
$('.videoContainer video').on('ended', function() {
	clearVideo();
	$(".pauseBtn").removeClass("pauseBtn").addClass("playBtn");
	$(".videoWrapper").fadeOut(0);
});




//Interactive, choice click trigger
$(document).on("click", ".choice", function () {
$(".interactiveCorrect,.interactiveWrong").fadeOut(0);	
$(".intWrong,.intCorrect").removeClass("intWrong intCorrect");

	$("[data-multiplegroup='"+ $(this).attr("data-multiplegroup") +"']").removeClass("selected");	
	$(this).addClass("selected");
	if($("[data-multiplegroup].selected").length==$("[data-multiplecorrect]").length){
		$(".interactiveCheck").attr("class","interactiveCheck interactiveEnabled");		
		}	
});






//Mouse down styles
$(document).on("mousedown", ".interactiveShow,.interactiveReset,.homeBtn,.videoBtn:not([data-disabled]),[data-video],.portalCor,[data-type],.secondBackbtn,toolsWrapper>svg,.justmaskClose,[data-justification],[data-sticker],.homeBtn.mainActive,.exitBtn.mainActive,[data-frame]:not([data-disabled]),.audioBtn svg,.videoPlayBtn svg,.stopBtn svg,.videoPause ~ .videostopBtn svg,.closeVideo", function (e) {
	$('.pressed').attr('class', function(index, classNames) {return classNames.replace('pressed', '');});
	$(this).attr('class', function(index, classNames) {return classNames + ' pressed';});
	$(".clickSound")[0].play();
});

//Hover styles
$(document).on("mouseenter touchstart", ".interactiveShow,.interactiveReset,.homeBtn,.videoBtn:not([data-disabled]),.portalCor,[data-video],[data-type]:not([data-disabled]),.secondBackbtn,.toolsWrapper>svg,.justmaskClose,[data-justification],[data-sticker],.homeBtn.mainActive,.exitBtn.mainActive,[data-frame]:not([data-disabled]),.audioBtn svg,.videoPlayBtn svg,.stopBtn svg,.videoPause ~ .videostopBtn svg,.closeVideo", function (e) {
	$('.pressed').attr('class', function(index, classNames) {return classNames.replace('pressed', '');});	
	$(this).attr('class', function(index, classNames) {return classNames + ' pressed';});
	
});

//Mouse up reset 
$(document).on("mouseup", function () {	//fix
	
	$('.pressed').attr('class', function(index, classNames) {return classNames.replace('pressed', '');});	
});

//Hover out reset
$(document).on("mouseleave touchend", ".interactiveShow,.interactiveReset,.homeBtn,.videoBtn:not([data-disabled]),[data-video],.secondBackbtn,.toolsWrapper>svg,.justmaskClose,.secondButton,[data-extramodule]>span,.modulesExtraSub>span,[data-correlation],[data-justification],[data-sticker],.homeBtn.mainActive,.exitBtn.mainActive,[data-frame]:not([data-disabled]),.audioBtn svg,.videoPlayBtn svg,.stopBtn svg,.videoPause ~ .videostopBtn svg,.closeVideo", function (e) {
	
	$('.pressed').attr('class', function(index, classNames) {return classNames.replace('pressed', '');});
	
});


//Return to Main menu
$(document).on("click", ".homeBtn", function () {
	setTimeout(function(){window.location.href = "../MainMenu.html";}, 200);		
});	



//Mouse wheel Scroll
$(document).on( 'mousewheel DOMMouseScroll', '.container,.justificationWrapper,.scroll,.justScroll', function(e){
		var delta;var inp;var inpScroll;
		 if (e.originalEvent) {
			if (e.originalEvent.wheelDelta) delta = e.originalEvent.wheelDelta / -40;
			if (e.originalEvent.deltaY) delta = e.originalEvent.deltaY;
			if (e.originalEvent.detail) delta = e.originalEvent.detail;
		}
		delta = (delta<0 ? -1 : 1);
			
			
			srl.Container=$(".container");
			srl.Handle=$(".scrollHandle");			
			
		
		scrollTo(srl.Container.scrollTop() + 100 * delta);				   
});


//Scrollbars Scroll
$(document).on("mousedown touchstart", ".scroll,.justScroll", function (e) {	
				
		srl.Container=$(".container");
		srl.Handle=$(".scrollHandle");
		scrollY=$(".container>img").height()-$(".container").height();	
			
	$(document).on("mousemove touchmove",scrollMove);	
	$(document).on("mouseup touchend",scrollUp);	
});

function scrollMove(e)
{		
	var top=coords(e,srl.Handle.parent()).top-10;
	
	scrollTo(scrollY*top/115);	
	
}	

function scrollUp(e)
{	
	e.preventDefault;
	var top=coords(e,srl.Handle.parent()).top-10;	
	scrollTo(scrollY*top/115);
    $(document).off("mousemove touchmove",scrollMove);	
	$(document).off("mouseup touchend",scrollUp);	
}


//Scroll to Position
function scrollTo(position){	
	if(srl.Container.find("img").last().height()>740){
		if(position<0){
			position=0;
		}
		else if(position>srl.Container.find("img").last().height()-740){
			position=srl.Container.find("img").last().height()-740;
		}
		
		srl.Container.scrollTop( position);
		srl.Handle.css("top",115*position/(srl.Container.find("img").last().height()-740)+"px");		
	}	
}





//Keyboard keys next-previous
$(document).keyup(function(e) {
	
if(e.which == 37 || e.which == 39) {
    var frame;var flag=1;	
	clearSound();	
	switch(e.which) {
		case 37:
		if(parseInt(currentFrame)!=0){InitialSalon(currentFrame-1);}
		break;
		case 39:
		if(parseInt(currentFrame)!=Frame.length-1){InitialSalon(currentFrame+1);}
		
		break;
		}		
	}
});







//Sound Phrases, soundbar and autoscrolling function
function soundPhrases(){
var currentTime=$(".extraInfo audio")[0].currentTime;	
if(Frame[currentFrame].SoundPhrases){	
	if(soundCurrent%2==1){
		if(currentTime>=Frame[currentFrame].SoundPhrases[soundCurrent-1]){		
			$("[data-phrase="+  parseInt((soundCurrent+1)/2) +"]").addClass("phraseActive");
			
			srl.Container=$(".container");
			srl.Handle=$(".scrollHandle");
			
			var top=parseFloat($(".phraseActive").css("top"));
			var height=parseFloat($(".phraseActive").css("height"));			 
			 if( top + height > srl.Container.scrollTop() + 720 || top < srl.Container.scrollTop())
				 {	
					top-=40;
					srl.Container.animate({ scrollTop: top }, 100);
					scrollTo(top);		
					
				 }	
		
			soundCurrent++;
			}
		}
	else{
		if(currentTime>=Frame[currentFrame].SoundPhrases[soundCurrent-1]){		
			$(".phraseActive").removeClass("phraseActive");
			soundCurrent++;		
			}
	} 
} 



if($(".extraInfo audio").attr("data-end")<=$(".extraInfo audio")[0].currentTime){
	clearSound();	
}
else{
	var start=parseFloat($(".extraInfo audio").attr("data-start"));
	var end=parseFloat($(".extraInfo audio").attr("data-end"));
	var soundWidth = (end-start);	
	var soundBarWidth=$(".soundBar").width();
	var percentage=(currentTime-start)/soundWidth;
	if(percentage>1){percentage=1;}
	var bWidth=percentage*(soundBarWidth-24);
	$(".soundBar .barRed").css("width",bWidth+"px");
	if ((bWidth*0.8+10)<27){$(".soundBar .barRed").css("height",(bWidth*0.8+10)+"px");$(".soundBar .barRed").css("border-radius","100%");}
	else{$(".soundBar .barRed").css("height","26px");$(".soundBar .barRed").css("border-radius","20px");}
	var tr = minTwoDigits(Math.floor(((currentTime-start) + 1) / 60)) + ":" + minTwoDigits(Math.ceil((currentTime-start)) % 60);
	$(".soundTimer").html(tr);	
}

}




//Video Interval, videobar and subs
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




//Sound button
$(document).on("click", "[data-alstart]", function () {	
	
	
	if(!$(this).hasClass("soundSelected")){
		clearSound();
		
		$(".extraInfo audio")[0].currentTime=$(this).attr("data-alstart");
		$(this).addClass("soundSelected");
		$(".extraInfo audio").attr("data-start",$(this).attr("data-alstart"));
		$(".extraInfo audio").attr("data-end",$(this).attr("data-alend"));
		
		$(".playBtnWrapper").addClass("audioPause");
		$(".extraInfo audio")[0].play();
		soundInterval=setInterval(soundPhrases,20);
	}
	else{clearSound();}
	
});



//Clear all sound variables and reset
function clearSound(){
	try{
	clearInterval(soundInterval);
	}
	catch(err){}
	try{
	$(".extraInfo audio").attr("data-start",Frame[currentFrame].SoundPhrases[0]);
	$(".extraInfo audio").attr("data-end",Frame[currentFrame].SoundPhrases[Frame[currentFrame].SoundPhrases.length-1]);}
	catch(err){}
	$(".extraInfo audio")[0].pause();
	try{$(".extraInfo audio")[0].currentTime=0;}catch(err){}
	soundCurrent=1;
	$(".audioPause").removeClass("audioPause");
	$(".phraseActive").removeClass("phraseActive");
	$(".soundTimer").html("00:00");
	$(".barRed").css("width","0px");
	$(".barRed").css("height","10px");
	$(".soundSelected").removeClass("soundSelected");	
}

//Clear video variables and reset
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






//On windows resize apply scaling
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
		window.scale=scale;
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
$( document ).ready(function() {

window.onunload = function(){}; 



	var downloadingImage = new Image();



downloadingImage.onload = function(){	
		$(".sprite").addClass("ready"); 
		window.name = "First";
		setTimeout(function(){ 
			window.open("MainMenu.html","_self");
			window.location = "MainMenu.html";
			window.name = "First";
		}, 4000);	
};
downloadingImage.src = "Images/Main/first.png";
	
	
	
		







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





$(document).on("click", ".skipIntro", function () {
	window.name = "First";
	window.open("MainMenu.html","_self");
	window.location = "MainMenu.html";
	window.name = "First";
});






	



});

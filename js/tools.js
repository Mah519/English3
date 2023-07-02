$( document ).ready(function() {
function coords(e,rel){
	
	var IWB= $(".IWB").offset();
	
	var click={};
	var box={};	
	var str={};
	var hide={};
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
//////////////////////                  Tools start                 ///////////////////////////////
var strokeWidth=5;
var strokeColor="#000000"
var tool="pencil";
var rectangleMode="";
var points={};
var transf={top:455,left:640};
//on move store the position
/* document.getElementById("sketch").addEventListener('mousemove touchmove', function(e) {
mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layefx;
mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layefy;

}, false); */




//on click down store the click coordinates	and add event listener for click up
$(document).on("mousedown touchstart", "#sketch", function(e) {
$(".inverse").remove();
if( $(e.target).closest(".textTool").length==0){
if(tool=="pencil"){	
	$("#sketch").append("<svg class='pencil toolDraw' stroke-width='"+ strokeWidth +"' stroke='"+ strokeColor +"' style='top:"+ coords(e,"#sketch").top +"px;left:"+ coords(e,"#sketch").left +"px'><path d='M0 0'/></svg>");
	$(document).on("mousemove touchmove", onPaint);
}

if(tool=="highlighter"){
	$("#sketch").append("<svg class='pencil toolDraw' stroke-opacity='0.5' stroke-width='"+ strokeWidth +"' stroke='"+ strokeColor +"' style='top:"+ coords(e,"#sketch").top +"px;left:"+ coords(e,"#sketch").left +"px'><path d='M0 0'/></svg>");
	$(document).on("mousemove touchmove", onPaint);
}



if(tool=="rectangle"){
	if($(e.target).closest(".rectangle").length>0 && rectangleMode!="inverse"){
		
		try{$(e.target).closest(".rectangle").attr("class",$(e.target).closest(".rectangle").attr("class")+" toolDraw");}catch(err){}
		hide=coords(e,".toolDraw");
		$(document).on("mousemove touchmove", onRectangleDrag);
	}
	else{
		if(rectangleMode=="stroke"){$("#sketch").append("<svg class='rectangle toolDraw' fill='none' stroke-width='"+ strokeWidth +"' stroke='"+ strokeColor +"' style='top:"+ coords(e,"#sketch").top +"px;left:"+ coords(e,"#sketch").left +"px'><rect width='0' height='0'/></svg>");}
		if(rectangleMode=="fill"){$("#sketch").append("<svg class='rectangle toolDraw' fill='"+ strokeColor +"' stroke-width='"+ strokeWidth +"' stroke='"+ strokeColor +"' style='top:"+ coords(e,"#sketch").top +"px;left:"+ coords(e,"#sketch").left +"px'><rect width='0' height='0'/></svg>");}
		if(rectangleMode=="inverse"){$("#sketch").append("<svg class='rectangle toolDraw' fill='none' stroke-width='1' stroke='"+ strokeColor +"' style='top:"+ coords(e,"#sketch").top +"px;left:"+ coords(e,"#sketch").left +"px'><rect width='0' height='0'/></svg>");}
		var dim=coords(e,"#sketch");
		points.left=dim.left;
		points.top=dim.top;
		$(document).on("mousemove touchmove", onRectangle);
	}	
}

if(tool=="ellipse"){
	
	if($(e.target).closest(".ellipse").length>0 && rectangleMode!="inverse"){
		
		try{$(e.target).closest(".ellipse").attr("class",$(e.target).closest(".ellipse").attr("class")+" toolDraw");}catch(err){}
		hide=coords(e,".toolDraw");
		$(document).on("mousemove touchmove", onRectangleDrag);
	}
	else{
	
		if(rectangleMode=="stroke"){$("#sketch").append("<svg class='ellipse toolDraw' fill='none' stroke-width='"+ strokeWidth +"' stroke='"+ strokeColor +"' style='top:"+ coords(e,"#sketch").top +"px;left:"+ coords(e,"#sketch").left +"px'><ellipse cx='0' cy='0' rx='0' ry='0/>'</svg>");}
		if(rectangleMode=="fill"){$("#sketch").append("<svg class='ellipse toolDraw' fill='"+ strokeColor +"' stroke-width='"+ strokeWidth +"' stroke='"+ strokeColor +"' style='top:"+ coords(e,"#sketch").top +"px;left:"+ coords(e,"#sketch").left +"px'><ellipse cx='0' cy='0' rx='0' ry='0'/></svg>");}
		if(rectangleMode=="inverse"){$("#sketch").append("<svg class='ellipse toolDraw' fill='none' stroke-width='1' stroke='"+ strokeColor +"' style='top:"+ coords(e,"#sketch").top +"px;left:"+ coords(e,"#sketch").left +"px'><ellipse cx='0' cy='0' rx='0' ry='0'/></svg>");}

		
		var dim=coords(e,"#sketch");
		points.left=dim.left;
		points.top=dim.top;
		$(document).on("mousemove touchmove", onEllipse);
	}
}



if(tool=="text"){	
	if($(e.target).closest(".textTool").length==0){
		
		try{localStorage.getItem("project");
		$("#sketch").append("<div class='textTool' style='top:"+ coords(e,"#sketch").top +"px;left:"+ coords(e,"#sketch").left  +"px;'><div class='txtAreaDrag'><img src='../Images/src/T-note-move.png'/><span class='saveTool'>Save</span><img class='toolX' src='../Images/src/T-note-x.png'/></div><div class='txtAreaInput' contenteditable='true'></div><img src='../Images/src/textareaImg.png'/></div>");
		}
		catch(err){
			$("#sketch").append("<div class='textTool' style='top:"+ coords(e,"#sketch").top +"px;left:"+ coords(e,"#sketch").left  +"px;'><div class='txtAreaDrag'><img src='../Images/src/T-note-move.png'/><span class='saveTool' title='Your browser does not support save.' style='opacity:0.3'>Save</span><img class='toolX' src='../Images/src/T-note-x.png'/></div><div class='txtAreaInput' contenteditable='true'></div><img src='../Images/src/textareaImg.png'/></div>");

			
		}
		
		
		$('.textareaTmp').focus().removeClass("textareaTmp");
	}	
}

}

if(tool=="zoom"){
	var dim=coords(e,"#sketch");
	points.left=dim.left;
	points.top=dim.top;
	$(document).on("mousemove touchmove", onZoom);
}

if(tool=="hide"){
		if($(e.target).attr("class")!="resizeDiag" && $(e.target).attr("class")!="resizeVert" && $(e.target).attr("class")!="resizeHor"){				
			hide=coords(e,".hide");
			$(document).on("mousemove touchmove", onHide);		
			$(document).on("mouseup touchend", "#sketch", onHideUp); 
		}
		else if($(e.target).closest(".hide").length>0){
			var dim=coords(e,"#sketch");
		points.left=dim.left;
		points.top=dim.top;
		
		points.width=$(".hide").width();
		points.height=$(".hide").height();	
		$(document).on("mousemove touchmove", resizeF);	
		$(document).on("mouseup touchend", resizeUp);		
		lockFlag=1;
		}
}

});




var onPaint = function(e) {	
	var top=coords(e,"#sketch").top-parseFloat($(".toolDraw").css("top").replace("px"));	
	var left=coords(e,"#sketch").left-parseFloat($(".toolDraw").css("left").replace("px"));	
	$(".toolDraw path").attr("d",$(".toolDraw path").attr("d") + " L" +left + " " +top);
};

var onRectangle = function(e) {	
	var dim=coords(e,"#sketch");	
	var width=dim.left-points.left;
	var height=dim.top-points.top;
	var left = (width < 0 ? dim.left : points.left);
	var top = (height < 0 ? dim.top : points.top);	
	width = (width < 0 ? points.left-dim.left : width);
	height = (height < 0 ? points.top-dim.top : height);
	$(".toolDraw rect").attr("width",width).attr("height",height);
	$(".toolDraw").css({"top":top+"px","left":left+"px"});
};

var onEllipse = function(e) {	
	var dim=coords(e,"#sketch");	
	var width=dim.left-points.left;
	var height=dim.top-points.top;
	var left = (width < 0 ? dim.left : points.left);
	var top = (height < 0 ? dim.top : points.top);	
	width = (width < 0 ? points.left-dim.left : width);
	height = (height < 0 ? points.top-dim.top : height);
	
	
	$(".toolDraw ellipse").attr("cy",height/2).attr("ry",height/2).attr("cx",width/2).attr("rx",width/2);
	$(".toolDraw").css({"top":top+"px","left":left+"px"});
};

var onZoom = function(e) {	
	var dim=coords(e,"#sketch");
	transf.left-=(dim.left-points.left)*1.5;
	transf.top-=(dim.top-points.top)*1.5;
	transf.left = (transf.left < 0 ? 0 : transf.left);
	transf.top = (transf.top < 0 ? 0 : transf.top);
	transf.left = (transf.left > 1280 ? 1280 : transf.left);
	transf.top = (transf.top > 910 ? 910 : transf.top);
	$(".mainWrapper,#sketch").css('transform', 'scale(1.5)').css('transform-origin', (transf.left) + 'px ' + (transf.top) + 'px');	
};




$(document).on("mouseup touchend",function(e) {
	if($(".toolsEnabled").length==1){
	e.preventDefault;
	if(tool=='pencil' || tool=='highlighter'){$(document).off("mousemove touchmove", onPaint);}	
	if(tool=='rectangle'){
		 if(rectangleMode=="inverse"){
			try{
			var top=$(".toolDraw").css("top").replace("px","");
			var left=$(".toolDraw").css("left").replace("px","");
			var width=$(".toolDraw rect").attr("width");
			var height=$(".toolDraw rect").attr("height");
			$("#sketch").append("<div class='inverse' style='top:"+ top +"px;left:"+ left +"px;width:"+ width +"px;height:"+ height +"px'></div>");
			$(".toolDraw").remove();
			}catch(err){}
				}			
		$(document).off("mousemove touchmove", onRectangle);
		$(document).off("mousemove touchmove", onRectangleDrag);		
		}
	if(tool=='ellipse'){
		if(rectangleMode=="inverse"){
			try{
			var top=$(".toolDraw").css("top").replace("px","");
			var left=$(".toolDraw").css("left").replace("px","");
			 var width=$(".toolDraw ellipse").attr("cx")*2;
			var height=$(".toolDraw ellipse").attr("cy")*2;
			$("#sketch").append("<div class='inverse' style='border-radius:100%;top:"+ top +"px;left:"+ left +"px;width:"+ width +"px;height:"+ height +"px'></div>");
			$(".toolDraw").remove();
			}catch(err){}
				}	
		
		$(document).off("mousemove touchmove", onEllipse);
		$(document).off("mousemove touchmove", onRectangleDrag);		

	}
	if(tool=='eraser'){		
		try{if($(e.target).is("svg")&&$(e.target).closest("#sketch").length>0){$(e.target).remove();}}catch(err){}	
		try{if($(e.target).closest("svg").length>0&&$(e.target).closest("#sketch").length>0){$(e.target).closest("svg").remove();}}catch(err){}
		try{if($(e.target).closest(".hide").length>0){$(e.target).closest(".hide").remove();}}catch(err){}
		try{if($(e.target).closest(".textTool").length>0){$(e.target).closest(".textTool").remove();}}catch(err){}

	}
	
	if(tool=='zoom'){		
		$(document).off("mousemove touchmove", onZoom);
	}
	
	if(tool=='hide'){		
		$(document).off("mousemove touchmove", onZoom);
	}
	
	
	
	try{$(".toolDraw").attr("class",$(".toolDraw").attr("class").replace("toolDraw",""));}catch(err){}	}
});





function clearZoom(){
	transf={top:455,left:640};
	
	$(".mainWrapper,#sketch").css('transform', 'scale(1)').css('transform-origin', (transf.left) + 'px ' + (transf.top) + 'px');
	
}








$(document).on("click", "[data-eraser]", function () {
	tool = 'eraser';
	$(".hide").remove();
});

$(document).on("click", ".toolX", function () {
	$(this).closest(".textTool").remove();
});




$(document).on("click", "[data-tool]", function () {
	
	tool=$(this).attr("data-tool");
	
	if(tool=='zoom'){		
		$(".mainWrapper,#sketch").css('transform', 'scale(1.5)');		
	}
	else{clearZoom();}
	$(".hide").remove();
	
	
});

$(document).on("click", "[data-stroke]", function () {
	if(tool=='zoom'){}
	strokeWidth=$(this).attr("data-stroke");
	if(tool!='highlighter'&&tool!='pencil'){tool='pencil'}
	$(".hide").remove();
});

$(document).on("click", "[data-color]", function () {
	strokeColor = $(this).attr("data-color");
		if(tool!='highlighter'&&tool!='pencil'){tool='pencil'}

	$(".hide").remove();
});




$(document).on("click", "[data-hide]", function (e) {
	clearZoom();
	tool="hide";
	if($(".hide").length==0){
		$("#sketch").append("<div class='hide'><img src='../Images/src/hide-box-tool-move.png' class='hideCenter'/><img src='../Images/src/hide-box-tool-resize.png' class='hideRight'/><div class='resizeDiag'></div></div>")
	}
	
	


});




function resizeF(e)
{	
	var dim=coords(e,"#sketch");
	var width = points.width+(dim.left-points.left) < 10 ? 10 : points.width+(dim.left-points.left);
	var height = points.height+(dim.top-points.top) < 10 ? 10 : points.height+(dim.top-points.top);
	if(height>100){
	$(".hide").css({"height":height+"px",'opacity':'0.7'});
	}
	if(width>100){
	$(".hide").css({"width":width+"px",'opacity':'0.7'});
	}
}

function resizeUp(e)
{	
	e.preventDefault;
	resize=0;
	$(document).off("mousemove touchmove", resizeF);	
	$(document).off("mouseup touchend", resizeUp);
	$(".hide").css({'opacity':'1'});
	
}	







var onHide = function(e) {
var dim=coords(e,"#sketch");
$(".hide").css({'left': dim.left-hide.left +'px','top': dim.top-hide.top +'px','opacity':'0.7'});
};

var onRectangleDrag = function(e) {
var dim=coords(e,"#sketch");
$(".toolDraw").css({'left': dim.left-hide.left +'px','top': dim.top-hide.top +'px'});
};




function onHideUp(e)
{
	e.preventDefault;
	$(document).off("mousemove touchmove");
	$(document).off("mouseup touchend", "#sketch");	
	$(".hide").css({'opacity':'1'});	 
}	

$(document).on("click", "[data-rectangle]", function () {
	rectangleMode=$(this).attr("data-rectangle");
	$(".hide").remove();
});

$(document).on("click", ".reverseTools", function () {
	
	$(".toolBox").toggleClass("toolBoxVertical");
});

$(document).on("click", ".toolBox svg .toolCircle,.toolBox svg .toolCircleReverse", function () {
	try{$(".toolActive").attr("class",$(".toolActive").attr("class").replace("toolActive",""));}catch(err){}
	try{$(".toolSelected").attr("class",$(".toolSelected").attr("class").replace("toolSelected",""));}catch(err){}
	var cl="";
	try{ cl=$(this).parent().attr("class").trim();}catch(err){}
	if(cl==undefined){$(this).parent().attr("class","toolActive");}else{$(this).parent().attr("class",cl+" toolActive");}
	
});



$(document).on("click", ".toolsWrapper>svg", function () {
	
	$(".toolBox,#sketch").toggleClass("enabled");	
	$("body").toggleClass("toolsEnabled");
	clearZoom();
});

$(document).on("click", "[data-eraser],[data-clear],[data-tool],[data-color],[data-stroke],[data-zoom],[data-unzoom],.highlighter,[data-hide]", function (e) {
	e.stopPropagation();	
	try{ cl=$(".toolActive").attr("class").trim();}catch(err){}
	if(cl==undefined){$(".toolActive").attr("class","toolSelected");}else{$(".toolActive").attr("class",cl+" toolSelected");}
	$(".inverse").remove();

});

$(document).on("dragstart", "img", function() {
     return false;
});



$(document).on("click", "[data-clear]", function () {	
	$("#sketch").html("");	
});

$(document).on("click", "[data-last]", function () {	
	$("#sketch").children().last().remove();	
});




$(document).on("click", ".textTool", function () {
	if(tool == 'eraser'){$(this).remove();}	
});






$(document).on("mousedown touchstart", ".txtAreaDrag", function (e) {
	$(this).closest(".textTool").addClass("toolDraw");
	hide=coords(e,".toolDraw");	
	$(document).on("mousemove touchmove", textareaMove);	
	$(document).on("mouseup touchend", textareaMoveUp);	
	
});

$(document).on("mousedown touchstart", ".textTool>img", function (e) {
	$(this).closest(".textTool").addClass("toolDraw");	
	$(document).on("mousemove touchmove", textareaResize);	
	$(document).on("mouseup touchend", textareaResizeUp);	
});


function textareaResize(e){  	
	var dim=coords(e,".toolDraw");	
	var width = dim.left < 150 ? 150 : dim.left;
	var height = dim.top < 150 ? 150 : dim.top;
	$(".toolDraw").css({'width': width +'px','height': height +'px'});
	$(".toolDraw .txtAreaInput").css({'width': width +'px','height': (height-30) +'px'});	
}

function textareaResizeUp()
{	
	$(document).off("mousemove touchmove", textareaResize);	
	$(document).off("mouseup touchend", textareaResizeUp);
}

function textareaMoveUp()
{
    $(document).off("mousemove touchmove", textareaMove);	
	$(document).off("mouseup touchend", textareaMoveUp);	
	
	
}

function textareaMove(e){ 	
	var dim=coords(e,"#sketch");
	$(".toolDraw").css({'left': dim.left-hide.left +'px','top': dim.top-hide.top +'px'});
}





function toolsReset(){
	
	
if(inverseFlag==0){
ctx.globalCompositeOperation = 'source-over';
ctx.drawImage(tmp_canvas, 0, 0);}
else{inverseFlag=0}
tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);	
	$(document).off("mousedown touchstart", ".hide");	
	$(document).off("mousedown touchstart", ".resizeDiag");	
	$(".hide").remove();rect.diffx=440;rect.diffy=285;
	
	
}






});






















												
$(function(){
	var imgHeight = $("#scroll_bar li a img").height();
	var cloneImg = $("#scroll_bar li:first").clone();
	$("#scroll_bar").append(cloneImg);
	var imgSize = $("#scroll_bar li").size();
	var k = 0;
	var timer = null;

	for (var i = 0; i < imgSize-1; i++) {
		$("#controler").append("<div></div>");
	};

    $("#controler div:first").addClass("onfocus");




    /*调用层*/
	$("#bt-left").click(function(){
		toBottom();
	});

	$("#bt-right").click(function(){
		toTop();
	});

	$("#controler div").click(function(){
        var index = $(this).index();
        k = index;
        $("#scroll_bar").animate({top:-index * imgHeight},800);
        $("#controler div").eq(index).addClass("onfocus").siblings().removeClass("onfocus");
	});
    
    //左按钮鼠标移入移出事件
	$("#bt-left").mouseenter(function(){
		$(this).css({"borderColor":"#ffffff","color":"#ffffff"});
		$("#bt-right").css({"borderColor":"#ffffff","color":"#ffffff"});
		clearInterval(timer);
	}).mouseleave(function(){
		$(this).css({"borderColor":"#000000","color":"#000000"});
		$("#bt-right").css({"borderColor":"#000000","color":"#000000"});
		timer = setInterval(function(){
			toTop();
		},4000);
	});

    //右按钮鼠标移入移出事件
	$("#bt-right").mouseenter(function(){
		$(this).css({"borderColor":"#ffffff","color":"#ffffff"});
		$("#bt-left").css({"borderColor":"#ffffff","color":"#ffffff"});
		clearInterval(timer);
	}).mouseleave(function(){
		$(this).css({"borderColor":"#000000","color":"#000000"});
		$("#bt-left").css({"borderColor":"#000000","color":"#000000"});
		timer = setInterval(function(){
			toTop();
		},4000);
	});
    
    //控制按钮鼠标移出移入事件
	$("#controler div").mouseenter(function(){
		clearInterval("timer");
	}).mouseleave(function(){
		timer = setInterval(function(){
           toTop();
		},4000);
	});
    
    //动画框鼠标移出移入事件
	$("#scroll_bar").mouseenter(function(){
		clearInterval(timer);
	}).mouseleave(function(){
		timer = setInterval(function(){
			toTop();
		},4000);
	});


	function toTop(){
       k++;
       if(k == imgSize){
       	 $("#scroll_bar").css("top","0");
       	 k = 1;
       }
       $("#scroll_bar").animate({top:-k * imgHeight},800);
       $("#controler div").eq(k).addClass("onfocus").siblings().removeClass("onfocus");
       if(k == imgSize - 1){
       	  $("#controler div").eq(0).addClass("onfocus").siblings().removeClass("onfocus");
       }
	};


	function toBottom(){
		k--;
		if(k == -1){
			$("#scroll_bar").css("top",-(imgSize - 1) * imgHeight);
			k = imgSize - 2;
		}
		$("#scroll_bar").animate({top:-k * imgHeight},800);
		$("#controler div").eq(k).addClass("onfocus").siblings().removeClass("onfocus");
	}

    timer = setInterval(function(){
        toTop();
    },4000);

})
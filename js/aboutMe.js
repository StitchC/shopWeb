$(function(){
	var leftWidth = $(".left-active-nav ul li").width();//获取左边新闻导航栏每一个导航内容的宽度
	var rightWidth = $(".right-active-nav ul li").width();
    $("#wrap-left-active div:not(:first)").hide();
    $("#wrap-right-active div:not(:first)").hide();
    $("#left-scroll-bar").css("width",leftWidth + "px");
    $("#right-scroll-bar").css("width",rightWidth + "px");

    //左侧新闻导航栏点击事件
    $("#left-nav li").click(function(){
    	var index = $(this).index();
    	$("#wrap-left-active div").eq(index).fadeIn(500).siblings().hide();
    	$("#left-scroll-bar").animate({left:index * leftWidth + "px"});
    	return false;
    });
    

    //右侧新闻导航栏点击事件
    $("#right-nav li").click(function(){
       var index = $(this).index();
       $("#wrap-right-active div").eq(index).fadeIn(500).siblings().hide();
       $("#right-scroll-bar").animate({left:index * rightWidth + "px"});
       return false;
    });

	$("#demo1").slideBox({
        duration: 0.8
	});

	$("#hot-news-scroll").mCustomScrollbar({
		alwaysShowScrollbar: 1,
		theme:"dark-2"
	});
})
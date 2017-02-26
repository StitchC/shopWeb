$(function(){
   
    var Data = {
    	 广东省:{
			广州市:"荔湾区,越秀区,海珠区,天河区,芳村区,白云区,黄埔区,番禺区,花都区,增城市,从化市",
			深圳市:"罗湖区,福田区,南山区,宝安区,龙岗区,盐田区",
			珠海市:"香洲区,斗门区,金湾区",  
			湛江市:"赤坎区,霞山区,坡头区,麻章区,竹溪县,徐闻县,廉江市,雷州市,吴川市"  
		  }, 
		  河北省:{
			石家庄市:"深泽县,无极县,赵县",  
			唐山市:"玉田县,遵化市,迁安市"
	      },
		  山东省:{
			济南市:"历下区,市中区,槐荫区,天桥区,历城区,长清县,平阴县,济阳县,商河县,章丘市",
			青岛市:"市南区,市北区,四方区,黄岛区,崂山区,李沧区,城阳区"  
		  }
    };

    var ClothData = {
    	 春季:{
			春季男装:"男装T恤,男装商务衬衣,男装休闲,男装商务,2016新款男装,男装休闲衬衣",
			春季女装:"女装T恤,女装商务衬衣,女装休闲,女装商务,2016新款女装,女装休闲衬衣",
			春季外套:"2016夏季薄款外套,简约外套,商务外套",  
			春季套裙:"百褶套裙,复古风套裙,休闲套裙,风格套裙,晚礼服", 
			春季休闲商务套装:"男装商务时尚套装,女装商务时尚套装"
		  }, 
		  夏季:{
			夏季男装:"男装T恤,男装商务衬衣,男装休闲,男装商务,2016新款男装,男装休闲衬衣",
			夏季女装:"女装T恤,女装商务衬衣,女装休闲,女装商务,2016新款女装,女装休闲衬衣",
			夏季外套:"2016夏季薄款外套,简约外套,商务外套",  
			夏季套裙:"百褶套裙,复古风套裙,休闲套裙,风格套裙,晚礼服", 
			夏季休闲商务套装:"男装商务时尚套装,女装商务时尚套装"
	      },
		  秋季:{
			秋季男装:"男装T恤,男装商务衬衣,男装休闲,男装商务,2016新款男装,男装休闲衬衣",
			秋季女装:"女装T恤,女装商务衬衣,女装休闲,女装商务,2016新款女装,女装休闲衬衣",
			秋季外套:"2016夏季薄款外套,简约外套,商务外套",  
			秋季套裙:"百褶套裙,复古风套裙,休闲套裙,风格套裙,晚礼服", 
			秋季休闲商务套装:"男装商务时尚套装,女装商务时尚套装"
		  },
		  冬季:{
			冬季季男装:"男装商务衬衣,男装休闲,男装商务,2016新款男装,男装休闲衬衣",
			冬季女装:"女装商务衬衣,女装休闲,女装商务,2016新款女装,女装休闲衬衣",
			冬季外套:"2016冬季外套,简约外套,商务外套",  
			冬季套裙:"百褶套裙,复古风套裙,休闲套裙,风格套裙,晚礼服", 
			冬季休闲商务套装:"男装商务时尚套装,女装商务时尚套装"
		  }
    };
    
    //网页结构加载完成之后把所有省份添加到省份列表中
    $.each(Data,function(_provinse,content1){     
       $("#provin").append("<option value="+ _provinse +">"+ _provinse +"</option>");
    });

    $("#provin").change(function(){
      $("#city")[0].options.length = 0;
      $("#area")[0].options.length = 0;
      //遍历一次 data 数组和省份作对比 如果为真遍历第二个参数content1
      //遍历content1 把content1 里面的内容添加到市的下拉框
      //然后再遍历一次content1 和市份做比较 如果为真遍历第二个参数_area
      //然后把 _area 的全部内容都添加到 区/县的下拉框去
      $.each(Data,function(_provinse,content1){
      	 if($("#provin option:selected").text() == _provinse){
      	 	$.each(content1,function(_city,_area){
      	 		$("#city").append("<option value="+ _city +">"+ _city +"</option>");
      	 	});
      	 	$.each(content1,function(_city,_area){
      	 		if($("#city option:selected").text() == _city){
      	 			$.each(_area.split(","),function(){
      	 				$("#area").append("<option value="+ this +">"+ this +"</option>");
      	 			})
      	 		}
      	 	})

      	 	$("#city").change(function(){
      	 		$("#area")[0].options.length = 0;
      	 		$.each(content1,function(_city,_area){
      	 			if($("#city option:selected").text() == _city){
                       $.each(_area.split(","),function(){
                       	  $("#area").append("<option value="+ this +">"+ this +"</option>");
                       })
      	 			}
      	 		})
      	 	})
      	 }
      })
    })
      
    $.each(ClothData,function(_season,content1){	
    	$("#season").append("<option value="+ _season +">"+ _season +"</option>")
    });

    $("#season").change(function(){
    	$("#style")[0].options.length = 0;
    	$("#detail")[0].options.length = 0;
    	$.each(ClothData,function(_season,content1){
    		if($("#season option:selected").text() == _season){
    			$.each(content1,function(_style,_detail){
    				$("#style").append("<option value="+ _style +">"+ _style +"</option>");
    			})

    			$.each(content1,function(_style,_detail){
    				if($("#style option:selected").text() == _style){
    					$.each(_detail.split(","),function(){
    						$("#detail").append("<option value="+ this +">"+ this +"<option>");
    					})
    				}
    			})

    			$("#style").change(function(){
    			$("#detail")[0].options.length = 0;
    			$.each(content1,function(_style,_detail){
    				if($("#style option:selected").text() == _style){
    					$.each(_detail.split(","),function(){
    						$("#detail").append("<option value="+ this +">"+ this +"</option>");
    					})
    				}
    			})
    		})
    		}

    	})
    })
   

    
    

    




	$("#form").fadeIn(1200);
	$("#intro").animate({marginTop:"250px"},1000).fadeIn(800);
})
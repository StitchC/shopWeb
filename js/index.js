$(function(){
    //封装主页图片轮播
    //1.轮播图片的载体
    //2.轮播的图片
    //3.左右点击按钮
    //4.下面的点击按钮载体
    //5.文字介绍的载体
    //6.文字内容
    function ImagesPlayer(imgDrive,images,leftBtn,rightBtn,controlBtnDrive,
      textContent,ctrlBtnUI,animateTime,intervalTime,textTime){
      this.imgDrive = imgDrive;//获取轮播的ul 元素
      this.images = images;//获取所有图片
      this.leftBtn = leftBtn; //获取左移按钮
      this.rightBtn = rightBtn;//获取右移按钮
      this.controlBtnDrive = controlBtnDrive;//获取下面的所有控制按钮
      this.textContent = textContent;//获取文本的介绍内容
      this.animateTime = animateTime;//获取动画的时间
      this.intervalTime = intervalTime;//获取定时器的调用时间
      this.textTime = textTime;//获取文字出现的事件
      this.timer = null;//初始化定时器
      this.imgNum = 0;//初始化图片当前index
      this.imgWidth;//获取当前元素宽
      this.imgLen = 0;//获取图片的总数
      this.ctrlBtns = null;//获取所有的控制按钮
      this.ctrlBtnUI = ctrlBtnUI;//获取点击元素时设置的class
      
    }

    

    //设置控制按钮数量
    ImagesPlayer.prototype.setCtrlBtn = function(){
      var fragment = document.createDocumentFragment();
      var that = this; 
      (function(){
        for (var i = 0; i < that.imgLen - 1; i++) {
          var div = document.createElement("div");
          fragment.appendChild(div);
        }
      })();
      this.controlBtnDrive.append(fragment);
      this.ctrlBtns = this.controlBtnDrive.children("div");//获取所有点击按钮对象
      this.controlBtnDrive.children("div").eq(0).addClass(this.ctrlBtnUI);//初始化第一个按钮样式

    }



    //设置图片布置
    ImagesPlayer.prototype.setImgArray = function(){
      //复制第一张图片摆到最后
      var firstImg = this.imgDrive.children("li").first().clone();//获取第一个子元素
      this.imgDrive.append(firstImg);
      this.images = this.imgDrive.children("li");//更新图片载体下的所有图片对象
      this.imgLen = this.images.size();//更新图片数量
    }




    //设置图片自适应屏幕宽度
    ImagesPlayer.prototype.setResize = function(){
      var that = this;
      $(window).resize(function(){
        that.imgWidth = $(window).width();

        that.images.css("width",that.imgWidth);//动态设置所有图片对象的宽

        that.imgDrive.stop().css({"width":that.imgLen * that.imgWidth,
          "left":-that.imgNum * that.imgWidth});//动态调整图片载体的宽和位置
        
      });
    }


    //初始化页面
    ImagesPlayer.prototype.init = function(){
      this.imgWidth = $(window).width();//初始化每一张图片的宽度
      this.images.css("width",this.imgWidth);//设置每一张图片的宽度
      this.imgDrive.css("width",this.imgLen * this.imgWidth);//设置图片载体的宽度
    }


    //设置左按钮函数
    ImagesPlayer.prototype.toLeft = function(){
      this.imgNum--;//图片当前的index 减1
      if(this.imgNum == -1){
        //当imgNum等于-1的时候
        //图片载体位置跳到最后一张克隆图处
        this.imgDrive.css("left",-(this.imgLen - 1) * this.imgWidth);
        
        //在重置imgNum 的值为倒数第二张图片的index值
        this.imgNum = this.imgLen - 2;
      }

      this.imgDrive.animate({left:-this.imgNum * this.imgWidth},this.animateTime);
      this.ctrlBtns.eq(this.imgNum).addClass(this.ctrlBtnUI).siblings().
      removeClass(this.ctrlBtnUI);
      this.textContent.eq(this.imgNum).fadeIn(this.textTime).siblings().hide();
    }




    //设置右按钮函数
    ImagesPlayer.prototype.toRight = function(){
      this.imgNum++;
      if (this.imgNum == this.imgLen) {
        //如果点击切换后 imgNum为5 即最后一张克隆图点击过后
        //图片载体重设到开头的位置
        this.imgDrive.css("left",0);
        //然后imgNum 在重新赋值为 1
        this.imgNum = 1;
      }

      //如果imgNum 为4 即最后一张克隆图的位置
      if (this.imgNum == this.imgLen - 1) {
        this.textContent.eq(0).fadeIn(this.textTime).siblings().hide();
        this.ctrlBtns.eq(0).addClass(this.ctrlBtnUI).siblings().removeClass(this.ctrlBtnUI);
      }
      this.imgDrive.animate({left:-this.imgNum * this.imgWidth},this.animateTime);
      this.ctrlBtns.eq(this.imgNum).addClass(this.ctrlBtnUI).siblings().removeClass(this.ctrlBtnUI);
      this.textContent.eq(this.imgNum).fadeIn(this.textTime).siblings().hide();

    }



    //控制按钮点击事件函数
    ImagesPlayer.prototype.ctrlBtnClick = function(){
      this.imgDrive.stop().animate({left:-this.imgWidth * this.imgNum},this.animateTime);
      this.ctrlBtns.eq(this.imgNum).addClass(this.ctrlBtnUI)
      .siblings().removeClass(this.ctrlBtnUI);
      this.textContent.eq(this.imgNum).fadeIn(this.textTime).siblings().hide();
    }



    ImagesPlayer.prototype.MouseEnter = function(){
      clearInterval(this.timer);
    }

    ImagesPlayer.prototype.MouseLeave = function(){
      var that = this;
      this.timer = setInterval(function(){
        that.toRight();
      },this.intervalTime);
    }
    //------逻辑层结束







    //设置左按钮点击事件
    ImagesPlayer.prototype.setLeftBtnClick = function(){
      var that = this;
      this.leftBtn.click(function(){
        that.toLeft();
      })
    }




    //设置右按钮点击事件
    ImagesPlayer.prototype.setRightBtnClick = function(){
      var that = this;
      this.rightBtn.click(function(){
        that.toRight();
      })
    }





    //控制按钮点击事件
    ImagesPlayer.prototype.setCtrlBtnClick = function(){
      var that = this;
      this.ctrlBtns.click(function(){
        that.imgNum = $(this).index();
        that.ctrlBtnClick();
      })
    }


    ImagesPlayer.prototype.setMouseEnter = function(){
      var that = this;
      this.ctrlBtns.mouseenter(function(){
        that.MouseEnter();
      });

      this.leftBtn.mouseenter(function(){
        that.MouseEnter();
      });

      this.rightBtn.mouseenter(function(){
        that.MouseEnter();
      });
    }

    ImagesPlayer.prototype.setMouseLeave = function(){
      var that = this;
      this.ctrlBtns.mouseleave(function(){
        that.MouseLeave();
      });

      this.leftBtn.mouseleave(function(){
        that.MouseLeave();
      });

      this.rightBtn.mouseleave(function(){
        that.MouseLeave();
      });
    }


    //设置定时器
    ImagesPlayer.prototype.setScrollInterval = function(){
      var that = this;
      this.timer = setInterval(function(){
        that.toRight();
      },this.intervalTime);
    }



    //初始化轮播
    ImagesPlayer.prototype.rander= function(){
         this.setImgArray();
         this.init(); 
         this.setCtrlBtn();
         this.setResize();
         this.setLeftBtnClick();
         this.setRightBtnClick();
         this.setCtrlBtnClick();
         this.setScrollInterval();
         this.setMouseEnter();
         this.setMouseLeave();
    }
    //-------调用层结束





    
    //封装nav 特效
    function NavScroll(headerElem,navElem,loginBtn,registerBtn,
      headerChangeClass,navChangeClass,loginChangeClass,registerChangeClass){
      this.headerElem = headerElem;
      this.navElem = navElem;
      this.loginElem = loginBtn;
      this.registerElem = registerBtn;
      this.headerClass = headerChangeClass;
      this.navClass = navChangeClass;
      this.loginClass = loginChangeClass;
      this.registerClass = registerChangeClass;
    }

    NavScroll.prototype.setScrollChange = function(){
      var that = this;
      $(window).scroll(function(){
          var $scroll_top = $(document).scrollTop();
          if ($scroll_top > 0) {
            that.headerElem.addClass(that.headerClass);
            that.navElem.addClass(that.navClass);
            that.loginElem.addClass(that.loginClass);
            that.registerElem.addClass(that.registerClass);
          }else{
            that.headerElem.removeClass(that.headerClass);
            that.navElem.removeClass(that.navClass);
            that.loginElem.removeClass(that.loginClass);
            that.registerElem.removeClass(that.registerClass);
          }
      })
    }

    NavScroll.prototype.init = function(){
      this.setScrollChange();
    }

 
  
  var $ul = $("#move");
  var $images = $("#move li");
  var $leftBtn = $("#to-left");
  var $rightBtn = $("#to-right");
  var $ctrlBtns = $("#controler");
  var $text = $("#describe div");
  var $header = $("#index-header");
  var $nav = $("#index-nav");
  var $login = $("#login");
  var $register = $("#register");


  var scroll = new ImagesPlayer($ul,$images,$leftBtn,$rightBtn,$ctrlBtns,$text,
    "onfocus",800,4000,900);
  scroll.rander();


  var navScroll = new NavScroll($header,$nav,$login,$register,"header-scroll","nav-scroll",
    "login-scroll-style","register-scroll-style");
  navScroll.init();
  
  

})
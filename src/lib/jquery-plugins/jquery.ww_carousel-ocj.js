;
(function($){
function wwCarousel({pics,width,height,changeTime,prev_nextBtn}){//定义一个轮播图的构造函数，里面需要定义所有轮播图里面的属性
        this.pics = pics;//定义一个装图片的盒子
        this.width = width;
        this.height = height;//定义盒子宽高
        this.changeTime = changeTime || 2000;//定义轮播速度，如果不传则默认为2秒
        this.prev_nextBtn = prev_nextBtn;//定义向前、向后按钮，如果需要，则传入true，不需要则传入false或者不传
        this.container = null;//定义装ul的一个盒子，即本例中的.box
        this.lis = null;//定义一个盒子装所有的li
        this.points = null;//定义一个盒子装所有的i
        this.len = pics.length;//定义一个长度，为图片的集合长度，即有几张图片
        this.currentIndex = 0;//将当前的初始索引位置定义为0，即刚开始显示第一张图片
        this.nextIndex = 1;//将下一张的初始索引位置定义为1，即向第二张轮播
        this.timer = null;//定义一个计时器
        this.prev = null;//定义向前的按钮
        this.next = null;//定义向后的按钮
    }

    $.extend(wwCarousel.prototype,{
        createDom : function(container){
            this.container = $(container);
            this.container.addClass("ww-container");//给传入的轮播图盒子加上一个类名，加上类名以后可以在轮播图的css样式里面设置默认样式
            //给包裹图片的li布局
            var lis = "",points = "";//定义一个空的字符串，接收后面定义的html标签组成的模板字符串
            for(var i = 0,len = this.pics.length;i<len;i++){//进行for循环，将遍历到的每个图片以li标签包a标签包img的形式加入到lis集合中，将小圆点以i的标签加入到points集合中
              lis += `<li ${i == 0 ? "style='display:block;'" : ""}>
                          <a href="${this.pics[i].href}">
                            <img src="${this.pics[i].src}"/>
                          </a>
                        </li>`; //用三目运算符：如果i为0，也就是当遍历到第一张图片时，将其的display设为block，其余每张不设置，则默认刚开始只有第一张显示出来
                points += `<i ${i == 0 ? "class='current'" : ""}></i>`; 
            }
            var prev_next = "";//向前、向后按钮的样式设置
            if(this.prev_nextBtn){//如果有传入prev_nextBtn，也就是传入true，则表示要生成向前、向后，则将其样式加入到prev_next的字符串中
                prev_next = `<div class="prev" style="display:none;">
                                <span class="lt_icon">&lt;</span>
                                <em></em></div>
                            <div class="next" style="display:none;">
                                <span class="gt_icon">&gt;</span>
                                <em></em></div>`;
            }
            var html = `<ul class="pics">${lis}</ul>
            <div class="pages">${points}</div>${prev_next}`;//将前面设置的lis和points和prev_next样式加到外部盒子的html中，完成整个轮播图的样式设置
            this.container.html(html);//调用html方法，将前面设置的轮播图盒子的样式加入到盒子的html里面
            this.container.css({//设置盒子的css样式
                width : this.width,
                height : this.height
            });
            $(".pics,li,img",this.container).css({//防止使用的图片自身宽高与盒子宽高不一致，在这里加上img标签，保证改变图片自身大小//设置ul、li、img的宽高
                width : this.width,
                height : this.height
            });
            $(".pages",this.container).css("width",this.width);//设置小圆点的盒子的宽度与轮播图盒子宽度一致
            //将js中设置的样式与html中的进行一一绑定对应
            this.lis = $("li",this.container);
            this.points = $("i",this.container);
            this.prev = $(".prev",this.container);
            this.next = $(".next",this.container);
            this.reg_e_listener();//调用事件监听事件，移入、移出、前后点击
        },
        //自动轮播
        autoPlay : function(){
            this.timer = setInterval($.proxy(this.move,this),this.changeTime);
            //计时器方法中的this指向有改变（只有调用的函数里面的this指向改变了，后面的时间没有进行改变），指向window，此时调用proxy方法改变this指向，第一个参数是要调用的函数，第二个参数指要改变成的this指向？？？
        },
        //轮播的具体动作
        move : function(){
            this.lis.eq(this.currentIndex).stop().fadeOut();//当前图片做淡出动作，在做淡出动作之前要清除本身在做的动作（为了保险起见最好在做相关动作之前都清一下本身的其他动作）
            this.lis.eq(this.nextIndex).stop().fadeIn();//下一张图片做淡入动作
            this.points.eq(this.currentIndex).removeClass("current");//当前的小圆点移除current的class名，也就是取消显示的样式
            this.points.eq(this.nextIndex).addClass("current");//给下一个小圆点设置current的class名，设置下一个小圆点显示
            this.currentIndex = this.nextIndex;//将当前位置的索引赋给下一个
            this.nextIndex++;//将下一个的索引做++操作
            if(this.nextIndex >= this.len){
                this.nextIndex = 0;//做判断，如果索引位置大于等于图片的长度，将下一个的索引赋给0，即显示到最后一张的时候，继续跳到第一张
            }
        },
        stopPlay : function(){
           clearInterval(this.timer);//停止自动轮播，停掉计时器
        },
        points_over : function(e){//点击小圆点，事件委派
            var _index = $(e.target).index();//获取点击对应小圆点时，其对应的索引号
            if(this.currentIndex == _index)//如果点到的小圆点正好是当前正在显示图片，return停止
                return;
            this.nextIndex = _index;//如果不是，就将下一个索引值赋给点击到的索引值，再调用move，进行轮播运动
            this.move();
        },
        _prev : function(){//点击向前操作
            this.nextIndex = this.currentIndex -1;//将下一个出现的索引设置为当前索引-1，即往前
            if(this.nextIndex < 0)//如果下一个的索引小于0，将下一个的索引赋给最后一张图
                this.nextIndex = this.len - 1;
            this.move();//调用move函数做轮播动作
        },
        reg_e_listener : function(){//事件监听：鼠标移入停止轮播，鼠标移出继续轮播，点击向前，向前翻页，点击向后，向后翻页
             this.container.hover($.proxy(this.stopPlay,this),$.proxy(this.autoPlay,this));
            this.container.mouseover(function(){
                $(".prev,.next").css({"display":"inline-block"});

            });
            this.container.mouseout(function(){
                $(".prev,.next").css({"display":"none"});

            });
            this.points.mouseover($.proxy(this.points_over,this));//小圆点移入时，调用小圆点移入函数
            this.prev.click($.proxy(this._prev,this));
            this.next.click($.proxy(this.move,this));
        }
    });

    $.fn.wwCarousel = function(options){//设置原型方法，给一个函数，传入参数options，即指的返回的数据，可以包含多个实例
        this.each(function(index,element){//将给定的数据做遍历，function里面的两个参数，index指的是当前遍历到的元素的索引值，也就是每一个实例的索引值，即在页面中第几个实例，element值当前遍历到的元素，也就是实例本身
            var c = new wwCarousel(options);//构造函数创建实例
            c.createDom(element);//创建对应的dom元素
            c.autoPlay();//调用自动轮播

        });
    }

})(jQuery);
    




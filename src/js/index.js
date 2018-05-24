require(["config"], function(){
    // 依赖配置中各短名称的模块
    require(["jquery", "addHeaderAndFooter","carousel","cookie"], function($){
        $(function(){
          //倒计时
            window.onload = setInterval(function(){       
                    var now = new Date().getTime(),
                        deadline = new Date("2018-05-28T00:00:00").getTime(),
                        diff = deadline - now,
                        totalSeconds = Math.ceil(diff/1000),
                        seconds = ("0"+totalSeconds%60).slice(-2),
                        minutes = ("0"+Math.floor(totalSeconds/60%60)).slice(-2),
                        hours = ("0"+Math.floor(totalSeconds/3600)%24).slice(-2),
                        result = hours + ":" +minutes +":"+ seconds;                  
                      $(".daojishi").text(result);                        
                },1000);
            //轮播图
           $.ajax({
                type : "get",
                url : "../mock/carousel.json",
                dataType : "json",
                success : function(responseData){        
                  // console.log(responseData);             
                        $(".main_car").wwCarousel({
                            pics:responseData.res_body.index1.pics,
                            width:responseData.res_body.index1.width,
                            height:responseData.res_body.index1.height,
                            changeTime:responseData.res_body.index1.changeTime,
                            prev_nextBtn:responseData.res_body.index1.prev_nextBtn});
                        $(".fl3_car").wwCarousel({
                            pics:responseData.res_body.index2.pics,
                            width:responseData.res_body.index2.width,
                            height:responseData.res_body.index2.height,
                            changeTime:responseData.res_body.index2.changeTime});
                        $(".fl4").wwCarousel({
                            pics:responseData.res_body.index3.pics,
                            width:responseData.res_body.index3.width,
                            height:responseData.res_body.index3.height,
                            changeTime:responseData.res_body.index3.changeTime});
                         $(".fl5_car").wwCarousel({
                            pics:responseData.res_body.index4.pics,
                            width:responseData.res_body.index4.width,
                            height:responseData.res_body.index4.height,
                            changeTime:responseData.res_body.index4.changeTime});
                         $(".fl6_car").wwCarousel({
                            pics:responseData.res_body.index5.pics,
                            width:responseData.res_body.index5.width,
                            height:responseData.res_body.index5.height,
                            changeTime:responseData.res_body.index5.changeTime});
                }
            });
           //产品
           $.ajax({
                type : "get",
                url : "../mock/products.json",
                dataType : "json",
                success : function(responseData){
                  responseData.res_body.fl1r.forEach(function(pro){
                      $(".fl1_r").children("dl:first").clone()
                      .css({display:"inline-block"})
                      .appendTo(".fl1_r")
                      .children("em").text(pro.id)
                      .parent().children("dt").children("img").attr("src",pro.img)
                      .parents("dt").next("dd")
                      .children("a").text(pro.a)
                      .next("span").text(pro.span);                    
                 });
                  responseData.res_body.fl2r.forEach(function(pro){
                      $(".fl2_r").children("dl:first").clone()
                      .css({display:"inline-block"})
                      .appendTo(".fl2_r")
                      .children("em").text(pro.id)
                      .parent().children("dt").children("img").attr("src",pro.img)
                      .parents("dt").next("dd")
                      .children("a").text(pro.a)
                      .next("span").text(pro.span)
                      .next("del").text(pro.del);                    
                 });
                  responseData.res_body.fl3r.forEach(function(pro){
                      $(".fl3_r").children("dl:first").clone()
                      .css({display:"inline-block"})
                      .appendTo(".fl3_r")
                      .children("em").text(pro.id)
                      .parent().children("dt").children("img").attr("src",pro.img)
                      .parents("dt").next("dd")
                      .children("a").text(pro.a)
                      .next("span").text(pro.span)
                      .next("del").text(pro.del);                    
                 });
                  responseData.res_body.fl5r.forEach(function(pro){
                      $(".fl5_r").children("dl:first").clone()
                      .css({display:"inline-block"})
                      .appendTo(".fl5_r")
                      .children("em").text(pro.id)
                      .parent().children("dt").children("img").attr("src",pro.img)
                      .parents("dt").next("dd")
                      .children("a").text(pro.a)
                      .next("span").text(pro.span)
                      .next("del").text(pro.del);                    
                 });
                  responseData.res_body.fl6r.forEach(function(pro){
                      $(".fl6_r").children("dl:first").clone()
                      .css({display:"inline-block"})
                      .appendTo(".fl6_r")
                      .children("em").text(pro.id)
                      .parent().children("dt").children("img").attr("src",pro.img)
                      .parents("dt").next("dd")
                      .children("a").text(pro.a)
                      .next("span").text(pro.span)
                      .next("del").text(pro.del);                    
                 });
                }                
            });
        //购物车
        $(".fl1_r").on("click",".in_add",function(e){
        var _dl = $(this).parents("dl");
        var currentProd = {
            id : _dl.children("em").text(),
            imgs : _dl.children("dt").children("img").attr("src"),
            desc : _dl.children("dd").children("a").text(),
            price : _dl.children("dd").children("span").text(),
            amount : 1
        }
        $.cookie.json = true;
        var products = $.cookie("products") || [];
        var index = exist(currentProd.id,products);
        var sum_amount = 0;
            for(var i=0;i<products.length;i++){
                sum_amount = products[i].amount-1+1 + (sum_amount - 1 +1);
            }
        if(index !== -1){
            products[index].amount++;
            sum_amount++;
            $(".c_point").text(sum_amount);
        } else{
            products.push(currentProd);
            sum_amount++;
            $(".c_point").text(sum_amount);
        }
        $.cookie("products",products,{expires:7,path:"/"});

    });


    function exist(id,products){
        for(var i = 0,len = products.length;i<len;i++){
            if(products[i].id == id){
                return i;
            }
        }
        return -1;
    }

    //二级菜单出现
    $(".allp li:eq(0)").mouseover(function() {
          $(".s_menu").css({"display":"block"});
    });
    $(".allp li").mouseout(function() {
          $(".s_menu").css({"display":"none"});
    });
           
        });
    });
});


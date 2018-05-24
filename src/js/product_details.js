require(["config"], function(){
    // 依赖配置中各短名称的模块
    require(["jquery", "addHeaderAndFooter","fly","cookie","zoom"], function($){
        $(function(){
          $.cookie.json = true;
           var products = $.cookie("products") || [];
           
           //点击数量加
            $(".pro_add").click(function() {
                var amount = $(".d_amount").val();
                amount++;
                $(".d_amount").val(amount);
            });  
            //点击数量减 
            $(".pro_minus").click(function() {
                var amount = $(".d_amount").val();
                amount--;
                $(".d_amount").val(amount);
            });
            //点击加入到购物车
            
            
           $(".pro_cart").click(function(){
                var currentProd = {
                    id : 999 ,
                    imgs : $(".pro_bigimg").children("img").attr("src"),
                    desc : $(".p_container").children("h3").text(),
                    price : $(".d_price").text(),
                    amount : $(".d_amount").val()
                }
                var _amount = $(".d_amount").val();
                var index = exist(currentProd.id,products);
                var sum_amount = 0;
                for(var i=0;i<products.length;i++){
                    sum_amount = products[i].amount-1+1 + (sum_amount - 1 +1);
                }
                if(index !== -1){
                    products[index].amount = products[index].amount-1+1+ (_amount-1+1);
                    sum_amount++;
                    $(".c_point").text(sum_amount);
                } else{
                    products.push(currentProd);
                    sum_amount++;
                    $(".c_point").text(sum_amount);
                }
                $.cookie("products",products,{expires:7,path:"/"});
             //购物车飞跃特效
            var flyer = $(`<img src="${currentProd.imgs}"/>`),
                offset = $(".cart").offset();
                flyer.css({width:50,height:50});
                flyer.fly({
                    start : {
                        top : $(".pro_cart").offset().top,
                        left : $(".pro_cart").offset().left
                    },
                    end : {
                        top : offset.top,
                        left : offset.left,
                        width : 0,
                        height : 0
                    }
                });
          });
            function exist(id,products){
        for(var i = 0,len = products.length;i<len;i++){
            if(products[i].id == id){
                return i;
            }
        }
        return -1;
        }

        //放大镜  
        $(".zoom").elevateZoom({
                zoomType : "lens",
                lensShape : "round",
                containLensZoom : true,
                lensSize : 200
            });
        
        //点击进行图片切换
        $(".pro_chan_big").mouseover(function(e){
            var new_src = $(e.target).attr("src");
             $(".zoom").attr("src",new_src);
             $(".zoom").attr("data-zoom-image",new_src);
        });
        });
    });
});

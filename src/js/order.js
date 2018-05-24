require(["config"], function(){
    // 依赖配置中各短名称的模块
    require(["jquery", "artTemplate","addHeaderAndFooter","cookie"], function($,template){
        $(function(){
            $.cookie.json = true;
                var _products = $.cookie("products") || [];
                if(_products.length == 0){
                    return;
                }
                var html = template("cart_temp",{products:_products});
                $(".o_tb tbody").html(html);
                // console.log(html);
                
                 function exist(id,products){
                    for(var i = 0,len = products.length;i<len;i++){
                        if(products[i].id == id){
                            return i;
                        }
                    }
                    return -1;
                }
                
                //计算总金额
                    var sum = 0;
                    $("tbody tr").each(function(index,element){
                        sum += Number($(this).find(".sub").text().split("￥")[1]);
                    });
                    $(".o_sum").text("￥" + sum.toFixed(2));
                //点击返回购物车
                $(".o_cart").click(function(){
                    location.href="http://localhost:8080/html/cart.html";
                    return false;
                });
        });
    });
});

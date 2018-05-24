define(["jquery","cookie"],function($){
    $(function(){
        $("header").load("/html/include/header.html",function(){
            $.cookie.json = true;
            var _products = $.cookie("products") || [];
            // console.log(_products);
            if(_products.length == 0){
                    return;
                }
            var sum_amount = 0;
            for(var i=0;i<_products.length;i++){
                sum_amount = _products[i].amount-1+1 + (sum_amount - 1 +1);
            }
            $(".c_point").text(sum_amount);
        //判断是否有用户登录 
            var _user = location.search;
            _user = _user.split("=");
            _user = _user[1];
            if(_user){
                $("._login").text("您好！"+_user);
                $("._reg").css("display","none");
            }else{
                $("._login").text("登录");
                $("._reg").css("display","inline-block");
            }
        //搜索框
        $(".txt").on("keyup", function(){
                let _search = $(this).val(),
                    url = `https://suggest.taobao.com/sug?code=utf-8&q=${_search}&callback=?`;
                $.getJSON(url, function(data){
                    var html = "";
                    data.result.forEach(function(curr){
                        html += `<div>${curr[0]}</div>`;
                    });
                    $(".s_result").html(html);
                });
            });
                
        });
        $("footer").load("/html/include/footer.html");

    });
});

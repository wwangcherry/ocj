require(["config"], function(){
    // 依赖配置中各短名称的模块
    require(["jquery", "addHeaderAndFooter","carousel","cookie"], function($){
        $(function(){
            //轮播图数据获取
            $.ajax({
                type : "get",
                url : "../mock/carousel.json",
                dataType : "json",
                success : function(responseData){
                        $(".log_car").wwCarousel({
                            pics:responseData.res_body.login.pics,
                            width:responseData.res_body.login.width,
                            height:responseData.res_body.login.height,
                            changeTime:responseData.res_body.login.changeTime});
                }
            });
            $.cookie.json = true;
            var users = $.cookie("users") || [];
            var _log_user,_log_pwd;
            $(".log_btn").click(function() {
                _log_user = $(".log_user").val();
                _log_pwd = $(".log_pwd").val();
                var exi1 = exist1(_log_user,users),
                    exi2 = exist2(_log_pwd,users);
                    console.log(exi1,exi2);
                if(exi1 != -1 && exi2 != -1){
                    location.href = "http://localhost:8080/index.html?u_phone=" + _log_user;
                }else{
                  $(".log_btn").attr("disabled","disabled"); 
                }
                return false;
            });

             function exist1(u_phone,users){
                for(var i = 0,len = users.length;i<len;i++){
                    if(users[i].u_phone == u_phone){
                        return i;
                    }
                }
                return -1;
            }
            function exist2(u_pwd,users){
                for(var i = 0,len = users.length;i<len;i++){
                    if(users[i].u_pwd == u_pwd){
                        return i;
                    }
                }
                return -1;
            }

            
        });
    });
});

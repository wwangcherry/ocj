require(["config"], function(){
    // 依赖配置中各短名称的模块
    require(["jquery", "addHeaderAndFooter","cookie"], function($){
        $(function(){
            //注册方式切换
            $(".r_chan").click(function() {
                if($(".r_chan").text() == "使用手机注册>"){
                    $(".r_left2").css({display:"none"});
                    $(".r_left1").css({display:"inline-block"});
                    $(".r_chan").text("使用邮箱注册>");
                }
                else{
                    $(".r_left1").css({display:"none"});
                    $(".r_left2").css({display:"inline-block"}); 
                    $(".r_chan").text("使用手机注册>");
                }
                
            });
            $.cookie.json = true;
            var users = $.cookie("users") || [];
            
            
            //手机注册
            //判断手机号码是否符合要求
            var _phone,_e_mail,_p_pwd,_p_qrpwd,_e_pwd,_e_qrpwd;
            $(".phone").blur(function() {
                _phone = $(".phone").val();
                var myreg=/^[1][3,4,5,7,8][0-9]{9}$/; 
                  if (!_phone == "") {
                        if(!myreg.test(_phone)) {
                            $(".phone_info").text("该号码不存在！");
                        } else{
                            var index = exist(users.u_phone,users);
                        if(index != -1){
                            $(".phone_info").text("该号码已注册！");
                          }else{
                            $(".phone_info").text("该号码可以注册！");
                          }
                      }                       
                  } else{
                        $(".phone_info").text("号码不能为空！"); 
                  }
              
            });

            //密码强度验证
            $(".p_pwd").blur(function() {
                _p_pwd = $(".p_pwd").val();
                var q_pwd=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
                    z_pwd=/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/,
                    r_pwd=/^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/;
                    //弱中强：弱：纯数字，纯字母，纯特殊字符；中：字母+数字，字母+特殊字符，数字+特殊字符；强：至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符
                  if (!_p_pwd == "") {
                      if(r_pwd.test(_p_pwd)){
                        $(".p_pwd_info").text("密码强度为弱");
                      }
                      if(z_pwd.test(_p_pwd)){
                        $(".p_pwd_info").text("密码强度为中");
                      }
                      if(q_pwd.test(_p_pwd)){
                        $(".p_pwd_info").text("密码强度为强");
                        console.log(1);
                      }
                  }
                  else{
                        $(".p_pwd_info").text("密码不能为空！");
                  }
            });

            //确认密码验证
             $(".p_qrpwd").blur(function() {
                _p_qrpwd = $(".p_qrpwd").val();
                if(!_p_pwd == ""){
                    if(_p_qrpwd == _p_pwd){
                        $(".p_qrpwd_info").text("密码确认成功！");
                    }
                    else{
                        $(".p_qrpwd_info").text("密码输入不一致！");
                    }
                }
                else{
                    $(".p_qrpwd_info").text("请先输入密码！");
                }
             });

            //邮箱注册
            //判断邮箱是否符合要求
            $(".e_mail").blur(function() {
                _e_mail = $(".e_mail").val();
                var e_reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; 
                  if (!_e_mail == "") {
                      if(!e_reg.test(_e_mail)) {
                        $(".e_mail_info").text("该邮箱不存在！");
                        
                      } else{
                        $(".e_mail_info").text("格式正确！");
                      }                       
                  } else{
                        $(".e_mail_info").text("邮箱不能为空！");      
                  }
            });

            //密码强度验证
            $(".e_pwd").blur(function() {
                _e_pwd = $(".e_pwd").val();
                var q_pwd=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
                    z_pwd=/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/,
                    r_pwd=/^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/;
                    //弱中强：弱：纯数字，纯字母，纯特殊字符；中：字母+数字，字母+特殊字符，数字+特殊字符；强：至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符
                  if (!_e_pwd == "") {
                      if(r_pwd.test(_e_pwd)){
                        $(".e_pwd_info").text("密码强度为弱");
                      }
                      if(z_pwd.test(_e_pwd)){
                        $(".e_pwd_info").text("密码强度为中");
                      }
                      if(q_pwd.test(_e_pwd)){
                        $(".e_pwd_info").text("密码强度为强");
                      }
                  }
                  else{
                        $(".e_pwd_info").text("密码不能为空！");
                  }
            });

            //确认密码验证
             $(".e_qrpwd").blur(function() {
                _e_qrpwd = $(".e_qrpwd").val();
                if(!_e_pwd == ""){
                    if(_e_qrpwd == _e_pwd){
                        $(".e_qrpwd_info").text("密码确认成功！");
                    }
                    else{
                        $(".e_qrpwd_info").text("密码输入不一致！");
                    }
                }
                else{
                    $(".e_qrpwd_info").text("请先输入密码！");
                }
             });

             var _p_check;
            //存入cookie
             $("._submit").click(function(){
                _p_check = $(".p_check").prop("checked");
                _phone=$(".phone").val();
                _p_pwd=$(".p_pwd").val();
                _p_qrpwd=$(".p_qrpwd").val();
                if(!_p_check || _phone == "" || _p_pwd == "" || _p_qrpwd == ""){
                    $("._submit").attr("disabled","disabled");
                    alert("请确认所有信息均已填入完整！");
                }
                else{
                    var user = {
                        u_phone : $(".phone").val(),
                        u_pwd : $(".p_pwd").val()
                    };
                       users.push(user);
                       $.cookie("users",users,{expires:7,path:"/"});
                    }                                         
                return false;
        });

             function exist(id,users){
                for(var i = 0,len = users.length;i<len;i++){
                    if(users[i].id == id){
                        return i;
                    }
                }
                return -1;
            }

        });
    });
});

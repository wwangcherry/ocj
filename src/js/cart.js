require(["config"], function(){
    // 依赖配置中各短名称的模块
    require(["jquery","artTemplate","addHeaderAndFooter","cookie","fly"], function($,template){
        $(function(){
            //点击加入购物车
                  $(".c_t_btm").on("click",".in_add",function(e){
                var _dl = $(this).parents("dl");
                var currentProd = {
                    id : _dl.children("em").text(),
                    imgs : _dl.children("dt").children("img").attr("src"),
                    desc : _dl.children("dd").children("a").text(),
                    price : _dl.children("dd").children("span").text(),
                    amount : 1
                }

                var index = exist(currentProd.id,_products);
                if(index !== -1){
                    _products[index].amount++;
                    sum_amount++;
                    $(".c_sum").text(sum_amount);
                } else{
                    _products.push(currentProd);
                    sum_amount++;
                    $(".c_sum").text(sum_amount);
                }
                $.cookie("products",_products,{expires:7,path:"/"});

                // 购物车飞跃特效
                var flyer = $(`<img src="${currentProd.imgs}"/>`),
                offset = $(".c_sum").offset();
                flyer.css({width:50,height:50});
                flyer.fly({
                    start : {
                        top : e.clientY,
                        left : e.clientX
                    },
                    end : {
                        top : offset.top,
                        left : offset.left,
                        width : 0,
                        height : 0
                    }
                });
            });
                $.cookie.json = true;
                var _products = $.cookie("products") || [];
                if(_products.length == 0){
                    return;
                }
                var sum_amount = 0;
                for(var i=0;i<_products.length;i++){
                    sum_amount = _products[i].amount-1+1 + (sum_amount - 1 +1);
                }
                $(".c_sum").text(sum_amount);
                var html = template("cart_temp",{products:_products});
                $("#c_tb tbody").html(html);
                // console.log(html);
                //删除
                $("#c_tb").on("click",".del",function(){
                    // console.log(this);//a标签
                    var row = $(this).parents("tr");
                    // console.log(row);
                    var _id = row.data("id");
                    var _index = exist(_id,_products);
                    sum_amount = sum_amount - _products[_index].amount;
                    $(".c_sum").text(sum_amount);
                    _products.splice(_index,1);
                    $.cookie("products",_products,{expries:7,path:"/"});
                    row.remove();
                    sumPrice();
                  });
                //修改
                $("#c_tb").on("click",".minus,.add",function(){
                    var row = $(this).parents("tr");
                    var _id = row.data("id");
                    var _index = exist(_id,_products);
                    if($(this).is(".add")){
                        _products[_index].amount++;
                        sum_amount++;
                    }else{
                        if(_products[_index].amount <=1){
                            // _products[_index].amount = 1;
                            return;
                        }{
                          _products[_index].amount--;  
                          sum_amount--;
                        }                        
                    }
                    $(".c_sum").text(sum_amount);
                    $.cookie("products",_products,{expires:7,path:"/"});
                    row.find(".amount").val(_products[_index].amount);
                    row.find(".sub").text("￥" + (_products[_index].amount * _products[_index].price.split("￥")[1]).toFixed(2));
                    sumPrice();
                });

                //在input框中手动输入数字，当失去焦点时，自动获取输入框中的数值
                $("#c_tb").on("blur",".amount",function(){
                    var row = $(this).parents("tr");
                    var _id = row.data("id");
                    var _index = exixt(_id,_products);
                    var input_num = $(this).val;
                    if(!/^[1-9]\d*$/.test(input_num)){
                        $(this).val(_products[_index].amount);
                        return;
                    }else{
                      _products[_index].amount = input_num;}
                      $.cookie("products",_products,{expires:7,path:"/"});  
                       row.find(".sub").text("￥" + (_products[_index].amount * _products[_index].price.split("￥")[1]).toFixed(2));
                       sumPrice();
                });

                //全选、部分选中状态
                $("#selall").click(function(){
                    var check_status = $(this).prop("checked");//获取全选框的选中状态，选中返回true，未选中返回false
                    $(".check_box").prop("checked",check_status);//设置每一行的复选框状态，如果前面返回的是ture，将所有的复选框状态改为checked，为false则不设置
                    sumPrice();        
                });  
                $(".check_box").click(function(){
                    var checkall = $(".check_box:checked").length == _products.length;
                    $("#selall").prop("checked",checkall);//如果单行的复选框选中的长度为加入的商品的长度，则将全选的复选框设为选中状态
                    sumPrice();
                }); 
                
                
                 function exist(id,products){
                    for(var i = 0,len = products.length;i<len;i++){
                        if(products[i].id == id){
                            return i;
                        }
                    }
                    return -1;
                }
                function sumPrice(){
                    var sum = 0;
                    $(".check_box:checked").each(function(index,element){
                        sum += Number($(this).parents("tr").find(".sub").text().split("￥")[1]);
                    });
                    $(".total_sum").text("￥" + sum.toFixed(2));
                }
        //为您推荐
      $.ajax({
                type : "get",
                url : "../mock/products.json",
                dataType : "json",
                success : function(responseData){
                  responseData.res_body.cart_tj.forEach(function(pro){
                      $(".c_t_btm").children("dl:first").clone()
                      .css({display:"inline-block"})
                      .appendTo(".c_t_btm")
                      .children("em").text(pro.id)
                      .parent().children("dt").children("img").attr("src",pro.img)
                      .parents("dt").next("dd")
                      .children("a").text(pro.a)
                      .next("span").text(pro.span)
                      .next("del").text(pro.del);                    
                    });
                }
            });

      //
      $(".c_sub_form").click(function() {
          location.href="http://localhost:8080/html/order.html";
          return false;
      });

        });
    });
});

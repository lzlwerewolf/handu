/**
 * Created by Administrator on 2016/6/25.
 */
//以下是在详情页上加入购物车按钮的点击事件
$("#cart").click(function(){
    //获取该商品的id，以及用户选择的size，数量
    var goodId = window.location.href.split("?id=")[1];
    var size = $(".select").text();
    var number = parseInt($("#number").val());
    //购物车信息保存30天
    var date = new Date();
    date.setDate(date.getDate()+30);
    var _cookie = document.cookie;
    //_item变量用来保存对象
    var _item =null;
    //_new变量用来保存每条商品信息
    var _new ="";
    if(_cookie.indexOf("list=")==-1){//真·新品，购物车的第一件商品
        var first = "list="+"{id:"+goodId+",number:"+number+",size:'"+size+"'}";
        document.cookie = first+";expires="+date;
    }else if(_cookie.indexOf("list=")>-1){
        if(_cookie.indexOf(goodId)==-1){//已有购物车，但无重复商品,也要重新装cookie
            //取出每项商品，形如"{id:"",size:"",number:""}"
            var _list1 = _cookie.match(/\{.+\}/g)[0].split("$");
            //遍历这些商品，把它们重新加入一个空字符串
            for(var k=0;k<_list1.length;k++){
                _new +="$"+_list1[k];
            }
            //最后把该条商品信息加入字符串,存入cookie,清空临时变量
            _new+="${id:"+goodId+",number:"+number+",size:'"+size+"'}";
            document.cookie = "list="+_new+";expires="+date;
            _new="";
        }else if(_cookie.indexOf(goodId)>-1){//该商品已存在,把cookie找回，转换为对象，给其number属性赋值，让数量相加。
            var _list = _cookie.match(/\{.+\}/g)[0].split("$");
            //遍历所有商品，找到id相同的那一项，把两者数量相加,用该条信息替换原来的
            for(var i=0;i<_list.length;i++){
                _item=window.eval("("+_list[i]+")");
                if(_item["id"]==goodId){
                    number = _item["number"]+number;
                    var jsonStr = "{id:"+goodId+",number:"+number+",size:'"+size+"'}";
                    _list[i]=jsonStr;
                }
                //把每项前面都加上分隔符，重新把cookie装回去
                _new +="$"+_list[i];
                document.cookie ="list="+ _new+";expires="+date;
            }
        }
    }
});
//------------------------------------华丽的分割线-----------------------------------
//-----------------------------------国服第一预言家----------------------------------
//以下是在购物车页面检索cookie,添加数据
function appendCart(){
    if(document.cookie){
        var _cookie =document.cookie;
        try{
            //取出每项商品，形如"{id:"",size:"",number:""}"
            var _list = _cookie.match(/\{.+\}/g)[0].split("$");
            var _item=null;
            //数组用来存放商品信息（obj类型）
            var arr =new Array();
            for(var i=0;i<_list.length;i++){
                _item=window.eval("("+_list[i]+")");
                arr.push(_item);
            }
            //添加数据
            createAjax("post","core/list.json",true,function(data){
                var _json = window.eval("("+data+")");
                var html ="";
                for(var i in _json["category"]){
                    for(var j=0;j<arr.length;j++){
                        if(i==arr[j]["id"]){
                            html +="<div class='inner'><div class='img l'><img src='"+_json["category"][i]["icon"][0]+"'/></div><div class='name l'><a href='detail.html?id="+i+"'>"+_json["category"][i]["name"]+"</a></div><div class='size l'><span>"+arr[j]["size"]+"</span></div><div class='price l'><span>"+_json["category"][i]["price"]+"</span></div><div class='num l'><span class='sub'>-</span><span class='goodNum'>"+arr[j]["number"]+"</span><span class='plus'>+</span></div><div class='all l'><span>￥"+arr[j]["number"]*_json["category"][i]["price"].split("￥")[1]+"</span></div><div id='del"+i+"'></div></div>";
                        }
                    }
                }
                $("#content").append(html);
                //添加完成后，绑定事件，删除，加减
                cartBound();
                //更新商品数量和总价格的函数
                update();
            },null);
        }catch(e){
            //如果不用try,catch,购物车内信息被删除完后进入该页面会报错
            //如果catch到了错误，说明购物车没信息，删除该条cookie
            //也可以再删除函数最后判断一下cookie.match(/\{.+\}/g)是否存在，不存在就删除cookie
            document.cookie = "list=;expires="+ new Date(0);
            alert("无购物车信息");
        }
    }
}
//添加事件
function cartBound(){
    //删除
    $(".inner div:last-child").click(function(){
        if(window.confirm("是否确定删除该条数据?")){
            $(this).closest(".inner").remove();
            var _cookie = document.cookie;
            var _item=null;
            //删除按钮的id是del10xxx
            var domId = $(this).attr("id").split("del")[1];
            var _new ="";
            var _list = _cookie.match(/\{.+\}/g)[0].split("$");
            var date = new Date();
            date.setDate(date.getDate()+30);
            for(var i=0;i<_list.length;i++){
                _item=window.eval("("+_list[i]+")");
                if(_item["id"]==domId){;
                    _list[i]="";
                    //这一项不能加分隔符，否则会多一个$，所以用continue进行下次循环
                    continue;
                }
                //把每项都加上分隔符，重新把cookie装回去
                _new +="$"+_list[i];
            }
            document.cookie = "list="+_new+";expires="+date;
            //更新数量和总价
            update();
        }
    });
    //加减
    $(".sub").click(function(){
        $(this).siblings(".goodNum").text()<=1?null:$(this).siblings(".goodNum").text($(this).siblings(".goodNum").text()-1);
        $(this).closest(".inner").children(".all").children("span").text("￥"+$(this).siblings(".goodNum").text()*$(this).closest(".inner").children(".price").children("span").text().split("￥")[1]);
        update();
    });
    $(".plus").click(function(){
        $(this).siblings(".goodNum").text(parseInt($(this).siblings(".goodNum").text())+1);
        $(this).closest(".inner").children(".all").children("span").text("￥"+$(this).siblings(".goodNum").text()*$(this).closest(".inner").children(".price").children("span").text().split("￥")[1]);
        update();
    });
    //提交
    $("#submit").click(function(){
        submit();
    })
}
/**
 * Created by Administrator on 2016/6/21.
 */
window.onload = function(){
    friendLink();
    bottomBlack();
    appendCart();
    loginStatus()
}
function appendCart(){
    if(document.cookie){
        try {
            var jsonStr =document.cookie;
            var _list = jsonStr.match(/\{.+\}/g)[0].split("$");
            var _item=null;
            var arr =new Array();
            for(var i=0;i<_list.length;i++){
                _item=window.eval("("+_list[i]+")");
                arr.push(_item);
            }
            console.log(document.cookie)
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
                cartBound();
                update();
            },null);
        }
        catch(e){
            document.cookie = "list=;expires="+new Date(0);
            alert("购物车空空如也，去选购吧");
        }
    }
}
function cartBound(){
    //删除
    $(".inner div:last-child").click(function(){
        if(window.confirm("是否确定删除该条数据?")){
            $(this).closest(".inner").remove();
            var _cookie = document.cookie;
            var _item=null;
            var domId = $(this).attr("id").split("del")[1];
            var _new ="";
            var _list = _cookie.match(/\{.+\}/g)[0].split("$");
            var date = new Date();
            date.setDate(date.getDate()+30);
            for(var i=0;i<_list.length;i++){
                _item=window.eval("("+_list[i]+")");
                if(_item["id"]==domId){;
                    _list[i]="";
                }
                //重新把cookie装回去
                _new +="$"+_list[i];
                document.cookie = "list="+_new+";expires="+date;
            }
            update();
        }
    });
    //加减
    $(".sub").click(function(){
        $(this).siblings(".goodNum").text()<=1?null:$(this).siblings(".goodNum").text($(this).siblings(".goodNum").text()-1);
        $(this).closest(".inner").children(".all").children("span").text("￥"+$(this).siblings(".goodNum").text()*$(this).closest(".inner").children(".price").children("span").text().split("￥")[1]);
        update()
    });
    $(".plus").click(function(){
        $(this).siblings(".goodNum").text(parseInt($(this).siblings(".goodNum").text())+1);
        $(this).closest(".inner").children(".all").children("span").text("￥"+$(this).siblings(".goodNum").text()*$(this).closest(".inner").children(".price").children("span").text().split("￥")[1]);
        update()
    });
    //提交
    $("#submit").click(function(){
        submit();
    })
}
function update(){
    var _howMany =0;
    var _howMuch =0;
    if($(".inner").index(".inner")!=-1){
        $(".goodNum").each(function(){
            _howMany += parseInt($(this).text());
            $("#howmany").text(_howMany);
        });
        $(".all").each(function(){
            _howMuch += parseInt($(this).text().split("￥")[1]);
            $("#howmuch").text(_howMuch);
        });
    }else{
        $("#howmany").text("");
        $("#howmuch").text("");
    }

}
function submit(){
    try{
        var goodId = "";
        var number ="";
        var size = "";
        var _item =null;
        var _inner = document.getElementsByClassName("inner");
        var _list = document.cookie.match(/\{.+\}/g)[0].split("$");
        var _new ="";
        for(var i=0;i<_inner.length;i++){
            goodId = $(".inner div:last-child:eq("+i+")").attr("id").split("del")[1];
            for(var j=0;j<_list.length;j++){
                _item=window.eval("("+_list[j]+")");
                if(_item["id"]==goodId){
                    number = $(".inner .goodNum:eq("+i+")").text();
                    size = $(".inner .size:eq("+i+")").text();
                    var jsonStr = "{id:"+goodId+",number:"+number+",size:'"+size+"'}";
                    _list[j]=jsonStr;
                    _new += "$"+_list[j];
                }
            }
            document.cookie = "list="+_new;
        }
        window.location.href = "confirm.html";
    }catch (e){
        document.cookie = "list=;expires="+new Date(0);
        alert("购物车空空如也，去选购吧");
    }

}

//重新把cookie装回去




/**
 * Created by Administrator on 2016/6/21.
 */
window.onload = function(){
    $(document).ready(function(){

        friendLink();//友情链接
        bottomBlack();//最下面黑色广告
        loginStatus();
        checkGoods();
        submit();
        loginStatus()
    });
}
function checkGoods(){
    if(document.cookie){
        var jsonStr =document.cookie;
        var _list = jsonStr.match(/\{.+\}/g)[0].split("$");
        var _item=null;
        var arr =new Array();
        for(var i=0;i<_list.length;i++){
            _item=window.eval("("+_list[i]+")");
            arr.push(_item);
        }
        createAjax("post","core/list.json",true,function(data){
            var _json = window.eval("("+data+")");
            var html ="";
            for(var i in _json["category"]){
                for(var j=0;j<arr.length;j++){
                    if(i==arr[j]["id"]){
                        html +="<div class='inner'><div class='img l'><img src='"+_json["category"][i]["icon"][0]+"'/></div><div class='name l'><a href='detail.html?id="+i+"'>"+_json["category"][i]["name"]+"</a></div><div class='size l'><span>"+arr[j]["size"]+"</span></div><div class='price l'><span>"+_json["category"][i]["price"]+"</span></div><div class='num l'><span class='goodNum'>"+arr[j]["number"]+"</span></div><div class='all l'><span>￥"+arr[j]["number"]*_json["category"][i]["price"].split("￥")[1]+"</span></div></div>";
                    }
                }
            }
            $("#container").append(html);
            update();
        },null);
    }
}
function update(){
    var _howMany =0;
    var _howMuch =0;
    $(".goodNum").each(function(){
        _howMany += parseInt($(this).text());
        $("#howmany").text(_howMany);
    });
    $(".all").each(function(){
        _howMuch += parseInt($(this).text().split("￥")[1]);
        $("#howmuch").text(_howMuch);
    });
}
function submit(){
    $("#submit").click(function(){
        var now = new Date();
        var yy = now.getFullYear();      //年
        var mm = now.getMonth() + 1;     //月
        var dd = now.getDate();          //日
        var hh = now.getHours();         //时
        var ii = now.getMinutes();       //分
        var ss = now.getSeconds();       //秒
        var ml = now.getMilliseconds();
        var clock = yy ;
        if(mm < 10) clock += "0";
        clock += mm ;
        if(dd < 10) clock += "0";
        clock += dd ;
        if(hh < 10) clock += "0";
        clock += hh ;
        if (ii < 10) clock +="0";
        clock += ii ;
        if (ss < 10) clock +="0";
        clock += ss;
        if (ml < 100) clock +="0";
        if(ml<10) clock+="0";
        clock += ml;
        window.location.href = "submit.html?number="+clock+"&price="+$("#howmuch").text();
    });
}
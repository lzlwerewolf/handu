/**
 * Created by Administrator on 2016/6/18.
 */
window.onload = function(){
    $(document).ready(function(){

        friendLink();//友情链接
        siteMapBound();//网站导航事件
        bottomBlack();//最下面黑色广告
        bannerScrollAppend();
        boundScrollNav();
        loginStatus();
        appendHot();
        appendDetail()
    });
}
function appendHot(){
    createAjax("post","core/hstyleHot.json",true,function(data){
        var _json = window.eval("("+data+")");
        var html="";
        for(var i in _json["hot"]){
            html += "<div class='inner'><a href='detail.html?id=1000"+i+"' class='img'><img src='"+_json["hot"][i][2]+"'/></a><a href='list.html?id=1000"+i+"' class='name'>"+_json["hot"][i][0]+"</a><span class='priceBand'><span class='now'>"+_json["hot"][i][3]+"</span><del>"+_json["hot"][i][4]+"</del></span></div>";
        }
        $(".bottom").append(html);
    },null);
}
function appendDetail(){
    createAjax("post","core/list.json",true,function(data){
        var _json = window.eval("("+data+")");
        var target = window.location.href.split("?id=")[1];
        var imgBand ="";
        var bigBand = "";
        var name = "";
        for(var i in _json["category"]){
            if(i==target){
                bigBand = "<img id='bigBandimg' src='"+_json["category"][i]["icon"][0]+"'/>";
                imgBand = "<img src='"+_json["category"][i]["icon"][1]+"'/><img src='"+_json["category"][i]["icon"][2]+"'/><img src='"+_json["category"][i]["icon"][3]+"'/><img src='"+_json["category"][i]["icon"][4]+"'/><img src='"+_json["category"][i]["icon"][5]+"'/>";
                $('#bigBand').append(bigBand);
                $('#zoom').append(bigBand);
                $("#imgBand").append(imgBand);
                $("#name").append(_json["category"][i]["name"]);
                $("#brand").append(_json["category"][i]["brand"]);
                $("#price").append(_json["category"][i]["price"]);
                detailEvent();
                break;
            }
        }
    },null);
}
function detailEvent(){
    //切换图片
    $("#imgBand img").click(function(){
        $("#bigBand img").attr({src:$(this).attr("src")});
        $("#zoom img").attr({src:$(this).attr("src")});
    });
    //尺码
    $(".size").click(function(){
        $(this).addClass("select").siblings(".size").removeClass("select");
    });
    //数量
    $("#sub").click(function(){
        $("#number").val()<=1?null:$("#number").val($("#number").val()-1);
    });
    $("#plus").click(function(){
        $("#number").val(parseInt($("#number").val())+1);
    });
    //放大镜
    $("#bigBand").mouseenter(function(){
        //鼠标进入大图后，出现左右两边的放大镜组件
        $("#zoomL").css({display:"block"});
        $("#zoom").css({display:"block"}).stop().animate({opacity:1},500);
        document.onmousemove = function(e){
            var e = e||window.event;
            //获取鼠标距离屏幕左边的距离和距离屏幕顶端的距离
            var _left =e.pageX-409;
            var _top =e.pageY-399;
            //边界处理后，小框跟随鼠标移动
            _left<0?_left=0:null;
            _left>192?_left=192:null;
            _top<0?_top=0:null;
            _top>192?_top=192:null;
            $("#zoomL").css({left:_left ,top:_top });
            //左边图480*480，右边图800*800，所以left和top值也要相应乘以3分之5
            $("#zoom img").css({left:-_left*20/13 ,top:-_top*5/3 });
        };
    });

    //移出大图后，放大镜组件隐藏
    $("#bigBand").mouseleave(function(){
        $("#zoomL").css({display:"none"});
        $("#zoom").stop().animate({opacity:0},500,function(){
            $(this).css({display:"none"});
        });
    });
    //直接购买
    $("#buy").click(function(){
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
        var price = $("#price").text().split("￥")[1]*$("#number").val();
        window.location.href = "submit.html?number="+clock+"&price="+price;
    });
    $("#cart").click(function(){
        var goodId = window.location.href.split("?id=")[1];
        var size = $(".select").text();
        var number = parseInt($("#number").val());
        var date = new Date();
        date.setDate(date.getDate()+30);
        var _cookie = document.cookie;
        var _item =null;
        var _new ="";
        sport();
        //购物车数据30天后过期,先把对象转换为字符串，再传给cookie
        if(_cookie.indexOf("list=")==-1){//真·新品，购物车的第一件商品
            var first = "list="+"{id:"+goodId+",number:"+number+",size:'"+size+"'}";
            document.cookie = first+";expires="+date;
        }else if(_cookie.indexOf("list=")>-1){
            if(_cookie.indexOf(goodId)==-1){//已有购物车，但无重复,也要重新装cookie
                var _list1 = _cookie.match(/\{.+\}/g)[0].split("$");
                for(var k=0;k<_list1.length;k++){
                    _new +="$"+_list1[k];
                }
                _new+="${id:"+goodId+",number:"+number+",size:'"+size+"'}";
                document.cookie = "list="+_new+";expires="+date;
                _new="";
            }else if(_cookie.indexOf(goodId)>-1){//已存在,把cookie找回，转换为对象，给其num属性赋值，让数量相加。
                var _list = _cookie.match(/\{.+\}/g)[0].split("$");
                for(var i=0;i<_list.length;i++){
                    _item=window.eval("("+_list[i]+")");
                    if(_item["id"]==goodId){
                        number = _item["number"]+number;
                        var jsonStr = "{id:"+goodId+",number:"+number+",size:'"+size+"'}";
                        _list[i]=jsonStr;
                    }
                    //重新把cookie装回去
                    _new +="$"+_list[i];
                    document.cookie ="list="+ _new+";expires="+date;
                }
            }
        }
    });
};
function sport(){
    $("#bigBandimg").clone(true).appendTo("#bigBand").css({opacity:0.7,width:240,position:"absolute",top:0}).stop().animate({width:0,height:0,marginTop:400,left:800},2000,function(){
        $("#cart").stop().animate({width:168,height:46,marginLeft:-3,marginTop:16},200,function(){
            $("#cart").stop().animate({width:160,height:43,marginLeft:0,marginTop:20},200)
        })
    });
}

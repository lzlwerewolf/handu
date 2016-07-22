/**
 * Created by Administrator on 2016/6/17.
 */
window.onload = function(){
    $(document).ready(function(){
        friendLink();//友情链接
        siteMapBound();//网站导航事件
        bottomBlack();//最下面黑色广告
        bannerScrollAppend();
        boundScrollNav();
        searchEvent();
        loginStatus();
        //以上是公共的
        //分页
        Data();//判断是否是关键词搜索
    });
}
//这是普通添加数据以及普通分页形式的函数
function appendData(){
    function createAppend(min,max){
        createAjax("post","core/list.json",true,function(data){
            var _json = window.eval("("+data+")");
            var _html = "";
            for(var key in _json["category"]){
                if(key>=min &&key<=max){
                    $("#positionInner").text(_json["category"][key]["brand"]);//您所在的位置
                    _html +="<div class='item'><a href='detail.html?id="+key+"' class='img'><img src='"+_json["category"][key]["icon"][0]+"'/></a><a href='detail.html?id="+key+"' class='name'>"+_json["category"][key]["name"]+"</a><span><span class='price'>"+_json["category"][key]["price"]+"</span><span class='soldBand'><span> | 月销量:</span><span class='sold'>"+_json["category"][key]["sold"]+"</span></span></span></div> "
                }else{
                    continue;
                }
            }
            $("#container").empty().append(_html);
            //添加完了再给事件
        },null);
    }
    createAppend(10001,10048);
    page();
    function page(){
        //上一页事件：判断是否是第一页，（下标为1，因为前面还有个span），若是，就不工作；若不是，就加载上一页的内容appendData,并且改变页码样式
        $("#page>div>span:eq(0)").click(function(){
            if($(".index").index("#page>div>span")==1){
                null;
            }else{
                createAppend(10001+48*($(".index").index("#page>div>span")-2),10048+48*($(".index").index("#page>div>span")-2));
                $(".index").prev("span").addClass("index").siblings("span").removeClass("index");
            }
        });
        //下一页事件，
        $("#page>div>span:eq(4)").click(function(){
            if($(".index").index("#page>div>span")==3){
                null;
            }else{
                createAppend(10001+48*($(".index").index("#page>div>span")),10048+48*($(".index").index("#page>div>span")));
                $(".index").next("span").addClass("index").siblings("span").removeClass("index");
            }
        });
        //循环给123页码按钮添加事件。
        for(var i=1;i<4;i++){
            (function (n){
                $("#page>div>span:eq("+n+")").click(function(){
                    createAppend(10001+48*(n-1),10048+48*(n-1));
                    $(this).addClass("index").siblings("span").removeClass("index");
                });
            })(i);
        }
    }
}
//判断是关键词检索还是普通添加数据
function Data(){
    if(window.location.href.split("?key=")[1]){
        var key = window.decodeURIComponent(window.location.href.split("?key=")[1]);
        $(".input").val(key);
        searchData(key,8);
    }else{
        appendData();
    }
}
//关键词搜素，用瀑布流
function searchData(_key,_size,_start){
    createAjax("post","core/list.json",true,function(data){
        var _json = window.eval("("+data+")");
        var _html ="";
        var j=0;
        var _container = document.getElementById("container");
        for(var i in _json["category"]){
            //比较品牌或者名称里有没有_key关键字
            if(_json["category"][i]["brand"].indexOf(_key)>=0 || _json["category"][i]["name"].indexOf(_key)>=0){
                j++;
                if(j>_size){
                    break;
                }
                if(i>10144){
                    window.onscroll = null;
                }
                $("#positionInner").text(_key);//您所在的位置
                _html +="<div class='item'><a href='detail.html?id="+i+"' class='img'><img src='"+_json["category"][i]["icon"][0]+"'/></a><a href='detail.html?id="+i+"' class='name'>"+_json["category"][i]["name"]+"</a><span><span class='price'>"+_json["category"][i]["price"]+"</span><span class='soldBand'><span> | 月销量:</span><span class='sold'>"+_json["category"][i]["sold"]+"</span></span></span></div>";
            }

        }
        $("#container").empty().append(_html);
        flow(_key,_size);
    },null);
}
//隐藏分页div，设置容器高度为自适应。设置onscroll事件
function flow(_key,_size){
    $("#page").css({display:"none"});
    $("#container").css({height:"auto"});
    var _container = document.getElementById("container");
    window.onscroll = function(){
        var _top=document.documentElement.scrollTop || document.body.scrollTop;
        var _height=document.documentElement.clientHeight || document.body.clientHeight;
        if(_container.offsetHeight<=_top+_height && _container.offsetHeight<12503){
            _size+=_size;
            searchData(_key,_size);
        }
    }
}
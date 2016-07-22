/**
 * Created by Administrator on 2016/6/12.
 */
//最下面滚动广告，轮播和事件绑定都在这
function friendLink(){
    var _timer =0;
    var _step = 5;
    var _ul = document.getElementById("friendLinkBand").getElementsByTagName("ul")[0];
    friendLinkLunbo();
    function friendLinkLunbo(){
        window.clearTimeout(_timer);
        _ul.style.left= -_step+"px";
        _step+=6;
        if(_step>1146){
            _ul.style.left=0;
            _step=6;
            friendLinkLunbo();
        }
        _timer = window.setTimeout(friendLinkLunbo,50);
    }
    $(_ul).hover(function(){
        window.clearTimeout(_timer);
    },function(){
        _timer = window.setTimeout(friendLinkLunbo,50);
    })
}
//网站地图
function siteMapBound(){
    $("#siteMap").mouseenter(function(){
        $("#siteMapBand").css({display:"block"})
        $("#siteMapBand").mouseenter(function(){
            $("#siteMapBand").css({display:"block"})
        });
        $("#siteMapBand").mouseleave(function(){
            $("#siteMapBand").css({display:"none"})
        });
        $("#siteMap").mouseleave(function(){
            $("#siteMapBand").css({display:"none"})
        })
    })
}
//最下面黑色广告
function bottomBlack(){
    $("#exit").click(function(){
        $(this).parent("#bottomAdv").css({display:"none"});
    })
}
function bannerScrollAppend(){
    createAjax("post","core/category.json",true,function(main){
        var _m = window.eval("("+main+")");
        createAjax("post","core/category_string.json",true,function(follow){
            var _f = window.eval("("+follow+")");
            var temp="";
            var _html ="";
            for(var m in _m["category"]){
                for(var f in _f){
                    if(m == f){//赋值中文
                        temp =m;
                        m=_f[f][0];
                        break;
                    }
                }
                _html = "<div class='"+temp+"'><h3><i><img src='"+_m["category"][temp][0]+"'/></i>"+m+"</h3>";
                $("#scrollNav").prepend(_html);//从前面加入
            }
            createAjax("post","core/category1.json",true,function(data){
                var _html="";
                var _json = window.eval("("+data+")");
                for(var i in _json["category"]){
                    if(_json["category"][i][2]){//如果有第三项，就给hot类名
                        _html = "<a class='hot' href='"+_json["category"][i][1]+"'>·"+_json["category"][i][0]+"</a>";
                    }else{
                        _html = "<a href='"+_json["category"][i][1]+"'>"+_json["category"][i][0]+"</a>";
                    }
                    if(i<=10005){//前6项加入女装
                        document.getElementsByClassName("women")[1].innerHTML+=_html;
                    }else if(i>=10006 && i<10012){//7项加入男装
                        document.getElementsByClassName("men")[1].innerHTML+=_html;
                    }else if(i>=10012 && i<10019){//8项加入童装
                        document.getElementsByClassName("children")[1].innerHTML+=_html;
                    }else{//剩余加入妈妈装
                        document.getElementsByClassName("moms")[0].innerHTML+=_html;
                    }
                }
            },null);
        },null);
    },null);
}

        //如果左导航不是一开始就有，就绑定事件。如果是首页，就不绑定了   一直存在
function boundScrollNav(){
    if(window.getComputedStyle(document.getElementById("scrollNav")).display=="none"){
        $("#allGoodKinds").mouseenter(function(){
            $("#scrollNav").css({display:"block"});
        });
        $("#scrollNav").mouseenter(function(){
            $(this).css({display:"block"});
        });
        $("#allGoodKinds").mouseleave(function(){
            $("#scrollNav").css({display:"none"});
        });
        $("#scrollNav").mouseleave(function(){
            $(this).css({display:"none"});
        });
    }
}
//每个页面都检测一下是否有登陆状态
function loginStatus(){
    if(document.cookie && (/login/g).test(document.cookie)==true){
        var _userName = document.cookie.split("&")[0].match(/\w+=.+/g)[0].split("=")[1];
        var item = document.cookie.match(/\w+=\w+/g);
        $("#hello").text("欢迎您，"+_userName+"  积分  "+item[1].split("=")[1]);
        $("#hello").next("a").text("退出").attr({id:"logOut",href:""}).next("a").text("我的韩都").attr({href:"userCenter.html"}).css({background:"url('images/myMint.jpg') no-repeat right center"}).removeClass("fontDarkRed");
        $("#logOut").click(function(){
            if(window.confirm("是否确定要退出？")){
                document.cookie = "user=;expires="+new Date(0);
                window.location.href = "index.html"
            }
        })
    }
}
function searchEvent(){
    $(".button").click(function(){
        var _keyWords = window.encodeURIComponent($(this).prev(".input").val());
        search(_keyWords);
        function search(_keyWords){
            window.location.href= "navigation.html?key="+_keyWords;
        }
    });
}
//滚动到一定程度，出现搜索框和gotop
function scrollDown(){
    var _top= 0;
    var _height= 0;
    window.onscroll = function(){
        _top=document.documentElement.scrollTop || document.body.scrollTop;
        _height =document.documentElement.clientHeight || document.body.clientHeight;
        if(_top+_height>1500){
            $("#topSearchBand").css({display:"block"});
            $("#topSearchBand").stop().animate({height:40},1000);
            $("#gotop1").css({display:"block"});
            $("#gotop1").stop().animate({opacity:1,left:0},1000);
            $("#gotop2").css({display:"block"});
            $("#gotop2").stop().animate({opacity:1,right:0},1000);
        }
        if(_top+_height<1500){
            $("#gotop1").stop().animate({opacity:0,left:-30},1000,function(){
                $("#gotop1").css({display:"none"});
            })
            $("#gotop2").stop().animate({opacity:0,right:-30},1000,function(){
                $("#gotop2").css({display:"none"});
            })
            $("#topSearchBand").stop().animate({height:0},1000,function(){
                $("#topSearchBand").css({display:"none"});
            });
        }
    }
}


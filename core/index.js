/**
 * Created by Administrator on 2016/6/12.
 */
window.onload = function(){
    $(document).ready(function(){
        lett();//轮播函数
        changeEvent();//换一批按钮
        changeAdvEvent();//换广告
        searchEvent();//搜索按钮
        friendLink();//友情链接
        isScrollNavDisplay();//首页scrollnav一直存在，需要做出区分
        bannerScrollAppend();
        boundScrollNav();
        siteMapBound();//网站导航事件
        bottomBlack();//最下面黑色广告
        loginStatus();
        scrollDown();
        searchInput();
    })
}

//首页导航一直在
function isScrollNavDisplay(){
    $("#scrollNav").css({display:"block"});
}
//轮播
function lett(){
    var num=1;
    var timer = setInterval(function(){
        bannerLunbo(num);
    },3000);
    function bannerLunbo(m){
        window.clearInterval(timer);
        if(m>=4){
            m=0;
            num=0;
        }
        $('#banner #bannerBand span'+':eq('+m+')').css({color:"#fff",backgroundColor:"#333"});
        $('#banner #bannerBand span'+':eq('+m+')').siblings("span").css({color:"#333",backgroundColor:"#fff"});
        $('#banner'+'>a:eq('+m+')').siblings("a").css({zIndex:1}).animate({opacity:0},2000);
        $('#banner'+'>a:eq('+m+')').css({zIndex:2});
        $('#banner'+'>a:eq('+m+')').animate({opacity:1},2000);
        num=m;
        num++;
        timer = setInterval(function(){
            bannerLunbo(num);
        },3000);
    }
    $("#banner #bannerBand span").hover(function(){
        var index = $("#banner #bannerBand span").index(this);
        $('#banner>a').stop(false,true);
        clearInterval(timer);
        bannerLunbo(index);
    },function(){
        clearInterval(timer);
        var index = $("#banner #bannerBand span").index(this);
        timer = setInterval(function(){
            bannerLunbo(index+1);
        },3000);
    });
    $("#banner a").hover(function(){
        clearInterval(timer);
        $(this).stop(false,true);
    },function(){
        clearInterval(timer);
        var index = $("#banner a").index(this);
        timer = setInterval(function(){
            bannerLunbo(index+1);
        },3000);
    });
}
//新品上市轮播
function newArrivalLunboLett(){
    var num=1;
    var timer = setInterval(function(){
        newArrivalLunbo(num);
    },3000);
    function newArrivalLunbo(m){
        window.clearInterval(timer);
        if(m>=5){
            m=0;
            num=0;
        }
        //$('#newArrival #bannerBand span'+':eq('+m+')').css({color:"#fff",backgroundColor:"#333"});
        //$('#banner #bannerBand span'+':eq('+m+')').siblings("span").css({color:"#333",backgroundColor:"#fff"});
        $(".newArrivalTabs"+":eq("+m+")").addClass("selected").siblings(".selected").removeClass("selected");
        $('#newArrival .newArrivalContent:eq('+m+')').siblings(".newArrivalContent").css({zIndex:1}).animate({opacity:0},2000);
        $('#newArrival .newArrivalContent:eq('+m+')').css({zIndex:2});
        $('#newArrival .newArrivalContent:eq('+m+')').animate({opacity:1},2000);
        num=m;
        num++;
        timer = setInterval(function(){
            newArrivalLunbo(num);
        },3000);
    }
    //绑定事件,span标签移入移出以及div移入移出
    newArrivalBoundEvent();
    function newArrivalBoundEvent(){
        for(var i=0;i<5;i++){
            (function(n){
                $(".newArrivalTabs"+":eq("+n+")").hover(function(){//span标签
                    clearInterval(timer);
                    $(this).addClass("selected").siblings(".selected").removeClass("selected");
                    $(".newArrivalContent").stop(false,true);
                    $(".newArrivalContent"+":eq("+n+")").css({display:"block"}).animate({opacity:1},1500).siblings(".newArrivalContent").animate(
                        {opacity:0},1500);
                },function(){
                    clearInterval(timer);
                    var index = $(".newArrivalTabs").index(this);
                    timer = setInterval(function(){
                        newArrivalLunbo(index+1);
                    },3000);
                })
            })(i)
        }
        $(".newArrivalContent").hover(function(){//div移入移出
            clearInterval(timer);
            $(this).stop(false,true);
        },function(){
            clearInterval(timer);
            var index = $(".newArrivalContent").index(this);
            timer = setInterval(function(){
                newArrivalLunbo(index+1);
            },3000);
        });
    }
}
//品牌厂商的那个广告栏，换一批下面
createAjax("post","core/image.txt",true,function(data){
    var _arr = data.split("#");
    var _html ="";
    for(var i=0;i<16;i++){
        _html += "<a href='#'><img src='"+_arr[i]+".jpg'/></a>";
    }
    document.getElementById("brandBand2").innerHTML = _html;
    _html="";
    for(var i=7;i<23;i++){
        _html += "<a href='#'><img src='"+_arr[i]+".jpg'/></a>"
    }
    document.getElementById("brandBand1").innerHTML = _html;
    changeBrandEvent();//动态添加完毕后才能添加事件，所以放这里
},null);
//新品上市(也包括AMHContent内容的添加)
createAjax("post","core/newArrival.json",true,function(data){
    var _json = window.eval("("+data+")");
    var _html = "";
    var _newArrivalContent = document.getElementsByClassName("newArrivalContent");
    for(var i in _json["goods"]["women"]){
        _html ="<div class='one'><a href='#'><img src='"+_json["goods"]["women"][i][0]+"'/></a><span class='price'><span>"+_json["goods"]["women"][i][1]+"</span><span class='oldPrice'>"+_json["goods"]["women"][i][2]+"</span></span><span class='saling'>立即抢购</span></div>";
        _newArrivalContent[0].innerHTML+=_html;
        _html="";
    }
    for(var i in _json["goods"]["men"]){
        _html ="<div class='one'><a href='#'><img src='"+_json["goods"]["men"][i][0]+"'/></a><span class='price'><span>"+_json["goods"]["men"][i][1]+"</span><span class='oldPrice'>"+_json["goods"]["men"][i][2]+"</span></span><span class='saling'>立即抢购</span></div>";
        _newArrivalContent[1].innerHTML+=_html;
        $(".AMHContent").append(_html);
        _html="";
    }
    for(var i in _json["goods"]["moms"]){
        _html ="<div class='one'><a href='#'><img src='"+_json["goods"]["moms"][i][0]+"'/></a><span class='price'><span>"+_json["goods"]["moms"][i][1]+"</span><span class='oldPrice'>"+_json["goods"]["moms"][i][2]+"</span></span><span class='saling'>立即抢购</span></div>";
        _newArrivalContent[2].innerHTML+=_html;
        $(".dknContent").append(_html);
        _html="";
    }
    for(var i in _json["goods"]["miss"]){
        _html ="<div class='one'><a href='#'><img src='"+_json["goods"]["miss"][i][0]+"'/></a><span class='price'><span>"+_json["goods"]["miss"][i][1]+"</span><span class='oldPrice'>"+_json["goods"]["miss"][i][2]+"</span></span><span class='saling'>立即抢购</span></div>";
        _newArrivalContent[3].innerHTML+=_html;
        $(".soneedContent").append(_html);
        _html="";
    }
    for(var i in _json["goods"]["kids"]){
        _html ="<div class='one'><a href='#'><img src='"+_json["goods"]["kids"][i][0]+"'/></a><span class='price'><span>"+_json["goods"]["kids"][i][1]+"</span><span class='oldPrice'>"+_json["goods"]["kids"][i][2]+"</span></span><span class='saling'>立即抢购</span></div>";
        _newArrivalContent[4].innerHTML+=_html;
        $(".miniContent").append(_html);
        _html="";
    }
    newArrivalLunboLett();
},null);
//hstyle的热销排行
createAjax("post","core/hstyleHot.json",true,function(data){
    var _json = window.eval("("+data+")");
    var _html="";
    for(var i in _json["hot"]){
        _html +="<li><span class='title'><span><img src='"+_json["hot"][i][6]+"'/></span>"+_json["hot"][i][0]+"</span><span class='info'><span class=number>"+_json["hot"][i][1]+"</span><a href='#' class='l'><img src='"+_json["hot"][i][2]+"'/></a><span class='l'><a class='name' href='#'>"+_json["hot"][i][0]+"</a><span class='price'>"+_json["hot"][i][3]+"</span><span class='oldPrice'>"+_json["hot"][i][4]+"</span><span class='hasSaled'>已售<span class='fontDarkRed'>"+_json["hot"][i][5]+"</span>笔</span></span></span></li>";
    }
    $("#hstyleBand .center .hotBar ul").append(_html);
    $("#hstyleBand .center .hotBar ul li .title").mouseenter(function(){
        $("#hstyleBand .center .hotBar ul li .title").css({display:"block"}).siblings("span").css({display:"none"});
        $(this).css({display:"none"}).siblings("span").css({display:"block"});
    })
},null);
//hstyle的商品列表
createAjax("post","core/hstyle.json",true,function(data){
    var _json = window.eval("("+data+")");
    var _html = "";
    var _hstyleContent = document.getElementsByClassName("hstyleContent")[0];
    for(var i=0;i<10;i++){
        _html ="<div class='one'><a href='#'><img src='"+_json["hstyle"][i][0]+"'/></a><span class='price'><span>"+_json["hstyle"][i][1]+"</span><span class='oldPrice'>"+_json["hstyle"][i][2]+"</span></span><span class='saling'>立即抢购</span></div>";
        _hstyleContent.innerHTML+=_html;
        _html="";
    }
},null);
//换一批品牌
function changeEvent(){
    var _brandBand1 = document.getElementById("brandBand1");
    var _brandBand2 = document.getElementById("brandBand2");
    $("#change").click(function(){
        if(window.getComputedStyle(_brandBand1).display=="none"){
            _brandBand1.style.display="block";
            _brandBand2.style.display="none";
        }else{
            _brandBand1.style.display="none";
            _brandBand2.style.display="block";
        }
    })
}
//鼠标移上换图片,品牌
function changeBrandEvent(){
    var _src="";
    for(var i=0;i<16;i++){
        (function bound(n){
            $("#brandBand1"+">a:eq("+n+")").mouseenter(function(){
                _src = $("#brandBand1"+">a:eq("+n+") img").attr("src");
                _src = _src.split(".")[0]+"1"+".jpg";
               $("#brandBand1"+">a:eq("+n+") img").attr({src:_src});
            });
            $("#brandBand1"+">a:eq("+n+")").mouseleave(function(){
                _src = $("#brandBand1"+">a:eq("+n+") img").attr("src");
                _src = _src.split("1.")[0]+".jpg";
                $("#brandBand1"+">a:eq("+n+") img").attr({src:_src});
            });
            $("#brandBand2"+">a:eq("+n+")").mouseenter(function(){
                _src = $("#brandBand2"+">a:eq("+n+") img").attr("src");
                _src = _src.split(".")[0]+"1"+".jpg";
                $("#brandBand2"+">a:eq("+n+") img").attr({src:_src});
            });
            $("#brandBand2"+">a:eq("+n+")").mouseleave(function(){
                _src = $("#brandBand2"+">a:eq("+n+") img").attr("src");
                _src = _src.split("1.")[0]+".jpg";
                $("#brandBand2"+">a:eq("+n+") img").attr({src:_src});
            });
        })(i)
    }
}
//鼠标移上换选项卡，广告
function changeAdvEvent(){
    for(var i=0;i<4;i++){
        (function bound(n){
            $(".tabs"+":eq("+n+")").mouseenter(function(){
                $(this).addClass("selected").siblings(".tabs").removeClass("selected");
                $(".content"+":eq("+n+")").css({display:"block"}).siblings(".content").css({display:"none"});
            });
        })(i)
    }

}
//topSearch事件，
function searchInput(){
    $("#topSearchBand input").focus(function(){
        $(this).val()=="连衣裙"? $(this).val(""):null;
    });
    $("#topSearchBand input").blur(function(){
        $(this).val()==""? $(this).val("连衣裙"):null;
    })
}



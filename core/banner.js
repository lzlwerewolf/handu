/**
 * Created by Administrator on 2016/6/19.
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
        appendData("content1",1,10);
        appendData("content2",11,7);
        appendData("content3",18,10);
        appendData("content4",28,10);
        appendBrand("brand1",1,6);
        appendBrand("brand2",7,5);
        appendBrand("brand3",12,6);
        appendBrand("brand4",18,5);
        boundEvent();

    });
}
function appendData(_containerId,_start,_size){
    var html = "";
    for(var i=_start;i<_start+_size;i++){
        html +="<div class='inner'><a href='../list.html?key=HSTYLE'><img src='images/banner/inner-"+i+".jpg'/></a><span class='bottom'><span class='l'><span class='xpj'>新品价</span><span class='l now'>￥78</span><span class='l last'><del>￥158</del></span></span><span class='r'>立即<br>抢购<br>&gt;</span></span></div>"
    }
    $("#"+_containerId).append(html);
}
function appendBrand(_containerId,_start,_size){
    var html ="";
    for(var i=_start;i<_start+_size;i++){
        html+="<div class='brand'><a href='#'><img src='images/banner/brand-"+i+".png'/><div class='go'>点击查看</div> </a></div>";
    }
    $("#"+_containerId).append(html);
}
function boundEvent(){
    for(var i=0;i<23;i++){
        (function(n){
            $(".brand:eq("+n+")").hover(function(){
                $(".brand div").stop(false,true);
                $(".brand:eq("+n+") div").animate({backgroundColor:'#ff0000',color:'#ffffff'},700);
            },function(){
                $(".brand div").stop(false,true);
                $(".brand:eq("+n+") div").animate({backgroundColor:'#ffffff',color:'#000000'},700);
            });
        })(i);
    }

}
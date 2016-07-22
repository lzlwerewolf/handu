/**
 * Created by Administrator on 2016/6/22.
 */
window.onload = function(){
    $(document).ready(function(){
        friendLink();//友情链接
        bottomBlack();//最下面黑色广告
        loginStatus();
        siteMapBound();
        bannerScrollAppend();
        boundScrollNav();
        nav();
        search()
    });
}
function nav(){
    $(".title").click(function(){
        if($(this).parent("span").hasClass("selected")){
            $(this).parent("span").css({height:36}).removeClass("selected   ");
        }else{
            $(this).parent("span").addClass("selected").siblings("span").removeClass("selected");
            $(this).parent("span").css({height:"auto"}).siblings("span").css({height:36});
        }
    })
}
function search(){
    $(".band span").click(function(){
        $("#search").val($(this).text());
    })
}
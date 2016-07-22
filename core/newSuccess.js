/**
 * Created by Administrator on 2016/6/17.
 */
window.onload = function(){
    $(document).ready(function() {
        friendLink();//友情链接
        siteMapBound();//网站导航事件
        bottomBlack();//最下面黑色广告
        bannerScrollAppend();
        boundScrollNav();
        searchEvent();
    });
}